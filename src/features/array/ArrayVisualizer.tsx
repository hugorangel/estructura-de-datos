import { motion, AnimatePresence } from 'framer-motion';
import { VisualizationCanvas } from '@/shared/components/visualization';
import { cn } from '@/shared/utils';
import type { ArrayState } from './config';
import type { ElementVisualState } from '@/core/interfaces';
import { elementVariants, defaultTransition } from '@/constants/animations';

interface ArrayVisualizerProps {
  state: ArrayState;
  highlightedElements: Map<number, ElementVisualState>;
}

export function ArrayVisualizer({ state, highlightedElements }: ArrayVisualizerProps) {
  return (
    <VisualizationCanvas className="min-h-[200px]">
      <div className="flex flex-col items-center gap-6">
        {/* Memory representation label */}
        <div className="text-xs text-neutral-500 font-mono">
          Contiguous Memory Block
        </div>

        {/* Array elements */}
        <div className="flex items-end gap-1">
          <AnimatePresence mode="popLayout">
            {state.elements.map((value, index) => {
              const elementState = highlightedElements.get(index) ?? 'default';
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
                    id={`array-element-${index}`}
                    className={cn(
                      'w-14 h-14 flex items-center justify-center',
                      'border-2 rounded-lg font-mono font-semibold text-lg',
                      'transition-colors duration-200'
                    )}
                  >
                    {value}
                  </motion.div>
                  {/* Index label */}
                  <span className="mt-2 text-xs text-neutral-500 font-mono">
                    [{index}]
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Length indicator */}
        <div className="flex items-center gap-2 text-sm text-neutral-400">
          <span className="font-mono">length:</span>
          <span className="font-mono text-blue-400">{state.elements.length}</span>
        </div>

        {/* Memory address hint */}
        <div className="flex items-center gap-4 text-xs text-neutral-600">
          <span>Base Address: 0x1000</span>
          <span>Element Size: 4 bytes</span>
        </div>
      </div>
    </VisualizationCanvas>
  );
}

export default ArrayVisualizer;
