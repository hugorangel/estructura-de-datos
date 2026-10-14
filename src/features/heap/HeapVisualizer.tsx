import { motion, AnimatePresence } from 'framer-motion';
import { VisualizationCanvas } from '@/shared/components/visualization';
import { cn } from '@/shared/utils';
import type { HeapState } from './config';
import { heapConfig } from './config';
import type { ElementVisualState } from '@/core/interfaces';
import { elementVariants, defaultTransition } from '@/constants/animations';

interface HeapVisualizerProps {
  state: HeapState;
  highlightedElements: Map<number, ElementVisualState>;
}

interface TreeNodePosition {
  x: number;
  y: number;
  index: number;
}

function calculateTreeLayout(size: number, width: number, height: number): TreeNodePosition[] {
  const positions: TreeNodePosition[] = [];
  if (size === 0) return positions;

  const levels = Math.floor(Math.log2(size)) + 1;
  const verticalSpacing = Math.min(70, (height - 40) / levels);
  const startY = 30;

  for (let i = 0; i < size; i++) {
    const level = Math.floor(Math.log2(i + 1));
    const nodesInLevel = Math.pow(2, level);
    const positionInLevel = i - (Math.pow(2, level) - 1);

    const levelWidth = width - 60;
    const spacing = levelWidth / nodesInLevel;
    const startX = spacing / 2 + 30;

    positions.push({
      index: i,
      x: startX + positionInLevel * spacing,
      y: startY + level * verticalSpacing,
    });
  }

  return positions;
}

export function HeapVisualizer({ state, highlightedElements }: HeapVisualizerProps) {
  const treeWidth = 500;
  const treeHeight = 250;
  const positions = calculateTreeLayout(state.elements.length, treeWidth, treeHeight);

  return (
    <VisualizationCanvas className="min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        {/* Heap type indicator */}
        <div className="flex items-center gap-4">
          <div className={cn(
            'px-3 py-1 rounded-full text-xs font-medium',
            state.heapType === 'max'
              ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
              : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
          )}>
            {state.heapType === 'max' ? 'Max-Heap' : 'Min-Heap'}
          </div>
          <div className="text-xs text-neutral-500 font-mono">
            Root is {state.heapType === 'max' ? 'largest' : 'smallest'} element
          </div>
        </div>

        {/* Tree visualization */}
        <div className="relative" style={{ width: treeWidth, height: treeHeight }}>
          {/* Edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {positions.map((pos, i) => {
              if (i === 0) return null;
              const parentIndex = heapConfig.getParentIndex(i);
              const parentPos = positions[parentIndex];
              if (!parentPos) return null;
              const parentState = highlightedElements.get(parentIndex);
              const childState = highlightedElements.get(i);
              const isHighlighted = parentState === 'comparing' || childState === 'comparing' ||
                parentState === 'modified' || childState === 'modified';

              return (
                <motion.line
                  key={`edge-${i}`}
                  x1={parentPos.x}
                  y1={parentPos.y}
                  x2={pos.x}
                  y2={pos.y}
                  stroke={isHighlighted ? '#60a5fa' : '#404040'}
                  strokeWidth={isHighlighted ? 2 : 1}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3 }}
                />
              );
            })}
          </svg>

          {/* Tree nodes */}
          <AnimatePresence mode="popLayout">
            {positions.map((pos, index) => {
              const value = state.elements[index];
              const elementState = highlightedElements.get(index) ?? 'default';

              return (
                <motion.div
                  key={`tree-node-${index}-${value}`}
                  className="absolute"
                  style={{
                    left: pos.x - 24,
                    top: pos.y - 24,
                  }}
                  initial="enter"
                  animate={elementState}
                  exit="exit"
                  variants={elementVariants}
                  transition={defaultTransition}
                >
                  <motion.div
                    id={`heap-tree-${index}`}
                    className={cn(
                      'w-12 h-12 flex items-center justify-center',
                      'rounded-full border-2 font-mono font-semibold',
                      'transition-colors duration-200',
                      index === 0 && 'ring-2 ring-offset-2 ring-offset-background-secondary',
                      index === 0 && (state.heapType === 'max' ? 'ring-orange-500' : 'ring-cyan-500')
                    )}
                  >
                    {value}
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Index formulas */}
        <div className="flex items-center gap-6 px-4 py-2 bg-background-primary rounded-lg text-xs text-neutral-400 font-mono">
          <span>parent = <span className="text-blue-400">(i-1)/2</span></span>
          <span>left = <span className="text-green-400">2i+1</span></span>
          <span>right = <span className="text-purple-400">2i+2</span></span>
        </div>

        {/* Array representation */}
        <div className="flex flex-col items-center gap-2 mt-2">
          <div className="text-xs text-neutral-500 font-mono">
            Array Representation
          </div>
          <div className="flex items-end gap-1">
            <AnimatePresence mode="popLayout">
              {state.elements.map((value, index) => {
                const elementState = highlightedElements.get(index) ?? 'default';
                return (
                  <motion.div
                    key={`array-${index}-${value}`}
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
                      id={`heap-element-${index}`}
                      className={cn(
                        'w-12 h-12 flex items-center justify-center',
                        'border-2 rounded-lg font-mono font-semibold text-lg',
                        'transition-colors duration-200',
                        index === 0 && 'border-dashed',
                        index === 0 && (state.heapType === 'max' ? 'border-orange-500/50' : 'border-cyan-500/50')
                      )}
                    >
                      {value}
                    </motion.div>
                    {/* Index label */}
                    <span className="mt-1 text-xs text-neutral-500 font-mono">
                      [{index}]
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Heap info */}
        <div className="flex items-center gap-4 text-xs text-neutral-500">
          <span className="font-mono">size: <span className="text-blue-400">{state.elements.length}</span></span>
          <span className="font-mono">height: <span className="text-blue-400">{state.elements.length > 0 ? Math.floor(Math.log2(state.elements.length)) + 1 : 0}</span></span>
          {state.elements.length > 0 && (
            <span className="font-mono">
              {state.heapType === 'max' ? 'max' : 'min'}: <span className="text-blue-400">{state.elements[0]}</span>
            </span>
          )}
        </div>
      </div>
    </VisualizationCanvas>
  );
}

export default HeapVisualizer;
