import { motion, AnimatePresence } from 'framer-motion';
import { VisualizationCanvas } from '@/shared/components/visualization';
import { cn } from '@/shared/utils';
import type { HashTableState } from './config';
import { hashTableConfig } from './config';
import type { ElementVisualState } from '@/core/interfaces';
import { elementVariants, defaultTransition } from '@/constants/animations';

interface HashTableVisualizerProps {
  state: HashTableState;
  highlightedElements: Map<string, ElementVisualState>;
  hashCalculation?: {
    key: string;
    currentStep: string;
    result?: number;
  };
}

export function HashTableVisualizer({
  state,
  highlightedElements,
  hashCalculation,
}: HashTableVisualizerProps) {
  const loadFactor = hashTableConfig.getLoadFactor(state);

  return (
    <VisualizationCanvas className="min-h-[400px]">
      <div className="flex flex-col gap-6">
        {/* Header info */}
        <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
          <span>Hash Table with Chaining</span>
          <div className="flex gap-4">
            <span>Size: <span className="text-blue-400">{state.size}</span></span>
            <span>Buckets: <span className="text-blue-400">{state.buckets.length}</span></span>
            <span>Load Factor: <span className={cn(
              loadFactor > 0.75 ? 'text-red-400' : loadFactor > 0.5 ? 'text-yellow-400' : 'text-green-400'
            )}>{loadFactor.toFixed(2)}</span></span>
            <span>Collisions: <span className="text-orange-400">{state.collisionCount}</span></span>
          </div>
        </div>

        {/* Hash function display */}
        {hashCalculation && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background-primary border border-border-default rounded-lg p-4"
          >
            <div className="text-xs text-neutral-500 mb-2">Hash Calculation</div>
            <div className="font-mono text-sm">
              <span className="text-purple-400">hash</span>
              <span className="text-neutral-400">(</span>
              <span className="text-green-400">"{hashCalculation.key}"</span>
              <span className="text-neutral-400">)</span>
              {hashCalculation.result !== undefined && (
                <>
                  <span className="text-neutral-400"> = </span>
                  <span className="text-yellow-400">{hashCalculation.result}</span>
                </>
              )}
            </div>
            {hashCalculation.currentStep && (
              <div className="text-xs text-neutral-400 mt-2">
                {hashCalculation.currentStep}
              </div>
            )}
          </motion.div>
        )}

        {/* Buckets visualization */}
        <div className="flex gap-4">
          {/* Bucket indices column */}
          <div className="flex flex-col gap-2">
            <div className="h-8" /> {/* Spacer for header alignment */}
            {state.buckets.map((_, index) => (
              <div
                key={`index-${index}`}
                className="h-12 flex items-center justify-end pr-2 text-xs font-mono text-neutral-500"
              >
                [{index}]
              </div>
            ))}
          </div>

          {/* Buckets with chains */}
          <div className="flex-1">
            <div className="text-xs text-neutral-500 mb-2 font-mono">Buckets</div>
            <div className="flex flex-col gap-2">
              {state.buckets.map((bucket, bucketIndex) => {
                const bucketState = highlightedElements.get(`bucket-${bucketIndex}`) ?? 'default';
                return (
                  <div key={`bucket-${bucketIndex}`} className="flex items-center gap-2">
                    {/* Bucket box */}
                    <motion.div
                      id={`bucket-${bucketIndex}`}
                      animate={bucketState}
                      variants={elementVariants}
                      transition={defaultTransition}
                      className={cn(
                        'w-12 h-12 flex items-center justify-center',
                        'border-2 rounded-lg font-mono text-xs',
                        'transition-colors duration-200',
                        bucket.entries.length === 0
                          ? 'border-dashed border-neutral-700 text-neutral-600'
                          : 'border-border-default'
                      )}
                    >
                      {bucket.entries.length === 0 ? 'null' : ''}
                    </motion.div>

                    {/* Arrow to chain */}
                    {bucket.entries.length > 0 && (
                      <div className="text-neutral-600">→</div>
                    )}

                    {/* Chain entries */}
                    <AnimatePresence mode="popLayout">
                      {bucket.entries.map((entry, entryIndex) => {
                        const entryState = highlightedElements.get(`entry-${bucketIndex}-${entryIndex}`) ?? 'default';
                        return (
                          <motion.div
                            key={`${entry.key}-${entry.value}`}
                            layout
                            initial="enter"
                            animate={entryState}
                            exit="exit"
                            variants={elementVariants}
                            transition={defaultTransition}
                            className="flex items-center gap-1"
                          >
                            <motion.div
                              id={`entry-${bucketIndex}-${entryIndex}`}
                              className={cn(
                                'px-3 py-2 rounded-lg border-2',
                                'font-mono text-sm',
                                'transition-colors duration-200'
                              )}
                            >
                              <span className="text-green-400">{entry.key}</span>
                              <span className="text-neutral-500">:</span>
                              <span className="text-blue-400">{entry.value}</span>
                            </motion.div>
                            {entryIndex < bucket.entries.length - 1 && (
                              <span className="text-neutral-600">→</span>
                            )}
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>

                    {/* Chain end marker */}
                    {bucket.entries.length > 0 && (
                      <span className="text-neutral-700 text-xs ml-1">null</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 text-xs text-neutral-500 pt-4 border-t border-border-default">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border-2 border-dashed border-neutral-700" />
            <span>Empty bucket</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-green-500" />
            <span>Found/Inserted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-orange-500" />
            <span>Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-yellow-500" />
            <span>Current</span>
          </div>
        </div>
      </div>
    </VisualizationCanvas>
  );
}

export default HashTableVisualizer;
