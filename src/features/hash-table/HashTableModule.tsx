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
import { HashTableVisualizer } from './HashTableVisualizer';
import { HashTableOperations } from './HashTableOperations';
import { HashTableOverview } from './HashTableOverview';
import { HashTableComplexity } from './HashTableComplexity';
import { hashTableConfig, type HashTableState } from './config';
import { hashTableCodeSnippets } from './code';
import {
  createInsertAnimation,
  createDeleteAnimation,
  createSearchAnimation,
  createHashAnimation,
} from './animations';
import type { ElementVisualState, PlaybackMode } from '@/core/interfaces';

const tabs = [
  { id: 'visualize', label: 'Visualize' },
  { id: 'overview', label: 'Overview' },
  { id: 'complexity', label: 'Complexity' },
];

export function HashTableModule() {
  const [activeTab, setActiveTab] = useState('visualize');
  const [state, setState] = useState<HashTableState>(hashTableConfig.getInitialState());
  const [highlightedElements, setHighlightedElements] = useState<Map<string, ElementVisualState>>(new Map());
  const [currentOperation, setCurrentOperation] = useState<string>('insert');
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
          // Extract element ID patterns for buckets and entries
          const bucketMatch = el.elementId.match(/bucket-(\d+)/);
          const entryMatch = el.elementId.match(/entry-(\d+)-(\d+)/);
          if (bucketMatch || entryMatch) {
            newHighlights.set(el.elementId, el.state);
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
    (operation: string, params: { key?: string; value?: number }) => {
      const validation = hashTableConfig.validate(params, operation, state);
      if (!validation.valid) {
        console.error(validation.error);
        return;
      }

      setCurrentOperation(operation);
      let result;

      switch (operation) {
        case 'insert':
          result = createInsertAnimation(state, params.key!, params.value!);
          break;
        case 'delete':
          result = createDeleteAnimation(state, params.key!);
          break;
        case 'search':
          result = createSearchAnimation(state, params.key!);
          break;
        case 'hash':
          result = createHashAnimation(state, params.key!);
          break;
        default:
          return;
      }

      if (result) {
        engineRef.current?.loadSteps(result.steps);
        engineRef.current?.setMode(mode);
        engineRef.current?.play();

        // Update state after animation completes for state-modifying operations
        if (operation === 'insert' || operation === 'delete') {
          setState(result.newState);
        }
      }
    },
    [state, mode]
  );

  const handleReset = useCallback(() => {
    engineRef.current?.stop();
    setState(hashTableConfig.getInitialState());
    setHighlightedElements(new Map());
  }, []);

  const handleRandomize = useCallback(() => {
    engineRef.current?.stop();
    const randomEntries = hashTableConfig.generateRandomData(5);
    const newBuckets = Array.from({ length: 8 }, () => ({ entries: [] as { key: string; value: number }[] }));
    let collisionCount = 0;

    randomEntries.forEach(entry => {
      const bucketIndex = hashTableConfig.hashFunction(entry.key, 8);
      if (newBuckets[bucketIndex]!.entries.length > 0) {
        collisionCount++;
      }
      newBuckets[bucketIndex]!.entries.push(entry);
    });

    setState({
      buckets: newBuckets,
      size: randomEntries.length,
      collisionStrategy: 'chaining',
      collisionCount,
    });
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
            <h1 className="text-2xl font-bold text-white">{hashTableConfig.name}</h1>
            <p className="text-sm text-neutral-400 mt-1">{hashTableConfig.description}</p>
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
              <div className="flex-1 min-h-0 overflow-auto">
                <HashTableVisualizer
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
                codeSnippets={hashTableCodeSnippets}
                operationId={currentOperation}
                className="max-h-64"
              />
            </div>

            {/* Operations panel */}
            <HashTableOperations
              onExecute={handleExecute}
              onReset={handleReset}
              onRandomize={handleRandomize}
              disabled={isAnimating}
              size={state.size}
              bucketCount={state.buckets.length}
            />
          </div>
        </TabPanel>

        <TabPanel isActive={activeTab === 'overview'} className="h-full overflow-y-auto p-6">
          <HashTableOverview />
        </TabPanel>

        <TabPanel isActive={activeTab === 'complexity'} className="h-full overflow-y-auto p-6">
          <HashTableComplexity />
        </TabPanel>
      </div>
    </div>
  );
}

export default HashTableModule;
