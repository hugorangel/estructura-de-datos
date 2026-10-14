import { motion, AnimatePresence } from 'framer-motion';
import { VisualizationCanvas } from '@/shared/components/visualization';
import { cn } from '@/shared/utils';
import type { QueueState } from './config';
import type { ElementVisualState } from '@/core/interfaces';
import { elementVariants, defaultTransition } from '@/constants/animations';

interface QueueVisualizerProps {
  state: QueueState;
  highlightedElements: Map<number, ElementVisualState>;
}

export function QueueVisualizer({ state, highlightedElements }: QueueVisualizerProps) {
  return (
    <VisualizationCanvas className="min-h-[200px]">
      <div className="flex flex-col items-center gap-6">
        {/* FIFO label */}
        <div className="text-xs text-neutral-500 font-mono">
          FIFO (First-In-First-Out)
        </div>

        {/* Queue container with pointers */}
        <div className="flex items-center gap-4">
          {/* FRONT pointer */}
          <div className="flex flex-col items-center">
            <div className="text-xs font-mono text-green-400 mb-2">FRONT</div>
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-green-400" />
          </div>

          {/* Queue elements */}
          <div className="flex items-center gap-1 px-4 py-2 border-2 border-dashed border-neutral-700 rounded-lg min-w-[200px]">
            <AnimatePresence mode="popLayout">
              {state.elements.length === 0 ? (
                <div className="text-neutral-600 text-sm font-mono py-4 px-8">
                  Empty Queue
                </div>
              ) : (
                state.elements.map((value, index) => {
                  const elementState = highlightedElements.get(index) ?? 'default';
                  const isFirst = index === 0;
                  const isLast = index === state.elements.length - 1;

                  return (
                    <motion.div
                      key={`${index}-${value}`}
                      layout
                      initial="enter"
                      animate={elementState}
                      exit="exit"
                      variants={elementVariants}
                      transition={defaultTransition}
                      className="flex flex-col items-center"
                    >
                      {/* Element box */}
                      <motion.div
                        id={`queue-element-${index}`}
                        className={cn(
                          'w-14 h-14 flex items-center justify-center',
                          'border-2 rounded-lg font-mono font-semibold text-lg',
                          'transition-colors duration-200',
                          isFirst && 'border-green-500/50',
                          isLast && !isFirst && 'border-blue-500/50'
                        )}
                      >
                        {value}
                      </motion.div>
                      {/* Position label */}
                      <span className="mt-2 text-xs text-neutral-500 font-mono">
                        {isFirst ? 'front' : isLast ? 'rear' : index}
                      </span>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>

          {/* REAR pointer */}
          <div className="flex flex-col items-center">
            <div className="text-xs font-mono text-blue-400 mb-2">REAR</div>
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-blue-400" />
          </div>
        </div>

        {/* Flow direction indicator */}
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <span>Dequeue</span>
          <div className="flex items-center">
            <div className="w-8 h-0.5 bg-neutral-600" />
            <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-t-transparent border-b-transparent border-l-neutral-600" />
          </div>
          <span className="mx-2">|</span>
          <div className="flex items-center">
            <div className="w-0 h-0 border-t-4 border-b-4 border-r-6 border-t-transparent border-b-transparent border-r-neutral-600" />
            <div className="w-8 h-0.5 bg-neutral-600" />
          </div>
          <span>Enqueue</span>
        </div>

        {/* Size indicator */}
        <div className="flex items-center gap-2 text-sm text-neutral-400">
          <span className="font-mono">size:</span>
          <span className="font-mono text-blue-400">{state.elements.length}</span>
        </div>
      </div>
    </VisualizationCanvas>
  );
}

export default QueueVisualizer;
