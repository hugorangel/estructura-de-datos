import { motion, AnimatePresence } from 'framer-motion';
import { VisualizationCanvas } from '@/shared/components/visualization';
import { cn } from '@/shared/utils';
import type { StackState } from './config';
import type { ElementVisualState } from '@/core/interfaces';
import { elementVariants, defaultTransition } from '@/constants/animations';

interface StackVisualizerProps {
  state: StackState;
  highlightedElements: Map<number, ElementVisualState>;
}

export function StackVisualizer({ state, highlightedElements }: StackVisualizerProps) {
  const baseAddress = 0x2000;

  return (
    <VisualizationCanvas className="min-h-[300px]">
      <div className="flex flex-col items-center gap-4">
        {/* Stack label */}
        <div className="text-xs text-neutral-500 font-mono">
          LIFO - Last In, First Out
        </div>

        <div className="flex items-start gap-8">
          {/* Memory addresses column */}
          <div className="flex flex-col-reverse gap-1 pt-1">
            {state.elements.map((_, index) => (
              <div
                key={`addr-${index}`}
                className="h-14 flex items-center justify-end pr-2 text-xs text-neutral-600 font-mono"
              >
                0x{(baseAddress + index * 4).toString(16).toUpperCase()}
              </div>
            ))}
          </div>

          {/* Stack elements (vertical, bottom element at bottom) */}
          <div className="flex flex-col-reverse gap-1 relative">
            <AnimatePresence mode="popLayout">
              {state.elements.map((value, index) => {
                const elementState = highlightedElements.get(index) ?? 'default';
                const isTop = index === state.elements.length - 1;

                return (
                  <motion.div
                    key={`${index}-${value}`}
                    layout
                    initial="enter"
                    animate={elementState}
                    exit="exit"
                    variants={elementVariants}
                    transition={defaultTransition}
                    className="flex items-center gap-2"
                  >
                    {/* Element box */}
                    <motion.div
                      id={`stack-element-${index}`}
                      className={cn(
                        'w-20 h-14 flex items-center justify-center',
                        'border-2 rounded-lg font-mono font-semibold text-lg',
                        'transition-colors duration-200'
                      )}
                    >
                      {value}
                    </motion.div>

                    {/* TOP pointer for topmost element */}
                    {isTop && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-1"
                      >
                        <div className="w-6 h-0.5 bg-green-500" />
                        <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-green-500" />
                        <span className="text-xs font-mono text-green-500 font-semibold ml-1">
                          TOP
                        </span>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Empty stack indicator */}
            {state.elements.length === 0 && (
              <div className="w-20 h-14 flex items-center justify-center border-2 border-dashed border-neutral-600 rounded-lg text-neutral-500 text-sm">
                Empty
              </div>
            )}
          </div>

          {/* Stack info column */}
          <div className="flex flex-col gap-2 text-sm text-neutral-400 min-w-[100px]">
            <div className="flex items-center gap-2">
              <span className="font-mono">size:</span>
              <span className="font-mono text-blue-400">{state.elements.length}</span>
            </div>
            {state.elements.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="font-mono">top:</span>
                <span className="font-mono text-green-400">
                  {state.elements[state.elements.length - 1]}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Stack visualization hint */}
        <div className="flex items-center gap-4 text-xs text-neutral-600 mt-4">
          <span>Push: Add to top</span>
          <span className="text-neutral-700">|</span>
          <span>Pop: Remove from top</span>
          <span className="text-neutral-700">|</span>
          <span>Peek: View top</span>
        </div>
      </div>
    </VisualizationCanvas>
  );
}

export default StackVisualizer;
