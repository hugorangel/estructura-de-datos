import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VisualizationCanvas } from '@/shared/components/visualization';
import { cn } from '@/shared/utils';
import type { GraphState } from './config';
import type { ElementVisualState } from '@/core/interfaces';
import { defaultTransition } from '@/constants/animations';

interface GraphVisualizerProps {
  state: GraphState;
  highlightedElements: Map<string, ElementVisualState>;
  onNodeClick?: (nodeId: string) => void;
  onNodeDrag?: (nodeId: string, x: number, y: number) => void;
  traversalData?: {
    queue?: string[];
    stack?: string[];
    visited: string[];
    path: string[];
  };
}

const NODE_RADIUS = 24;

export function GraphVisualizer({
  state,
  highlightedElements,
  onNodeClick,
  onNodeDrag,
  traversalData,
}: GraphVisualizerProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent, nodeId: string) => {
    if (onNodeDrag) {
      const node = state.nodes.find(n => n.id === nodeId);
      if (node) {
        setDragging(nodeId);
        setDragOffset({
          x: e.clientX - node.x,
          y: e.clientY - node.y,
        });
      }
    }
  }, [state.nodes, onNodeDrag]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (dragging && onNodeDrag && svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const x = e.clientX - svgRect.left - dragOffset.x + svgRect.left;
      const y = e.clientY - svgRect.top - dragOffset.y + svgRect.top;
      onNodeDrag(dragging, Math.max(NODE_RADIUS, Math.min(400 - NODE_RADIUS, x)), Math.max(NODE_RADIUS, Math.min(400 - NODE_RADIUS, y)));
    }
  }, [dragging, dragOffset, onNodeDrag]);

  const handleMouseUp = useCallback(() => {
    setDragging(null);
  }, []);

  // Get edge color based on highlight state
  const getEdgeColor = (from: string, to: string): string => {
    const edgeId = `graph-edge-${from}-${to}`;
    const reverseEdgeId = `graph-edge-${to}-${from}`;
    const state = highlightedElements.get(edgeId) ?? highlightedElements.get(reverseEdgeId);

    switch (state) {
      case 'current': return '#fbbf24';
      case 'comparing': return '#f97316';
      case 'visited': return '#3b82f6';
      case 'found': return '#22c55e';
      case 'deleting': return '#ef4444';
      default: return '#6b7280';
    }
  };

  // Calculate arrow points for directed edges
  const getArrowPath = (x1: number, y1: number, x2: number, y2: number): string => {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const arrowLength = 10;
    const arrowAngle = Math.PI / 6;

    // Adjust end point to stop at node edge
    const endX = x2 - NODE_RADIUS * Math.cos(angle);
    const endY = y2 - NODE_RADIUS * Math.sin(angle);

    const x3 = endX - arrowLength * Math.cos(angle - arrowAngle);
    const y3 = endY - arrowLength * Math.sin(angle - arrowAngle);
    const x4 = endX - arrowLength * Math.cos(angle + arrowAngle);
    const y4 = endY - arrowLength * Math.sin(angle + arrowAngle);

    return `M ${endX} ${endY} L ${x3} ${y3} M ${endX} ${endY} L ${x4} ${y4}`;
  };

  return (
    <VisualizationCanvas className="min-h-[450px]">
      <div className="flex gap-4 h-full">
        {/* Main graph area */}
        <div className="flex-1 flex flex-col">
          {/* Graph type indicator */}
          <div className="text-xs text-neutral-500 font-mono mb-2 flex items-center gap-2">
            <span className={cn(
              'px-2 py-1 rounded',
              state.directed ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
            )}>
              {state.directed ? 'Directed Graph' : 'Undirected Graph'}
            </span>
            <span>|</span>
            <span>Nodes: {state.nodes.length}</span>
            <span>|</span>
            <span>Edges: {state.edges.length}</span>
          </div>

          {/* SVG Graph */}
          <svg
            ref={svgRef}
            className="flex-1 bg-background-primary rounded-lg border border-border-default"
            viewBox="0 0 400 350"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Edges */}
            <g className="edges">
              {state.edges.map((edge) => {
                const fromNode = state.nodes.find(n => n.id === edge.from);
                const toNode = state.nodes.find(n => n.id === edge.to);
                if (!fromNode || !toNode) return null;

                const color = getEdgeColor(edge.from, edge.to);

                return (
                  <g key={`${edge.from}-${edge.to}`}>
                    {/* Edge line */}
                    <motion.line
                      id={`graph-edge-${edge.from}-${edge.to}`}
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke={color}
                      strokeWidth={2}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    {/* Arrow for directed graphs */}
                    {state.directed && (
                      <motion.path
                        d={getArrowPath(fromNode.x, fromNode.y, toNode.x, toNode.y)}
                        stroke={color}
                        strokeWidth={2}
                        fill="none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      />
                    )}
                  </g>
                );
              })}
            </g>

            {/* Nodes */}
            <g className="nodes">
              <AnimatePresence mode="popLayout">
                {state.nodes.map((node) => {
                  const nodeState = highlightedElements.get(`graph-node-${node.id}`) ?? 'default';
                  const isBeingDragged = dragging === node.id;

                  return (
                    <motion.g
                      key={node.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={defaultTransition}
                      style={{ cursor: onNodeDrag ? 'grab' : 'pointer' }}
                    >
                      {/* Node circle */}
                      <motion.circle
                        id={`graph-node-${node.id}`}
                        cx={node.x}
                        cy={node.y}
                        r={NODE_RADIUS}
                        className={cn(
                          'transition-colors duration-200',
                          isBeingDragged && 'cursor-grabbing'
                        )}
                        fill={nodeState === 'default' ? '#404040' :
                              nodeState === 'current' ? '#fbbf24' :
                              nodeState === 'comparing' ? '#f97316' :
                              nodeState === 'visited' ? '#3b82f6' :
                              nodeState === 'found' ? '#22c55e' :
                              nodeState === 'deleting' ? '#ef4444' : '#a855f7'}
                        stroke={nodeState === 'default' ? '#525252' :
                               nodeState === 'current' ? '#fcd34d' :
                               nodeState === 'comparing' ? '#fb923c' :
                               nodeState === 'visited' ? '#60a5fa' :
                               nodeState === 'found' ? '#4ade80' :
                               nodeState === 'deleting' ? '#f87171' : '#c084fc'}
                        strokeWidth={2}
                        onClick={() => onNodeClick?.(node.id)}
                        onMouseDown={(e) => handleMouseDown(e, node.id)}
                        animate={{
                          scale: nodeState === 'current' ? 1.15 :
                                 nodeState === 'comparing' ? 1.1 : 1,
                        }}
                      />
                      {/* Node label */}
                      <text
                        x={node.x}
                        y={node.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-sm font-bold pointer-events-none select-none"
                        fill={nodeState === 'current' ? '#000' : '#fff'}
                      >
                        {node.label}
                      </text>
                    </motion.g>
                  );
                })}
              </AnimatePresence>
            </g>
          </svg>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-2 text-xs text-neutral-400">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-neutral-600" />
              <span>Unvisited</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span>Processing</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>Visited</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>Complete</span>
            </div>
          </div>
        </div>

        {/* Traversal state panel (Queue/Stack) */}
        {traversalData && (
          <div className="w-48 flex flex-col gap-4">
            {/* Queue (BFS) */}
            {traversalData.queue !== undefined && (
              <div className="bg-background-tertiary rounded-lg p-3">
                <h4 className="text-xs font-semibold text-blue-400 mb-2 flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-400 rounded" />
                  Queue (FIFO)
                </h4>
                <div className="flex flex-col gap-1">
                  {traversalData.queue.length === 0 ? (
                    <span className="text-xs text-neutral-500 italic">Empty</span>
                  ) : (
                    traversalData.queue.map((nodeId, i) => (
                      <motion.div
                        key={`queue-${nodeId}-${i}`}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        className={cn(
                          'px-2 py-1 text-xs font-mono rounded',
                          i === 0 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 'bg-background-primary text-neutral-300'
                        )}
                      >
                        {nodeId} {i === 0 && '← front'}
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Stack (DFS) */}
            {traversalData.stack !== undefined && (
              <div className="bg-background-tertiary rounded-lg p-3">
                <h4 className="text-xs font-semibold text-purple-400 mb-2 flex items-center gap-1">
                  <span className="w-2 h-2 bg-purple-400 rounded" />
                  Stack (LIFO)
                </h4>
                <div className="flex flex-col-reverse gap-1">
                  {traversalData.stack.length === 0 ? (
                    <span className="text-xs text-neutral-500 italic">Empty</span>
                  ) : (
                    traversalData.stack.map((nodeId, i) => (
                      <motion.div
                        key={`stack-${nodeId}-${i}`}
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        className={cn(
                          'px-2 py-1 text-xs font-mono rounded',
                          i === traversalData.stack!.length - 1 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 'bg-background-primary text-neutral-300'
                        )}
                      >
                        {nodeId} {i === traversalData.stack!.length - 1 && '← top'}
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Visited nodes */}
            <div className="bg-background-tertiary rounded-lg p-3">
              <h4 className="text-xs font-semibold text-green-400 mb-2 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded" />
                Visited
              </h4>
              <div className="flex flex-wrap gap-1">
                {traversalData.visited.length === 0 ? (
                  <span className="text-xs text-neutral-500 italic">None yet</span>
                ) : (
                  traversalData.visited.map((nodeId) => (
                    <span
                      key={`visited-${nodeId}`}
                      className="px-2 py-0.5 text-xs font-mono bg-blue-500/20 text-blue-400 rounded"
                    >
                      {nodeId}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Traversal path */}
            {traversalData.path.length > 0 && (
              <div className="bg-background-tertiary rounded-lg p-3">
                <h4 className="text-xs font-semibold text-neutral-300 mb-2">Traversal Order</h4>
                <div className="text-xs font-mono text-neutral-400">
                  {traversalData.path.join(' → ')}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </VisualizationCanvas>
  );
}

export default GraphVisualizer;
