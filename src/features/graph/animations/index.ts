import type { IAnimationStep, ElementVisualState } from '@/core/interfaces';
import type { GraphState, GraphNode, GraphEdge } from '../config';
import { buildAdjacencyList } from '../config';
import { baseDurations } from '@/constants/animations';

export interface GraphAnimationResult {
  newState: GraphState;
  steps: IAnimationStep[];
  traversalData?: {
    queue?: string[];
    stack?: string[];
    visited: string[];
    path: string[];
  };
}

export function createAddNodeAnimation(
  state: GraphState,
  nodeId: string,
  x: number,
  y: number
): GraphAnimationResult {
  const steps: IAnimationStep[] = [];

  // Step 1: Announce new node
  steps.push({
    id: `addnode-announce-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Adding new node "${nodeId}" to the graph`,
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 2: Node appears
  steps.push({
    id: `addnode-create-${Date.now()}`,
    index: 1,
    type: 'insert',
    description: `Node "${nodeId}" created at position (${Math.round(x)}, ${Math.round(y)})`,
    codeLine: 2,
    elements: [
      {
        elementId: `graph-node-${nodeId}`,
        state: 'found' as ElementVisualState,
        motionProps: {
          initial: { scale: 0, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { type: 'spring', stiffness: 300, damping: 25 },
        },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 3: Add to adjacency list
  steps.push({
    id: `addnode-adjlist-${Date.now()}`,
    index: 2,
    type: 'complete',
    description: `Added "${nodeId}" to adjacency list with empty neighbors`,
    codeLine: 3,
    elements: [
      {
        elementId: `graph-node-${nodeId}`,
        state: 'default' as ElementVisualState,
        motionProps: {},
      },
    ],
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  const newNode: GraphNode = { id: nodeId, label: nodeId, x, y };
  const newNodes = [...state.nodes, newNode];

  return {
    newState: {
      ...state,
      nodes: newNodes,
      adjacencyList: buildAdjacencyList(newNodes, state.edges, state.directed),
    },
    steps,
  };
}

export function createAddEdgeAnimation(
  state: GraphState,
  fromNode: string,
  toNode: string
): GraphAnimationResult {
  const steps: IAnimationStep[] = [];

  // Step 1: Highlight source node
  steps.push({
    id: `addedge-from-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Creating edge from "${fromNode}" to "${toNode}"`,
    codeLine: 1,
    elements: [
      {
        elementId: `graph-node-${fromNode}`,
        state: 'current' as ElementVisualState,
        motionProps: { animate: { scale: 1.1 } },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 2: Highlight target node
  steps.push({
    id: `addedge-to-${Date.now()}`,
    index: 1,
    type: 'highlight',
    description: `Target node "${toNode}" selected`,
    codeLine: 2,
    elements: [
      {
        elementId: `graph-node-${fromNode}`,
        state: 'current' as ElementVisualState,
        motionProps: {},
      },
      {
        elementId: `graph-node-${toNode}`,
        state: 'comparing' as ElementVisualState,
        motionProps: { animate: { scale: 1.1 } },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 3: Draw edge
  steps.push({
    id: `addedge-draw-${Date.now()}`,
    index: 2,
    type: 'insert',
    description: `Edge ${fromNode} → ${toNode} created${state.directed ? '' : ' (bidirectional)'}`,
    codeLine: 3,
    elements: [
      {
        elementId: `graph-edge-${fromNode}-${toNode}`,
        state: 'found' as ElementVisualState,
        motionProps: {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { duration: 0.5 },
        },
      },
    ],
    baseDuration: baseDurations.slow,
    isPausePoint: true,
  });

  // Step 4: Complete
  steps.push({
    id: `addedge-complete-${Date.now()}`,
    index: 3,
    type: 'complete',
    description: `Edge added to adjacency list`,
    codeLine: 4,
    elements: [
      {
        elementId: `graph-node-${fromNode}`,
        state: 'default' as ElementVisualState,
        motionProps: { animate: { scale: 1 } },
      },
      {
        elementId: `graph-node-${toNode}`,
        state: 'default' as ElementVisualState,
        motionProps: { animate: { scale: 1 } },
      },
    ],
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  const newEdge: GraphEdge = { from: fromNode, to: toNode };
  const newEdges = [...state.edges, newEdge];

  return {
    newState: {
      ...state,
      edges: newEdges,
      adjacencyList: buildAdjacencyList(state.nodes, newEdges, state.directed),
    },
    steps,
  };
}

export function createRemoveNodeAnimation(
  state: GraphState,
  nodeId: string
): GraphAnimationResult {
  const steps: IAnimationStep[] = [];

  // Step 1: Highlight node to remove
  steps.push({
    id: `removenode-highlight-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Removing node "${nodeId}" and all connected edges`,
    codeLine: 1,
    elements: [
      {
        elementId: `graph-node-${nodeId}`,
        state: 'deleting' as ElementVisualState,
        motionProps: { animate: { scale: 0.9, opacity: 0.5 } },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 2: Remove connected edges
  const connectedEdges = state.edges.filter(e => e.from === nodeId || e.to === nodeId);
  if (connectedEdges.length > 0) {
    steps.push({
      id: `removenode-edges-${Date.now()}`,
      index: 1,
      type: 'delete',
      description: `Removing ${connectedEdges.length} connected edge(s)`,
      codeLine: 2,
      elements: connectedEdges.map(e => ({
        elementId: `graph-edge-${e.from}-${e.to}`,
        state: 'deleting' as ElementVisualState,
        motionProps: { animate: { opacity: 0 } },
      })),
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });
  }

  // Step 3: Remove node
  steps.push({
    id: `removenode-delete-${Date.now()}`,
    index: steps.length,
    type: 'delete',
    description: `Node "${nodeId}" removed from graph`,
    codeLine: 3,
    elements: [
      {
        elementId: `graph-node-${nodeId}`,
        state: 'deleting' as ElementVisualState,
        motionProps: {
          animate: { scale: 0, opacity: 0 },
          transition: { duration: 0.3 },
        },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: false,
  });

  // Step 4: Complete
  steps.push({
    id: `removenode-complete-${Date.now()}`,
    index: steps.length,
    type: 'complete',
    description: `Adjacency list updated`,
    codeLine: 4,
    elements: [],
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  const newNodes = state.nodes.filter(n => n.id !== nodeId);
  const newEdges = state.edges.filter(e => e.from !== nodeId && e.to !== nodeId);

  return {
    newState: {
      ...state,
      nodes: newNodes,
      edges: newEdges,
      adjacencyList: buildAdjacencyList(newNodes, newEdges, state.directed),
    },
    steps,
  };
}

export function createRemoveEdgeAnimation(
  state: GraphState,
  fromNode: string,
  toNode: string
): GraphAnimationResult {
  const steps: IAnimationStep[] = [];

  // Step 1: Highlight edge
  steps.push({
    id: `removeedge-highlight-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Removing edge from "${fromNode}" to "${toNode}"`,
    codeLine: 1,
    elements: [
      {
        elementId: `graph-edge-${fromNode}-${toNode}`,
        state: 'deleting' as ElementVisualState,
        motionProps: { animate: { opacity: 0.5 } },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 2: Remove edge
  steps.push({
    id: `removeedge-delete-${Date.now()}`,
    index: 1,
    type: 'delete',
    description: `Edge removed from adjacency list`,
    codeLine: 2,
    elements: [
      {
        elementId: `graph-edge-${fromNode}-${toNode}`,
        state: 'deleting' as ElementVisualState,
        motionProps: {
          animate: { opacity: 0, pathLength: 0 },
          transition: { duration: 0.3 },
        },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: false,
  });

  // Step 3: Complete
  steps.push({
    id: `removeedge-complete-${Date.now()}`,
    index: 2,
    type: 'complete',
    description: `Edge successfully removed`,
    codeLine: 3,
    elements: [],
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  const newEdges = state.edges.filter(e =>
    !((e.from === fromNode && e.to === toNode) ||
      (!state.directed && e.from === toNode && e.to === fromNode))
  );

  return {
    newState: {
      ...state,
      edges: newEdges,
      adjacencyList: buildAdjacencyList(state.nodes, newEdges, state.directed),
    },
    steps,
  };
}

export function createBFSAnimation(
  state: GraphState,
  startNode: string
): GraphAnimationResult {
  const steps: IAnimationStep[] = [];
  const visited = new Set<string>();
  const queue: string[] = [startNode];
  const path: string[] = [];

  // Step 1: Initialize BFS
  steps.push({
    id: `bfs-init-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Starting BFS from node "${startNode}". Queue: [${startNode}]`,
    codeLine: 1,
    elements: [
      {
        elementId: `graph-node-${startNode}`,
        state: 'current' as ElementVisualState,
        motionProps: { animate: { scale: 1.2 } },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (visited.has(current)) continue;
    visited.add(current);
    path.push(current);

    // Step: Process current node (dequeue)
    steps.push({
      id: `bfs-dequeue-${current}-${Date.now()}-${steps.length}`,
      index: steps.length,
      type: 'traverse',
      description: `Dequeue "${current}". Processing node. Queue: [${queue.join(', ')}]`,
      codeLine: 3,
      elements: [
        {
          elementId: `graph-node-${current}`,
          state: 'current' as ElementVisualState,
          motionProps: { animate: { scale: 1.2 } },
        },
        ...Array.from(visited).filter(v => v !== current).map(v => ({
          elementId: `graph-node-${v}`,
          state: 'visited' as ElementVisualState,
          motionProps: {},
        })),
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });

    // Get neighbors
    const neighbors = state.adjacencyList.get(current) ?? [];

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor) && !queue.includes(neighbor)) {
        queue.push(neighbor);

        // Step: Enqueue neighbor
        steps.push({
          id: `bfs-enqueue-${neighbor}-${Date.now()}-${steps.length}`,
          index: steps.length,
          type: 'compare',
          description: `Discovered "${neighbor}" via "${current}". Enqueue. Queue: [${queue.join(', ')}]`,
          codeLine: 5,
          elements: [
            {
              elementId: `graph-node-${current}`,
              state: 'current' as ElementVisualState,
              motionProps: {},
            },
            {
              elementId: `graph-node-${neighbor}`,
              state: 'comparing' as ElementVisualState,
              motionProps: { animate: { scale: 1.1 } },
            },
            {
              elementId: `graph-edge-${current}-${neighbor}`,
              state: 'comparing' as ElementVisualState,
              motionProps: {},
            },
            ...Array.from(visited).filter(v => v !== current).map(v => ({
              elementId: `graph-node-${v}`,
              state: 'visited' as ElementVisualState,
              motionProps: {},
            })),
          ],
          baseDuration: baseDurations.normal,
          isPausePoint: true,
        });
      }
    }

    // Mark current as visited
    steps.push({
      id: `bfs-visited-${current}-${Date.now()}-${steps.length}`,
      index: steps.length,
      type: 'traverse',
      description: `Node "${current}" fully processed. Marked as visited.`,
      codeLine: 7,
      elements: [
        {
          elementId: `graph-node-${current}`,
          state: 'visited' as ElementVisualState,
          motionProps: { animate: { scale: 1 } },
        },
        ...Array.from(visited).filter(v => v !== current).map(v => ({
          elementId: `graph-node-${v}`,
          state: 'visited' as ElementVisualState,
          motionProps: {},
        })),
      ],
      baseDuration: baseDurations.fast,
      isPausePoint: false,
    });
  }

  // Final step
  steps.push({
    id: `bfs-complete-${Date.now()}`,
    index: steps.length,
    type: 'complete',
    description: `BFS complete! Traversal order: ${path.join(' → ')}`,
    codeLine: 9,
    elements: path.map(nodeId => ({
      elementId: `graph-node-${nodeId}`,
      state: 'found' as ElementVisualState,
      motionProps: {},
    })),
    baseDuration: baseDurations.slow,
    isPausePoint: true,
  });

  return {
    newState: state,
    steps,
    traversalData: {
      queue: [],
      visited: Array.from(visited),
      path,
    },
  };
}

export function createDFSAnimation(
  state: GraphState,
  startNode: string
): GraphAnimationResult {
  const steps: IAnimationStep[] = [];
  const visited = new Set<string>();
  const stack: string[] = [startNode];
  const path: string[] = [];

  // Step 1: Initialize DFS
  steps.push({
    id: `dfs-init-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Starting DFS from node "${startNode}". Stack: [${startNode}]`,
    codeLine: 1,
    elements: [
      {
        elementId: `graph-node-${startNode}`,
        state: 'current' as ElementVisualState,
        motionProps: { animate: { scale: 1.2 } },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  while (stack.length > 0) {
    const current = stack.pop()!;

    if (visited.has(current)) continue;
    visited.add(current);
    path.push(current);

    // Step: Process current node (pop from stack)
    steps.push({
      id: `dfs-pop-${current}-${Date.now()}-${steps.length}`,
      index: steps.length,
      type: 'traverse',
      description: `Pop "${current}" from stack. Exploring depth-first. Stack: [${stack.join(', ')}]`,
      codeLine: 3,
      elements: [
        {
          elementId: `graph-node-${current}`,
          state: 'current' as ElementVisualState,
          motionProps: { animate: { scale: 1.2 } },
        },
        ...Array.from(visited).filter(v => v !== current).map(v => ({
          elementId: `graph-node-${v}`,
          state: 'visited' as ElementVisualState,
          motionProps: {},
        })),
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });

    // Get neighbors (reverse to maintain left-to-right exploration)
    const neighbors = [...(state.adjacencyList.get(current) ?? [])].reverse();

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor) && !stack.includes(neighbor)) {
        stack.push(neighbor);

        // Step: Push neighbor to stack
        steps.push({
          id: `dfs-push-${neighbor}-${Date.now()}-${steps.length}`,
          index: steps.length,
          type: 'compare',
          description: `Discovered "${neighbor}" via "${current}". Push to stack. Stack: [${stack.join(', ')}]`,
          codeLine: 5,
          elements: [
            {
              elementId: `graph-node-${current}`,
              state: 'current' as ElementVisualState,
              motionProps: {},
            },
            {
              elementId: `graph-node-${neighbor}`,
              state: 'comparing' as ElementVisualState,
              motionProps: { animate: { scale: 1.1 } },
            },
            {
              elementId: `graph-edge-${current}-${neighbor}`,
              state: 'comparing' as ElementVisualState,
              motionProps: {},
            },
            ...Array.from(visited).filter(v => v !== current).map(v => ({
              elementId: `graph-node-${v}`,
              state: 'visited' as ElementVisualState,
              motionProps: {},
            })),
          ],
          baseDuration: baseDurations.normal,
          isPausePoint: true,
        });
      }
    }

    // Check for backtracking
    const hasUnvisitedNeighbors = neighbors.some(n => !visited.has(n));
    if (!hasUnvisitedNeighbors && stack.length > 0) {
      steps.push({
        id: `dfs-backtrack-${current}-${Date.now()}-${steps.length}`,
        index: steps.length,
        type: 'traverse',
        description: `No unvisited neighbors from "${current}". Backtracking...`,
        codeLine: 6,
        elements: [
          {
            elementId: `graph-node-${current}`,
            state: 'visited' as ElementVisualState,
            motionProps: { animate: { scale: 1 } },
          },
          ...Array.from(visited).filter(v => v !== current).map(v => ({
            elementId: `graph-node-${v}`,
            state: 'visited' as ElementVisualState,
            motionProps: {},
          })),
        ],
        baseDuration: baseDurations.fast,
        isPausePoint: true,
      });
    }

    // Mark current as visited
    steps.push({
      id: `dfs-visited-${current}-${Date.now()}-${steps.length}`,
      index: steps.length,
      type: 'traverse',
      description: `Node "${current}" fully explored. Marked as visited.`,
      codeLine: 7,
      elements: [
        {
          elementId: `graph-node-${current}`,
          state: 'visited' as ElementVisualState,
          motionProps: { animate: { scale: 1 } },
        },
        ...Array.from(visited).filter(v => v !== current).map(v => ({
          elementId: `graph-node-${v}`,
          state: 'visited' as ElementVisualState,
          motionProps: {},
        })),
      ],
      baseDuration: baseDurations.fast,
      isPausePoint: false,
    });
  }

  // Final step
  steps.push({
    id: `dfs-complete-${Date.now()}`,
    index: steps.length,
    type: 'complete',
    description: `DFS complete! Traversal order: ${path.join(' → ')}`,
    codeLine: 9,
    elements: path.map(nodeId => ({
      elementId: `graph-node-${nodeId}`,
      state: 'found' as ElementVisualState,
      motionProps: {},
    })),
    baseDuration: baseDurations.slow,
    isPausePoint: true,
  });

  return {
    newState: state,
    steps,
    traversalData: {
      stack: [],
      visited: Array.from(visited),
      path,
    },
  };
}
