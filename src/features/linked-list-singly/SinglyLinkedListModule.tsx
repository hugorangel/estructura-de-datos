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
import { SinglyLinkedListVisualizer } from './SinglyLinkedListVisualizer';
import { SinglyLinkedListOperations } from './SinglyLinkedListOperations';
import { SinglyLinkedListOverview } from './SinglyLinkedListOverview';
import { SinglyLinkedListComplexity } from './SinglyLinkedListComplexity';
import { singlyLinkedListConfig, type SinglyLinkedListState } from './config';
import { singlyLinkedListCodeSnippets } from './code';
import {
  createInsertAtHeadAnimation,
  createInsertAtTailAnimation,
  createInsertAtPositionAnimation,
  createDeleteNodeAnimation,
  createSearchAnimation,
  createTraverseAnimation,
} from './animations';
import type { ElementVisualState, PlaybackMode } from '@/core/interfaces';

const tabs = [
  { id: 'visualize', label: 'Visualize' },
  { id: 'overview', label: 'Overview' },
  { id: 'complexity', label: 'Complexity' },
];

type OperationType =
  | 'insertAtHead'
  | 'insertAtTail'
  | 'insertAtPosition'
  | 'deleteNode'
  | 'search'
  | 'traverse';

export function SinglyLinkedListModule() {
  const [activeTab, setActiveTab] = useState('visualize');
  const [state, setState] = useState<SinglyLinkedListState>(
    singlyLinkedListConfig.getInitialState()
  );
  const [highlightedElements, setHighlightedElements] = useState<
    Map<string, ElementVisualState>
  >(new Map());
  const [currentOperation, setCurrentOperation] = useState<string>('insertAtHead');
  const [mode, setMode] = useState<PlaybackMode>('auto');

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
          // Extract node ID from element ID
          const nodeMatch = el.elementId.match(/linked-list-node-(.+)/);
          if (nodeMatch?.[1]) {
            newHighlights.set(nodeMatch[1], el.state);
          }
          // Handle special elements
          if (el.elementId === 'linked-list-null') {
            newHighlights.set('null', el.state);
          }
          if (el.elementId === 'linked-list-head-pointer') {
            newHighlights.set('head-pointer', el.state);
          }
        });
        setHighlightedElements(newHighlights);
      } else {
        setHighlightedElements(new Map());
      }
    });

    return () => unsubscribe();
  }, [setAnimationState]);

  const handleExecute = useCallback(
    (operation: OperationType, params: { value?: number; position?: number }) => {
      const validation = singlyLinkedListConfig.validate(params, operation, state);
      if (!validation.valid) {
        console.error(validation.error);
        return;
      }

      setCurrentOperation(operation);
      let result;

      switch (operation) {
        case 'insertAtHead':
          result = createInsertAtHeadAnimation(state, params.value!);
          break;
        case 'insertAtTail':
          result = createInsertAtTailAnimation(state, params.value!);
          break;
        case 'insertAtPosition':
          result = createInsertAtPositionAnimation(
            state,
            params.value!,
            params.position ?? 0
          );
          break;
        case 'deleteNode':
          result = createDeleteNodeAnimation(state, params.value!);
          break;
        case 'search':
          result = createSearchAnimation(state, params.value!);
          break;
        case 'traverse':
          result = createTraverseAnimation(state);
          break;
        default:
          return;
      }

      if (result) {
        engineRef.current?.loadSteps(result.steps);
        engineRef.current?.setMode(mode);
        engineRef.current?.play();

        // Update state after animation completes for mutating operations
        if (
          operation === 'insertAtHead' ||
          operation === 'insertAtTail' ||
          operation === 'insertAtPosition' ||
          operation === 'deleteNode'
        ) {
          setState(result.newState);
        }
      }
    },
    [state, mode]
  );

  const handleReset = useCallback(() => {
    engineRef.current?.stop();
    setState(singlyLinkedListConfig.getInitialState());
    setHighlightedElements(new Map());
  }, []);

  const handleRandomize = useCallback(() => {
    engineRef.current?.stop();
    setState(singlyLinkedListConfig.generateRandomData(4));
    setHighlightedElements(new Map());
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
            <h1 className="text-2xl font-bold text-white">
              {singlyLinkedListConfig.name}
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              {singlyLinkedListConfig.description}
            </p>
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
                <SinglyLinkedListVisualizer
                  state={state}
                  highlightedElements={highlightedElements}
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
                codeSnippets={singlyLinkedListCodeSnippets}
                operationId={currentOperation}
                className="max-h-64"
              />
            </div>

            {/* Operations panel */}
            <SinglyLinkedListOperations
              onExecute={handleExecute}
              onReset={handleReset}
              onRandomize={handleRandomize}
              disabled={isAnimating}
              listLength={state.nodes.length}
            />
          </div>
        </TabPanel>

        <TabPanel
          isActive={activeTab === 'overview'}
          className="h-full overflow-y-auto p-6"
        >
          <SinglyLinkedListOverview />
        </TabPanel>

        <TabPanel
          isActive={activeTab === 'complexity'}
          className="h-full overflow-y-auto p-6"
        >
          <SinglyLinkedListComplexity />
        </TabPanel>
      </div>
    </div>
  );
}

export default SinglyLinkedListModule;
