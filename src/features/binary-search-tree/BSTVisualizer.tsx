import { motion, AnimatePresence } from 'framer-motion';
import { VisualizationCanvas } from '@/shared/components/visualization';
import { cn } from '@/shared/utils';
import type { BSTState, BSTNode } from './config';
import type { ElementVisualState } from '@/core/interfaces';
import { elementVariants, defaultTransition } from '@/constants/animations';

interface BSTVisualizerProps {
  state: BSTState;
  highlightedElements: Map<number, ElementVisualState>;
}

interface NodePosition {
  x: number;
  y: number;
  value: number;
  left?: NodePosition;
  right?: NodePosition;
}

// Calculate tree layout with proper spacing
function calculateTreeLayout(
  node: BSTNode | null,
  depth: number = 0,
  minX: number = 0,
  maxX: number = 800
): NodePosition | null {
  if (!node) return null;

  const x = (minX + maxX) / 2;
  const y = depth * 80 + 50;

  const leftChild = calculateTreeLayout(node.left, depth + 1, minX, x - 20);
  const rightChild = calculateTreeLayout(node.right, depth + 1, x + 20, maxX);

  return {
    x,
    y,
    value: node.value,
    left: leftChild ?? undefined,
    right: rightChild ?? undefined,
  };
}

// Collect all positioned nodes for rendering
function collectNodes(position: NodePosition | null): NodePosition[] {
  if (!position) return [];
  return [
    position,
    ...collectNodes(position.left ?? null),
    ...collectNodes(position.right ?? null),
  ];
}

// Collect all edges for SVG rendering
interface Edge {
  from: { x: number; y: number };
  to: { x: number; y: number };
  fromValue: number;
  toValue: number;
}

function collectEdges(position: NodePosition | null): Edge[] {
  if (!position) return [];

  const edges: Edge[] = [];

  if (position.left) {
    edges.push({
      from: { x: position.x, y: position.y },
      to: { x: position.left.x, y: position.left.y },
      fromValue: position.value,
      toValue: position.left.value,
    });
    edges.push(...collectEdges(position.left));
  }

  if (position.right) {
    edges.push({
      from: { x: position.x, y: position.y },
      to: { x: position.right.x, y: position.right.y },
      fromValue: position.value,
      toValue: position.right.value,
    });
    edges.push(...collectEdges(position.right));
  }

  return edges;
}

export function BSTVisualizer({ state, highlightedElements }: BSTVisualizerProps) {
  const layout = calculateTreeLayout(state.root);
  const nodes = collectNodes(layout);
  const edges = collectEdges(layout);

  // Calculate canvas dimensions based on tree
  const minNodeX = nodes.length > 0 ? Math.min(...nodes.map((n) => n.x)) : 0;
  const maxNodeX = nodes.length > 0 ? Math.max(...nodes.map((n) => n.x)) : 800;
  const maxNodeY = nodes.length > 0 ? Math.max(...nodes.map((n) => n.y)) : 100;

  const canvasWidth = Math.max(800, maxNodeX - minNodeX + 150);
  const canvasHeight = Math.max(300, maxNodeY + 100);

  // Center offset for positioning
  const offsetX = (canvasWidth - (maxNodeX - minNodeX)) / 2 - minNodeX;

  return (
    <VisualizationCanvas className="min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        {/* Tree label */}
        <div className="text-xs text-neutral-500 font-mono">
          Binary Search Tree (left &lt; parent &lt; right)
        </div>

        {/* Tree visualization */}
        <div className="relative" style={{ width: canvasWidth, height: canvasHeight }}>
          {/* SVG layer for edges */}
          <svg
            className="absolute inset-0 pointer-events-none"
            width={canvasWidth}
            height={canvasHeight}
          >
            <AnimatePresence>
              {edges.map((edge) => {
                const parentState = highlightedElements.get(edge.fromValue);
                const childState = highlightedElements.get(edge.toValue);
                const isHighlighted = parentState === 'comparing' ||
                                     parentState === 'found' ||
                                     childState === 'comparing' ||
                                     childState === 'found';

                return (
                  <motion.line
                    key={`edge-${edge.fromValue}-${edge.toValue}`}
                    x1={edge.from.x + offsetX}
                    y1={edge.from.y + 25}
                    x2={edge.to.x + offsetX}
                    y2={edge.to.y - 25}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: 1,
                      stroke: isHighlighted ? '#fbbf24' : '#525252',
                      strokeWidth: isHighlighted ? 3 : 2,
                    }}
                    exit={{ pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="stroke-current"
                  />
                );
              })}
            </AnimatePresence>
          </svg>

          {/* Nodes layer */}
          <AnimatePresence mode="popLayout">
            {nodes.map((nodePos) => {
              const elementState = highlightedElements.get(nodePos.value) ?? 'default';

              return (
                <motion.div
                  key={`bst-node-${nodePos.value}`}
                  layout
                  initial="enter"
                  animate={elementState}
                  exit="exit"
                  variants={elementVariants}
                  transition={defaultTransition}
                  className="absolute flex flex-col items-center"
                  style={{
                    left: nodePos.x + offsetX - 25,
                    top: nodePos.y - 25,
                  }}
                >
                  {/* Node circle */}
                  <motion.div
                    id={`bst-node-${nodePos.value}`}
                    className={cn(
                      'w-[50px] h-[50px] flex items-center justify-center',
                      'border-2 rounded-full font-mono font-semibold text-lg',
                      'transition-colors duration-200 bg-background-tertiary'
                    )}
                  >
                    {nodePos.value}
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Tree info */}
        <div className="flex items-center gap-6 text-sm text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="font-mono">Nodes:</span>
            <span className="font-mono text-blue-400">{nodes.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono">Height:</span>
            <span className="font-mono text-blue-400">
              {nodes.length > 0 ? Math.floor(Math.log2(nodes.length)) + 1 : 0}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span>Comparing</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Found</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Visited</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span>Modified</span>
          </div>
        </div>
      </div>
    </VisualizationCanvas>
  );
}

export default BSTVisualizer;
