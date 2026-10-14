import { Panel } from '@/shared/components/ui';
import { CheckCircle, XCircle, Lightbulb, Code } from 'lucide-react';

export function HeapOverview() {
  return (
    <div className="space-y-6">
      {/* What is a Heap */}
      <Panel title="What is a Heap?">
        <div className="space-y-4 text-neutral-300">
          <p>
            A <strong className="text-white">heap</strong> is a specialized tree-based data structure
            that satisfies the <strong className="text-blue-400">heap property</strong>. It is a{' '}
            <strong className="text-purple-400">complete binary tree</strong>, meaning all levels are
            fully filled except possibly the last, which is filled from left to right.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-background-primary rounded-lg p-4">
              <h4 className="font-medium text-orange-400 mb-2">Max-Heap</h4>
              <p className="text-sm text-neutral-400">
                Parent nodes are always <strong>greater than or equal to</strong> their children.
                The root contains the maximum element.
              </p>
              <div className="mt-3 font-mono text-sm text-center">
                <span className="text-orange-400">parent</span> {'>='} <span className="text-neutral-500">children</span>
              </div>
            </div>
            <div className="bg-background-primary rounded-lg p-4">
              <h4 className="font-medium text-cyan-400 mb-2">Min-Heap</h4>
              <p className="text-sm text-neutral-400">
                Parent nodes are always <strong>less than or equal to</strong> their children.
                The root contains the minimum element.
              </p>
              <div className="mt-3 font-mono text-sm text-center">
                <span className="text-cyan-400">parent</span> {'<='} <span className="text-neutral-500">children</span>
              </div>
            </div>
          </div>
        </div>
      </Panel>

      {/* Complete Binary Tree Property */}
      <Panel title="Complete Binary Tree Property">
        <div className="space-y-4 text-neutral-300">
          <p>
            A heap is always a <strong className="text-purple-400">complete binary tree</strong>,
            which allows it to be efficiently stored in an array without wasting space.
          </p>
          <div className="bg-background-primary rounded-lg p-4">
            <h4 className="font-medium text-white mb-3">Array Index Formulas</h4>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex items-center gap-4">
                <span className="text-neutral-500 w-32">Parent index:</span>
                <code className="text-blue-400">Math.floor((i - 1) / 2)</code>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-neutral-500 w-32">Left child:</span>
                <code className="text-green-400">2 * i + 1</code>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-neutral-500 w-32">Right child:</span>
                <code className="text-purple-400">2 * i + 2</code>
              </div>
            </div>
          </div>
          <p className="text-sm text-neutral-400">
            This array representation eliminates the need for pointers, making heaps very memory-efficient
            and cache-friendly compared to pointer-based tree implementations.
          </p>
        </div>
      </Panel>

      {/* Use Cases */}
      <Panel title="Real-World Applications">
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: '🎯', title: 'Priority Queues', desc: 'Task scheduling, event handling, Dijkstra algorithm' },
            { icon: '📊', title: 'Heap Sort', desc: 'O(n log n) in-place sorting algorithm' },
            { icon: '⚡', title: 'Top K Elements', desc: 'Finding k largest/smallest elements efficiently' },
            { icon: '🔄', title: 'OS Scheduling', desc: 'Process scheduling, memory allocation' },
            { icon: '📈', title: 'Median Finding', desc: 'Running median with two heaps' },
            { icon: '🌐', title: 'Graph Algorithms', desc: 'Prim MST, Dijkstra shortest path' },
          ].map((item) => (
            <div key={item.title} className="bg-background-primary rounded-lg p-4">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h4 className="font-medium text-white mb-1">{item.title}</h4>
              <p className="text-sm text-neutral-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </Panel>

      {/* Advantages & Disadvantages */}
      <div className="grid grid-cols-2 gap-4">
        <Panel title="Advantages">
          <ul className="space-y-3">
            {[
              'O(1) access to min/max element',
              'O(log n) insert and extract',
              'O(n) build heap from array',
              'Space efficient (array storage)',
              'No pointer overhead',
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
              'O(n) search for arbitrary element',
              'Not sorted (only partial ordering)',
              'No efficient merge operation',
              'Fixed priority (no decrease-key)',
              'Only root element accessible in O(1)',
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
            <h4 className="font-medium text-white mb-2">Key Insight: Heapify is O(n), not O(n log n)</h4>
            <p className="text-sm text-neutral-400">
              Building a heap from an array using the bottom-up heapify approach is <strong className="text-yellow-400">O(n)</strong>,
              not O(n log n). This is because most nodes are near the bottom of the tree and require
              few comparisons. The sum of work decreases geometrically as you go up the tree.
              This makes heaps excellent for algorithms that need to build a heap once and
              extract elements repeatedly.
            </p>
          </div>
        </div>
      </Panel>

      {/* Comparison with other structures */}
      <Panel title="When to Use a Heap vs. Alternatives">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white">Heap vs. Sorted Array</h4>
              <p className="text-sm text-neutral-400">
                Use heap when you need fast insert AND extract. Sorted arrays have O(n) insert but O(1) min/max access.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 text-purple-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white">Heap vs. BST</h4>
              <p className="text-sm text-neutral-400">
                Use heap for priority queue operations. BST is better when you need to search for arbitrary elements or need sorted traversal.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 text-green-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white">Binary Heap vs. Fibonacci Heap</h4>
              <p className="text-sm text-neutral-400">
                Binary heaps are simpler and faster in practice. Fibonacci heaps have better amortized bounds but higher constants.
              </p>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export default HeapOverview;
