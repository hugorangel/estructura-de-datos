import { useState, useCallback, useEffect, useRef } from 'react';
import { Tabs, TabPanel, Panel } from '@/shared/components/ui';
import {
  PlaybackControls,
  SpeedSlider,
  ProgressBar,
  StepDescription,
  ModeToggle,
} from '@/shared/components/playback';
import { CodeViewer } from '@/shared/components/code';
import { usePlaybackStore } from '@/stores/playbackStore';
import { AnimationEngine } from '@/core/animation';
import { GraphVisualizer } from './GraphVisualizer';
import { GraphOperations } from './GraphOperations';
import { GraphOverview } from './GraphOverview';
import { GraphComplexity } from './GraphComplexity';
import { graphConfig, buildAdjacencyList, type GraphState } from './config';
import { graphCodeSnippets } from './code';
import {
  createAddNodeAnimation,
  createAddEdgeAnimation,
  createRemoveNodeAnimation,
  createRemoveEdgeAnimation,
  createBFSAnimation,
  createDFSAnimation,
  type GraphAnimationResult,
} from './animations';
import type { ElementVisualState, PlaybackMode } from '@/core/interfaces';

const tabs = [
  { id: 'visualize', label: 'Visualize' },
  { id: 'overview', label: 'Overview' },
  { id: 'complexity', label: 'Complexity' },
];

export function GraphModule() {
  const [activeTab, setActiveTab] = useState('visualize');
  const [state, setState] = useState<GraphState>(graphConfig.getInitialState());
  const [highlightedElements, setHighlightedElements] = useState<Map<string, ElementVisualState>>(new Map());
  const [currentOperation, setCurrentOperation] = useState<string>('bfs');
  const [mode, setMode] = useState<PlaybackMode>('auto');
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [traversalData, setTraversalData] = useState<GraphAnimationResult['traversalData']>();

  const engineRef = useRef<AnimationEngine | null>(null);
  const setAnimationState = usePlaybackStore((s) => s.setAnimationState);
  const animationState = usePlaybackStore((s) => s.animationState);

  // Initialize animation engine
  useEffect(() => {
    engineRef.current = new AnimationEngine();
    const unsubscribe = engineRef.current.subscribe((animState) => {
      setAnimationState(animState);

      // Update highlighted elements based on current step
      const currentStep = animState.steps[animState.currentStepIndex];
      if (currentStep) {
        const newHighlights = new Map<string, ElementVisualState>();
        currentStep.elements.forEach((el) => {
          newHighlights.set(el.elementId, el.state);
        });
        setHighlightedElements(newHighlights);
      } else {
        setHighlightedElements(new Map());
      }
    });

    return () => unsubscribe();
  }, [setAnimationState]);

  const handleExecute = useCallback(
    (
      operation: string,
      params: { nodeId?: string; fromNode?: string; toNode?: string; startNode?: string }
    ) => {
      const validation = graphConfig.validate(params, operation, state);
      if (!validation.valid) {
        console.error(validation.error);
        return;
      }

      setCurrentOperation(operation);
      let result: GraphAnimationResult | undefined;

      switch (operation) {
        case 'addNode': {
          // Find a good position for the new node
          const centerX = 200;
          const centerY = 175;
          const offset = state.nodes.length * 30;
          const angle = (state.nodes.length * 60 * Math.PI) / 180;
          const x = centerX + Math.cos(angle) * (80 + offset % 100);
          const y = centerY + Math.sin(angle) * (80 + offset % 100);
          result = createAddNodeAnimation(state, params.nodeId!, x, y);
          break;
        }
        case 'addEdge':
          result = createAddEdgeAnimation(state, params.fromNode!, params.toNode!);
          break;
        case 'removeNode':
          result = createRemoveNodeAnimation(state, params.nodeId!);
          break;
        case 'removeEdge':
          result = createRemoveEdgeAnimation(state, params.fromNode!, params.toNode!);
          break;
        case 'bfs':
          result = createBFSAnimation(state, params.startNode!);
          setTraversalData(result.traversalData);
          break;
        case 'dfs':
          result = createDFSAnimation(state, params.startNode!);
          setTraversalData(result.traversalData);
          break;
        default:
          return;
      }

      if (result) {
        engineRef.current?.loadSteps(result.steps);
        engineRef.current?.setMode(mode);
        engineRef.current?.play();

        // Update state after animation for mutating operations
        if (['addNode', 'addEdge', 'removeNode', 'removeEdge'].includes(operation)) {
          setState(result.newState);
        }
      }
    },
    [state, mode]
  );

  const handleReset = useCallback(() => {
    engineRef.current?.stop();
    setState(graphConfig.getInitialState());
    setHighlightedElements(new Map());
    setSelectedNodes([]);
    setTraversalData(undefined);
  }, []);

  const handleRandomize = useCallback(() => {
    engineRef.current?.stop();
    const { nodes, edges } = graphConfig.generateRandomGraph(6);
    setState({
      nodes,
      edges,
      directed: state.directed,
      adjacencyList: buildAdjacencyList(nodes, edges, state.directed),
    });
    setHighlightedElements(new Map());
    setSelectedNodes([]);
    setTraversalData(undefined);
  }, [state.directed]);

  const handleToggleDirected = useCallback(() => {
    setState((prev) => {
      const newDirected = !prev.directed;
      return {
        ...prev,
        directed: newDirected,
        adjacencyList: buildAdjacencyList(prev.nodes, prev.edges, newDirected),
      };
    });
  }, []);

  const handleNodeClick = useCallback((nodeId: string) => {
    setSelectedNodes((prev) => {
      if (prev.includes(nodeId)) {
        return prev.filter((n) => n !== nodeId);
      }
      if (prev.length >= 2) {
        return [nodeId];
      }
      return [...prev, nodeId];
    });
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedNodes([]);
  }, []);

  const handleNodeDrag = useCallback((nodeId: string, x: number, y: number) => {
    setState((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => (n.id === nodeId ? { ...n, x, y } : n)),
    }));
  }, []);

  const handlePlay = useCallback(() => {
    engineRef.current?.play();
  }, []);

  const handlePause = useCallback(() => {
    engineRef.current?.pause();
  }, []);

  const handleStop = useCallback(() => {
    engineRef.current?.stop();
    setHighlightedElements(new Map());
    setTraversalData(undefined);
  }, []);

  const handleStepForward = useCallback(() => {
    engineRef.current?.stepForward();
  }, []);

  const handleStepBack = useCallback(() => {
    engineRef.current?.stepBack();
  }, []);

  const handleSpeedChange = useCallback((speed: number) => {
    engineRef.current?.setSpeed(speed);
  }, []);

  const handleModeChange = useCallback((newMode: PlaybackMode) => {
    setMode(newMode);
    engineRef.current?.setMode(newMode);
  }, []);

  const handleSeek = useCallback((stepIndex: number) => {
    engineRef.current?.goToStep(stepIndex);
  }, []);

  const isAnimating = animationState.status === 'playing';

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 border-b border-border-default">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">{graphConfig.name}</h1>
            <p className="text-sm text-neutral-400 mt-1">{graphConfig.description}</p>
          </div>
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <TabPanel isActive={activeTab === 'visualize'} className="h-full">
          <div className="h-full grid grid-cols-[1fr_300px] gap-4 p-4">
            {/* Main visualization area */}
            <div className="flex flex-col gap-4">
              {/* Visualizer */}
              <div className="flex-1">
                <GraphVisualizer
                  state={state}
                  highlightedElements={highlightedElements}
                  onNodeClick={handleNodeClick}
                  onNodeDrag={handleNodeDrag}
                  traversalData={traversalData}
                />
              </div>

              {/* Step description */}
              <StepDescription />

              {/* Playback controls */}
              <Panel className="!p-4">
                <div className="flex items-center justify-between gap-4">
                  <PlaybackControls
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onStop={handleStop}
                    onStepForward={handleStepForward}
                    onStepBack={handleStepBack}
                  />
                  <ProgressBar onSeek={handleSeek} className="flex-1 max-w-md" />
                  <SpeedSlider
                    speed={animationState.speed}
                    onChange={handleSpeedChange}
                  />
                  <ModeToggle mode={mode} onChange={handleModeChange} />
                </div>
              </Panel>

              {/* Code viewer */}
              <CodeViewer
                codeSnippets={graphCodeSnippets}
                operationId={currentOperation}
                className="max-h-64"
              />
            </div>

            {/* Operations panel */}
            <GraphOperations
              onExecute={handleExecute}
              onReset={handleReset}
              onRandomize={handleRandomize}
              onToggleDirected={handleToggleDirected}
              disabled={isAnimating}
              state={state}
              selectedNodes={selectedNodes}
              onClearSelection={handleClearSelection}
            />
          </div>
        </TabPanel>

        <TabPanel isActive={activeTab === 'overview'} className="h-full overflow-y-auto p-6">
          <GraphOverview />
        </TabPanel>

        <TabPanel isActive={activeTab === 'complexity'} className="h-full overflow-y-auto p-6">
          <GraphComplexity />
        </TabPanel>
      </div>
    </div>
  );
}

export default GraphModule;
