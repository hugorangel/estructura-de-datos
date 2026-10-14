import { motion, AnimatePresence } from 'framer-motion';
import { VisualizationCanvas } from '@/shared/components/visualization';
import { cn } from '@/shared/utils';
import type { SinglyLinkedListState } from './config';
import { singlyLinkedListConfig } from './config';
import type { ElementVisualState } from '@/core/interfaces';
import { elementVariants, defaultTransition } from '@/constants/animations';
import { ArrowRight } from 'lucide-react';

interface SinglyLinkedListVisualizerProps {
  state: SinglyLinkedListState;
  highlightedElements: Map<string, ElementVisualState>;
}

export function SinglyLinkedListVisualizer({
  state,
  highlightedElements,
}: SinglyLinkedListVisualizerProps) {
  const orderedNodes = singlyLinkedListConfig.getOrderedNodes(state);

  return (
    <VisualizationCanvas className="min-h-[250px]">
      <div className="flex flex-col items-center gap-6">
        {/* Memory representation label */}
        <div className="text-xs text-neutral-500 font-mono">
          Non-Contiguous Memory (Nodes linked by pointers)
        </div>

        {/* Linked list visualization */}
        <div className="flex items-center gap-2">
          {/* HEAD pointer */}
          <div className="flex flex-col items-center mr-2">
            <motion.div
              id="linked-list-head-pointer"
              className="px-3 py-1 bg-purple-600/20 border border-purple-500 rounded text-purple-400 text-xs font-mono font-semibold"
              animate={{
                scale: highlightedElements.has('head-pointer') ? 1.1 : 1,
              }}
            >
              HEAD
            </motion.div>
            <ArrowRight className="w-5 h-5 text-purple-400 mt-1" />
          </div>

          {/* Nodes */}
          <AnimatePresence mode="popLayout">
            {orderedNodes.map((node, index) => {
              const elementState = highlightedElements.get(node.id) ?? 'default';
              const isLast = index === orderedNodes.length - 1;

              return (
                <motion.div
                  key={node.id}
                  layout
                  initial="enter"
                  animate={elementState}
                  exit="exit"
                  variants={elementVariants}
                  transition={defaultTransition}
                  className="flex items-center"
                >
                  {/* Node container */}
                  <motion.div
                    id={`linked-list-node-${node.id}`}
                    className={cn(
                      'flex items-center border-2 rounded-lg overflow-hidden',
                      'transition-colors duration-200',
                      elementState === 'default' && 'border-border-default bg-background-tertiary',
                      elementState === 'comparing' && 'border-yellow-500 bg-yellow-500/10',
                      elementState === 'found' && 'border-green-500 bg-green-500/10',
                      elementState === 'visited' && 'border-neutral-600 bg-neutral-800/50',
                      elementState === 'deleting' && 'border-red-500 bg-red-500/10',
                      elementState === 'modified' && 'border-blue-500 bg-blue-500/10'
                    )}
                  >
                    {/* Value section */}
                    <div className="w-14 h-14 flex flex-col items-center justify-center border-r border-border-default">
                      <span className="text-xs text-neutral-500 font-mono">val</span>
                      <span className="font-mono font-semibold text-lg text-white">
                        {node.value}
                      </span>
                    </div>

                    {/* Next pointer section */}
                    <div
                      id={`linked-list-pointer-${node.id}`}
                      className="w-10 h-14 flex flex-col items-center justify-center bg-background-primary/50"
                    >
                      <span className="text-xs text-neutral-500 font-mono">next</span>
                      <ArrowRight
                        className={cn(
                          'w-4 h-4 mt-1',
                          node.next ? 'text-blue-400' : 'text-neutral-600'
                        )}
                      />
                    </div>
                  </motion.div>

                  {/* Arrow to next node */}
                  {!isLast && (
                    <motion.div
                      className="mx-1"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                    >
                      <ArrowRight className="w-6 h-6 text-blue-400" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* NULL terminator */}
          <motion.div
            id="linked-list-null"
            className={cn(
              'flex items-center ml-1',
              highlightedElements.has('null') && 'scale-110'
            )}
            animate={{
              scale: highlightedElements.has('null') ? 1.1 : 1,
            }}
          >
            <ArrowRight className="w-5 h-5 text-neutral-600 mr-1" />
            <div className="px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-neutral-500 text-sm font-mono">
              null
            </div>
          </motion.div>
        </div>

        {/* Node count indicator */}
        <div className="flex items-center gap-2 text-sm text-neutral-400">
          <span className="font-mono">nodes:</span>
          <span className="font-mono text-blue-400">{orderedNodes.length}</span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 text-xs text-neutral-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border border-purple-500 rounded" />
            <span>HEAD pointer</span>
          </div>
          <div className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-blue-400" />
            <span>Next reference</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-neutral-800 border border-neutral-700 rounded" />
            <span>null (end)</span>
          </div>
        </div>
      </div>
    </VisualizationCanvas>
  );
}

export default SinglyLinkedListVisualizer;
