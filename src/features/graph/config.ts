import type { IComplexityInfo } from '@/core/interfaces';

export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  weight?: number;
}

export interface GraphState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  directed: boolean;
  adjacencyList: Map<string, string[]>;
}

export type NodeVisualState = 'unvisited' | 'processing' | 'visited' | 'current' | 'found';

export interface TraversalState {
  queue: string[]; // For BFS
  stack: string[]; // For DFS
  visited: Set<string>;
  currentNode: string | null;
  path: string[];
}

// Helper to build adjacency list from edges
export function buildAdjacencyList(nodes: GraphNode[], edges: GraphEdge[], directed: boolean): Map<string, string[]> {
  const adjList = new Map<string, string[]>();

  // Initialize all nodes with empty arrays
  nodes.forEach(node => {
    adjList.set(node.id, []);
  });

  // Add edges
  edges.forEach(edge => {
    const fromList = adjList.get(edge.from) ?? [];
    fromList.push(edge.to);
    adjList.set(edge.from, fromList);

    // For undirected graphs, add reverse edge
    if (!directed) {
      const toList = adjList.get(edge.to) ?? [];
      toList.push(edge.from);
      adjList.set(edge.to, toList);
    }
  });

  return adjList;
}

export const graphConfig = {
  id: 'graph',
  name: 'Graph',
  description: 'A non-linear data structure with vertices (nodes) connected by edges, ideal for modeling relationships',
  slug: 'graph',
  icon: 'network',
  category: 'graph' as const,

  complexity: {
    average: {
      addNode: { time: 'O(1)', explanation: 'Add to adjacency list' },
      addEdge: { time: 'O(1)', explanation: 'Append to neighbor list' },
      removeNode: { time: 'O(n)', explanation: 'Remove from all neighbor lists' },
      removeEdge: { time: 'O(n)', explanation: 'Search and remove from neighbor list' },
      bfs: { time: 'O(n)', explanation: 'Visit each vertex and edge once: O(V+E)' },
      dfs: { time: 'O(n)', explanation: 'Visit each vertex and edge once: O(V+E)' },
    },
    worst: {
      addNode: { time: 'O(1)', explanation: 'Constant time insertion' },
      addEdge: { time: 'O(1)', explanation: 'Append operation' },
      removeNode: { time: 'O(n)', explanation: 'Update all adjacency entries' },
      removeEdge: { time: 'O(n)', explanation: 'Linear search in neighbor list' },
      bfs: { time: 'O(n²)', explanation: 'Dense graph: O(V+E) where E = V²' },
      dfs: { time: 'O(n²)', explanation: 'Dense graph: O(V+E) where E = V²' },
    },
    best: {
      addNode: { time: 'O(1)', explanation: 'Direct insertion' },
      addEdge: { time: 'O(1)', explanation: 'Direct append' },
      removeNode: { time: 'O(1)', explanation: 'Isolated node with no edges' },
      removeEdge: { time: 'O(1)', explanation: 'Edge at start of list' },
      bfs: { time: 'O(n)', explanation: 'Sparse graph with few edges' },
      dfs: { time: 'O(n)', explanation: 'Sparse graph with few edges' },
    },
    space: 'O(n)',
  } as IComplexityInfo,

  getInitialState: (): GraphState => {
    const nodes: GraphNode[] = [
      { id: 'A', label: 'A', x: 200, y: 80 },
      { id: 'B', label: 'B', x: 100, y: 180 },
      { id: 'C', label: 'C', x: 300, y: 180 },
      { id: 'D', label: 'D', x: 50, y: 300 },
      { id: 'E', label: 'E', x: 200, y: 300 },
      { id: 'F', label: 'F', x: 350, y: 300 },
    ];

    const edges: GraphEdge[] = [
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
      { from: 'B', to: 'D' },
      { from: 'B', to: 'E' },
      { from: 'C', to: 'E' },
      { from: 'C', to: 'F' },
      { from: 'E', to: 'F' },
    ];

    const directed = false;

    return {
      nodes,
      edges,
      directed,
      adjacencyList: buildAdjacencyList(nodes, edges, directed),
    };
  },

  generateRandomGraph: (nodeCount = 6): { nodes: GraphNode[]; edges: GraphEdge[] } => {
    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const clampedCount = Math.min(nodeCount, 26);
    const nodes: GraphNode[] = [];
    const centerX = 200;
    const centerY = 200;
    const radius = 150;

    // Position nodes in a circle
    for (let i = 0; i < clampedCount; i++) {
      const angle = (2 * Math.PI * i) / clampedCount - Math.PI / 2;
      const label = labels[i] ?? `N${i}`;
      nodes.push({
        id: label,
        label: label,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      });
    }

    // Generate random edges (ensuring connectivity)
    const edges: GraphEdge[] = [];
    if (nodes.length === 0) return { nodes, edges };

    const connected = new Set<string>([nodes[0]!.id]);

    // First, ensure the graph is connected
    for (let i = 1; i < nodes.length; i++) {
      const connectedNodes = Array.from(connected);
      const randomConnected = connectedNodes[Math.floor(Math.random() * connectedNodes.length)] ?? nodes[0]!.id;
      edges.push({ from: randomConnected, to: nodes[i]!.id });
      connected.add(nodes[i]!.id);
    }

    // Add some additional random edges
    const additionalEdges = Math.floor(clampedCount * 0.5);
    for (let i = 0; i < additionalEdges; i++) {
      const fromNode = nodes[Math.floor(Math.random() * nodes.length)];
      const toNode = nodes[Math.floor(Math.random() * nodes.length)];
      if (fromNode && toNode && fromNode.id !== toNode.id &&
          !edges.some(e => (e.from === fromNode.id && e.to === toNode.id) || (e.from === toNode.id && e.to === fromNode.id))) {
        edges.push({ from: fromNode.id, to: toNode.id });
      }
    }

    return { nodes, edges };
  },

  validate: (
    params: { nodeId?: string; fromNode?: string; toNode?: string; startNode?: string },
    operation: string,
    state: GraphState
  ) => {
    const nodeIds = new Set(state.nodes.map(n => n.id));

    if (operation === 'addEdge') {
      if (!params.fromNode || !params.toNode) {
        return { valid: false, error: 'Both source and target nodes are required' };
      }
      if (!nodeIds.has(params.fromNode) || !nodeIds.has(params.toNode)) {
        return { valid: false, error: 'Both nodes must exist in the graph' };
      }
      if (params.fromNode === params.toNode) {
        return { valid: false, error: 'Self-loops are not allowed' };
      }
      // Check if edge already exists
      const edgeExists = state.edges.some(e =>
        (e.from === params.fromNode && e.to === params.toNode) ||
        (!state.directed && e.from === params.toNode && e.to === params.fromNode)
      );
      if (edgeExists) {
        return { valid: false, error: 'Edge already exists' };
      }
    }

    if (operation === 'removeNode') {
      if (!params.nodeId || !nodeIds.has(params.nodeId)) {
        return { valid: false, error: 'Node does not exist' };
      }
    }

    if (operation === 'removeEdge') {
      if (!params.fromNode || !params.toNode) {
        return { valid: false, error: 'Both source and target nodes are required' };
      }
      const edgeExists = state.edges.some(e =>
        (e.from === params.fromNode && e.to === params.toNode) ||
        (!state.directed && e.from === params.toNode && e.to === params.fromNode)
      );
      if (!edgeExists) {
        return { valid: false, error: 'Edge does not exist' };
      }
    }

    if (operation === 'bfs' || operation === 'dfs') {
      if (!params.startNode || !nodeIds.has(params.startNode)) {
        return { valid: false, error: 'Start node must exist in the graph' };
      }
    }

    return { valid: true };
  },
};
