import { Panel } from '@/shared/components/ui';
import { ComplexityTable } from '@/shared/components/complexity';
import { graphConfig } from './config';
import { Info } from 'lucide-react';

export function GraphComplexity() {
  return (
    <div className="space-y-6">
      <Panel title="Time & Space Complexity">
        <ComplexityTable complexity={graphConfig.complexity} />
      </Panel>

      {/* Note about complexity notation */}
      <Panel title="Understanding Graph Complexity">
        <div className="space-y-4 text-sm text-neutral-400">
          <p>
            Graph complexity is typically expressed in terms of{' '}
            <strong className="text-blue-400">V</strong> (number of vertices) and{' '}
            <strong className="text-green-400">E</strong> (number of edges).
          </p>
          <div className="bg-background-primary rounded-lg p-4 font-mono">
            <div className="space-y-2">
              <div><span className="text-blue-400">V</span> = number of vertices (nodes)</div>
              <div><span className="text-green-400">E</span> = number of edges</div>
              <div className="text-neutral-500 mt-2">In a dense graph: E ≈ V²</div>
              <div className="text-neutral-500">In a sparse graph: E ≈ V</div>
            </div>
          </div>
        </div>
      </Panel>

      {/* Detailed explanations */}
      <Panel title="Operation Details">
        <div className="space-y-6">
          {/* Add Node */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Add Node - O(1)
            </h4>
            <p className="text-sm text-neutral-400">
              Adding a new node simply creates a new entry in the adjacency list with an empty
              neighbor array. This is a constant time operation regardless of graph size.
            </p>
          </div>

          {/* Add Edge */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Add Edge - O(1)
            </h4>
            <p className="text-sm text-neutral-400">
              Adding an edge appends the target node to the source node's neighbor list.
              For undirected graphs, we append to both lists. Array append is amortized O(1).
            </p>
          </div>

          {/* Remove Node */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              Remove Node - O(V + E)
            </h4>
            <p className="text-sm text-neutral-400">
              Removing a node requires deleting its entry and also removing it from all other
              nodes' neighbor lists. In the worst case, we must scan all edges in the graph.
            </p>
          </div>

          {/* Remove Edge */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              Remove Edge - O(V)
            </h4>
            <p className="text-sm text-neutral-400">
              Removing an edge requires finding and removing the target from the source's
              neighbor list. In the worst case (complete graph), a node has V-1 neighbors.
            </p>
          </div>

          {/* BFS */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              Breadth-First Search - O(V + E)
            </h4>
            <p className="text-sm text-neutral-400 mb-2">
              BFS visits every vertex exactly once and explores every edge exactly once.
              The queue operations (enqueue/dequeue) are O(1), so the total time is
              proportional to the size of the graph.
            </p>
            <code className="block bg-background-primary px-3 py-2 rounded text-sm font-mono text-blue-400">
              Time = O(V) for vertices + O(E) for edges = O(V + E)
            </code>
          </div>

          {/* DFS */}
          <div>
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full" />
              Depth-First Search - O(V + E)
            </h4>
            <p className="text-sm text-neutral-400 mb-2">
              DFS also visits every vertex and edge exactly once. The stack operations
              (push/pop) are O(1). Despite exploring in a different order, the time
              complexity is the same as BFS.
            </p>
            <code className="block bg-background-primary px-3 py-2 rounded text-sm font-mono text-purple-400">
              Time = O(V) for vertices + O(E) for edges = O(V + E)
            </code>
          </div>
        </div>
      </Panel>

      {/* Space Complexity */}
      <Panel title="Space Complexity">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background-primary rounded-lg p-4">
              <h4 className="font-medium text-blue-400 mb-2">Adjacency List</h4>
              <div className="text-2xl font-mono text-white mb-2">O(V + E)</div>
              <p className="text-xs text-neutral-500">
                Stores each vertex and each edge once. Efficient for sparse graphs.
              </p>
            </div>
            <div className="bg-background-primary rounded-lg p-4">
              <h4 className="font-medium text-purple-400 mb-2">Adjacency Matrix</h4>
              <div className="text-2xl font-mono text-white mb-2">O(V²)</div>
              <p className="text-xs text-neutral-500">
                Stores V×V matrix regardless of edges. Better for dense graphs.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background-primary rounded-lg p-4">
              <h4 className="font-medium text-green-400 mb-2">BFS Space</h4>
              <div className="text-2xl font-mono text-white mb-2">O(V)</div>
              <p className="text-xs text-neutral-500">
                Queue can hold up to V vertices. Visited set also O(V).
              </p>
            </div>
            <div className="bg-background-primary rounded-lg p-4">
              <h4 className="font-medium text-orange-400 mb-2">DFS Space</h4>
              <div className="text-2xl font-mono text-white mb-2">O(V)</div>
              <p className="text-xs text-neutral-500">
                Stack can grow to V in worst case (linear graph). Visited set O(V).
              </p>
            </div>
          </div>
        </div>
      </Panel>

      {/* When to use */}
      <Panel>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <Info className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">When to Use Graphs</h4>
            <ul className="text-sm text-neutral-400 space-y-1">
              <li>• Modeling relationships between entities</li>
              <li>• Finding shortest paths (BFS for unweighted, Dijkstra for weighted)</li>
              <li>• Detecting cycles in dependencies</li>
              <li>• Social network analysis</li>
              <li>• Route planning and navigation</li>
              <li>• Web crawling and link analysis</li>
            </ul>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export default GraphComplexity;
