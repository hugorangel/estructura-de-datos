import { Panel } from '@/shared/components/ui';
import { CheckCircle, XCircle, Lightbulb, Network, Map, Users, Globe } from 'lucide-react';

export function GraphOverview() {
  return (
    <div className="space-y-6">
      {/* What is a Graph */}
      <Panel title="What is a Graph?">
        <div className="space-y-4 text-neutral-300">
          <p>
            A <strong className="text-white">graph</strong> is a non-linear data structure consisting of{' '}
            <strong className="text-blue-400">vertices (nodes)</strong> connected by{' '}
            <strong className="text-green-400">edges</strong>. Graphs are used to represent relationships
            between objects and are fundamental to many algorithms and real-world applications.
          </p>
          <div className="bg-background-primary rounded-lg p-4">
            <div className="flex items-center justify-around">
              <div className="text-center">
                <div className="flex items-center gap-8">
                  {/* Simple graph visualization */}
                  <svg width="180" height="120" className="mx-auto">
                    {/* Edges */}
                    <line x1="40" y1="30" x2="90" y2="90" stroke="#6b7280" strokeWidth="2" />
                    <line x1="140" y1="30" x2="90" y2="90" stroke="#6b7280" strokeWidth="2" />
                    <line x1="40" y1="30" x2="140" y2="30" stroke="#6b7280" strokeWidth="2" />
                    {/* Nodes */}
                    <circle cx="40" cy="30" r="16" fill="#3b82f6" />
                    <text x="40" y="35" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">A</text>
                    <circle cx="140" cy="30" r="16" fill="#3b82f6" />
                    <text x="140" y="35" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">B</text>
                    <circle cx="90" cy="90" r="16" fill="#3b82f6" />
                    <text x="90" y="95" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">C</text>
                  </svg>
                </div>
                <div className="text-xs text-neutral-500 mt-2">
                  V = &#123;A, B, C&#125;, E = &#123;(A,B), (A,C), (B,C)&#125;
                </div>
              </div>
            </div>
          </div>
        </div>
      </Panel>

      {/* Graph Terminology */}
      <Panel title="Graph Terminology">
        <div className="grid grid-cols-2 gap-4">
          {[
            { term: 'Vertex (Node)', desc: 'A fundamental unit of a graph representing an entity' },
            { term: 'Edge', desc: 'A connection between two vertices representing a relationship' },
            { term: 'Directed', desc: 'Edges have direction (A→B is different from B→A)' },
            { term: 'Undirected', desc: 'Edges have no direction (A-B means both can reach each other)' },
            { term: 'Weighted', desc: 'Edges have associated costs/distances' },
            { term: 'Adjacent', desc: 'Two vertices connected by an edge' },
            { term: 'Degree', desc: 'Number of edges connected to a vertex' },
            { term: 'Path', desc: 'Sequence of vertices connected by edges' },
          ].map((item) => (
            <div key={item.term} className="bg-background-primary rounded-lg p-3">
              <h4 className="font-medium text-white text-sm">{item.term}</h4>
              <p className="text-xs text-neutral-400 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </Panel>

      {/* Representations */}
      <Panel title="Graph Representations">
        <div className="grid grid-cols-2 gap-4">
          {/* Adjacency List */}
          <div className="bg-background-primary rounded-lg p-4">
            <h4 className="font-medium text-blue-400 mb-3">Adjacency List</h4>
            <div className="font-mono text-sm space-y-1">
              <div className="text-neutral-300">A: [B, C]</div>
              <div className="text-neutral-300">B: [A, C]</div>
              <div className="text-neutral-300">C: [A, B]</div>
            </div>
            <div className="mt-3 text-xs text-neutral-500">
              <span className="text-green-400">Space: O(V + E)</span>
              <br />
              Best for sparse graphs
            </div>
          </div>

          {/* Adjacency Matrix */}
          <div className="bg-background-primary rounded-lg p-4">
            <h4 className="font-medium text-purple-400 mb-3">Adjacency Matrix</h4>
            <div className="font-mono text-sm">
              <div className="text-neutral-500 mb-1">{'    A B C'}</div>
              <div className="text-neutral-300">A: [0 1 1]</div>
              <div className="text-neutral-300">B: [1 0 1]</div>
              <div className="text-neutral-300">C: [1 1 0]</div>
            </div>
            <div className="mt-3 text-xs text-neutral-500">
              <span className="text-yellow-400">Space: O(V²)</span>
              <br />
              Best for dense graphs
            </div>
          </div>
        </div>
      </Panel>

      {/* BFS vs DFS */}
      <Panel title="BFS vs DFS Comparison">
        <div className="grid grid-cols-2 gap-4">
          {/* BFS */}
          <div className="bg-background-primary rounded-lg p-4">
            <h4 className="font-medium text-blue-400 mb-2">Breadth-First Search (BFS)</h4>
            <ul className="text-sm text-neutral-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>Uses a <strong>Queue</strong> (FIFO)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>Explores level by level</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>Finds shortest path (unweighted)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>Uses more memory for wide graphs</span>
              </li>
            </ul>
            <div className="mt-3 text-xs bg-blue-500/10 text-blue-400 p-2 rounded">
              Best for: Shortest path, level-order traversal
            </div>
          </div>

          {/* DFS */}
          <div className="bg-background-primary rounded-lg p-4">
            <h4 className="font-medium text-purple-400 mb-2">Depth-First Search (DFS)</h4>
            <ul className="text-sm text-neutral-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Uses a <strong>Stack</strong> (LIFO)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Explores as deep as possible first</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Backtracks when stuck</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Memory efficient for deep graphs</span>
              </li>
            </ul>
            <div className="mt-3 text-xs bg-purple-500/10 text-purple-400 p-2 rounded">
              Best for: Cycle detection, topological sort, maze solving
            </div>
          </div>
        </div>
      </Panel>

      {/* Advantages & Disadvantages */}
      <div className="grid grid-cols-2 gap-4">
        <Panel title="Advantages">
          <ul className="space-y-3">
            {[
              'Model complex relationships',
              'Flexible structure (can add/remove)',
              'Efficient path finding algorithms',
              'Widely applicable to real problems',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-neutral-300">{item}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Disadvantages">
          <ul className="space-y-3">
            {[
              'Can consume significant memory',
              'Some operations are expensive',
              'Complex to implement correctly',
              'No single best representation',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-neutral-300">{item}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Key Insight */}
      <Panel>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-yellow-500/10 rounded-lg">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">Key Insight</h4>
            <p className="text-sm text-neutral-400">
              The choice between BFS and DFS depends on your problem. BFS guarantees the{' '}
              <strong className="text-blue-400">shortest path</strong> in unweighted graphs because
              it explores all nodes at distance k before any node at distance k+1. DFS is more{' '}
              <strong className="text-purple-400">memory efficient</strong> and better for exploring
              all possibilities (like in backtracking algorithms).
            </p>
          </div>
        </div>
      </Panel>

      {/* Real-world Examples */}
      <Panel title="Real-World Applications">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-white">Social Networks</h4>
              <p className="text-sm text-neutral-400">Friends, followers, connections between users</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Map className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-white">Maps & Navigation</h4>
              <p className="text-sm text-neutral-400">Roads, intersections, GPS routing</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-white">Web Crawling</h4>
              <p className="text-sm text-neutral-400">Pages as nodes, hyperlinks as edges</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Network className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-white">Computer Networks</h4>
              <p className="text-sm text-neutral-400">Routers, switches, network topology</p>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export default GraphOverview;
