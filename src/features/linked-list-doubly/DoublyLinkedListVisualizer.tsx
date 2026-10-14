import { motion, AnimatePresence } from 'framer-motion';
import { VisualizationCanvas } from '@/shared/components/visualization';
import { cn } from '@/shared/utils';
import type { DoublyLinkedListState } from './config';
import type { ElementVisualState } from '@/core/interfaces';
import { elementVariants, defaultTransition } from '@/constants/animations';

interface DoublyLinkedListVisualizerProps {
  state: DoublyLinkedListState;
  highlightedElements: Map<string, ElementVisualState>;
}

export function DoublyLinkedListVisualizer({
  state,
  highlightedElements,
}: DoublyLinkedListVisualizerProps) {
  return (
    <VisualizationCanvas className="min-h-[280px]">
      <div className="flex flex-col items-center gap-6">
        {/* Header labels */}
        <div className="text-xs text-neutral-500 font-mono">
          Doubly Linked Nodes with Bidirectional Pointers
        </div>

        {/* Main visualization */}
        <div className="flex items-center gap-2">
          {/* NULL (before head) */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-8 flex items-center justify-center text-xs text-neutral-600 font-mono border border-dashed border-neutral-700 rounded">
              null
            </div>
          </div>

          {/* Prev arrow from head */}
          {state.nodes.length > 0 && (
            <div className="flex items-center">
              <svg width="24" height="20" className="text-neutral-600">
                <line x1="20" y1="10" x2="4" y2="10" stroke="currentColor" strokeWidth="1.5" />
                <polygon points="4,10 10,6 10,14" fill="currentColor" />
              </svg>
            </div>
          )}

          {/* Nodes */}
          <AnimatePresence mode="popLayout">
            {state.nodes.map((node, index) => {
              const elementState = highlightedElements.get(node.id) ?? 'default';
              const isLast = index === state.nodes.length - 1;

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
                  <div className="flex flex-col items-center">
                    {/* HEAD/TAIL label */}
                    <div className="h-5 mb-1 flex items-center gap-1">
                      {index === 0 && (
                        <span className="text-xs font-mono text-green-400 bg-green-400/10 px-2 py-0.5 rounded">
                          HEAD
                        </span>
                      )}
                      {isLast && (
                        <span className="text-xs font-mono text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded">
                          TAIL
                        </span>
                      )}
                    </div>

                    {/* Node box */}
                    <motion.div
                      id={`node-${node.id}`}
                      className={cn(
                        'relative flex items-center',
                        'border-2 rounded-lg transition-colors duration-200',
                        elementState === 'default' && 'border-border-default bg-background-secondary',
                        elementState === 'comparing' && 'border-yellow-500 bg-yellow-500/10',
                        elementState === 'found' && 'border-green-500 bg-green-500/10',
                        elementState === 'deleting' && 'border-red-500 bg-red-500/10',
                        elementState === 'modified' && 'border-blue-500 bg-blue-500/10'
                      )}
                    >
                      {/* Prev pointer section */}
                      <div
                        id={`pointer-${node.id}-prev`}
                        className={cn(
                          'w-8 h-14 flex items-center justify-center',
                          'border-r border-neutral-700 text-neutral-500'
                        )}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" className="text-orange-400">
                          <line x1="12" y1="8" x2="4" y2="8" stroke="currentColor" strokeWidth="1.5" />
                          <polygon points="4,8 8,5 8,11" fill="currentColor" />
                        </svg>
                      </div>

                      {/* Value section */}
                      <div className="w-14 h-14 flex items-center justify-center font-mono font-semibold text-lg text-white">
                        {node.value}
                      </div>

                      {/* Next pointer section */}
                      <div
                        id={`pointer-${node.id}-next`}
                        className={cn(
                          'w-8 h-14 flex items-center justify-center',
                          'border-l border-neutral-700 text-neutral-500'
                        )}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" className="text-blue-400">
                          <line x1="4" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="1.5" />
                          <polygon points="12,8 8,5 8,11" fill="currentColor" />
                        </svg>
                      </div>
                    </motion.div>

                    {/* Node label */}
                    <div className="mt-2 flex flex-col items-center">
                      <span className="text-xs text-neutral-500 font-mono">
                        [{index}]
                      </span>
                    </div>
                  </div>

                  {/* Bidirectional arrows between nodes */}
                  {!isLast && (
                    <div className="flex flex-col items-center mx-1 gap-1">
                      {/* Next arrow (top) */}
                      <svg width="32" height="12" className="text-blue-400">
                        <line x1="4" y1="6" x2="24" y2="6" stroke="currentColor" strokeWidth="1.5" />
                        <polygon points="24,6 18,2 18,10" fill="currentColor" />
                      </svg>
                      {/* Prev arrow (bottom) */}
                      <svg width="32" height="12" className="text-orange-400">
                        <line x1="28" y1="6" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5" />
                        <polygon points="8,6 14,2 14,10" fill="currentColor" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Next arrow to tail's null */}
          {state.nodes.length > 0 && (
            <div className="flex items-center">
              <svg width="24" height="20" className="text-neutral-600">
                <line x1="4" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1.5" />
                <polygon points="20,10 14,6 14,14" fill="currentColor" />
              </svg>
            </div>
          )}

          {/* NULL (after tail) */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-8 flex items-center justify-center text-xs text-neutral-600 font-mono border border-dashed border-neutral-700 rounded">
              null
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <svg width="20" height="12" className="text-blue-400">
              <line x1="2" y1="6" x2="14" y2="6" stroke="currentColor" strokeWidth="1.5" />
              <polygon points="14,6 10,3 10,9" fill="currentColor" />
            </svg>
            <span>next pointer</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="20" height="12" className="text-orange-400">
              <line x1="18" y1="6" x2="6" y2="6" stroke="currentColor" strokeWidth="1.5" />
              <polygon points="6,6 10,3 10,9" fill="currentColor" />
            </svg>
            <span>prev pointer</span>
          </div>
        </div>

        {/* Node count */}
        <div className="flex items-center gap-2 text-sm text-neutral-400">
          <span className="font-mono">length:</span>
          <span className="font-mono text-blue-400">{state.nodes.length}</span>
        </div>
      </div>
    </VisualizationCanvas>
  );
}

export default DoublyLinkedListVisualizer;
