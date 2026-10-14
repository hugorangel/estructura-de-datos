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
import { DoublyLinkedListVisualizer } from './DoublyLinkedListVisualizer';
import { DoublyLinkedListOperations } from './DoublyLinkedListOperations';
import { DoublyLinkedListOverview } from './DoublyLinkedListOverview';
import { DoublyLinkedListComplexity } from './DoublyLinkedListComplexity';
import { doublyLinkedListConfig, type DoublyLinkedListState } from './config';
import { doublyLinkedListCodeSnippets } from './code';
import {
  createInsertAtHeadAnimation,
  createInsertAtTailAnimation,
  createInsertAtPositionAnimation,
  createDeleteNodeAnimation,
  createTraverseForwardAnimation,
  createTraverseBackwardAnimation,
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
  | 'traverseForward'
  | 'traverseBackward';

export function DoublyLinkedListModule() {
  const [activeTab, setActiveTab] = useState('visualize');
  const [state, setState] = useState<DoublyLinkedListState>(
    doublyLinkedListConfig.getInitialState()
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
          const match = el.elementId.match(/node-(node-\d+)/);
          if (match?.[1]) {
            newHighlights.set(match[1], el.state);
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
      const validation = doublyLinkedListConfig.validate(params, operation, state);
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
          result = createInsertAtPositionAnimation(state, params.value!, params.position!);
          break;
        case 'deleteNode':
          result = createDeleteNodeAnimation(state, params.position!);
          break;
        case 'traverseForward':
          result = createTraverseForwardAnimation(state);
          break;
        case 'traverseBackward':
          result = createTraverseBackwardAnimation(state);
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
    setState(doublyLinkedListConfig.getInitialState());
    setHighlightedElements(new Map());
  }, []);

  const handleRandomize = useCallback(() => {
    engineRef.current?.stop();
    setState(doublyLinkedListConfig.generateRandomData(4));
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
              {doublyLinkedListConfig.name}
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              {doublyLinkedListConfig.description}
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
                <DoublyLinkedListVisualizer
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
                codeSnippets={doublyLinkedListCodeSnippets}
                operationId={currentOperation}
                className="max-h-64"
              />
            </div>

            {/* Operations panel */}
            <DoublyLinkedListOperations
              onExecute={handleExecute}
              onReset={handleReset}
              onRandomize={handleRandomize}
              disabled={isAnimating}
              nodeCount={state.nodes.length}
            />
          </div>
        </TabPanel>

        <TabPanel isActive={activeTab === 'overview'} className="h-full overflow-y-auto p-6">
          <DoublyLinkedListOverview />
        </TabPanel>

        <TabPanel isActive={activeTab === 'complexity'} className="h-full overflow-y-auto p-6">
          <DoublyLinkedListComplexity />
        </TabPanel>
      </div>
    </div>
  );
}

export default DoublyLinkedListModule;
