import { Panel } from '@/shared/components/ui';
import { ComplexityTable } from '@/shared/components/complexity';
import { heapConfig } from './config';
import { Info } from 'lucide-react';

export function HeapComplexity() {
  return (
    <div className="space-y-6">
      <Panel title="Time & Space Complexity">
        <ComplexityTable complexity={heapConfig.complexity} />
      </Panel>

      {/* Detailed explanations */}
      <Panel title="Operation Details">
        <div className="space-y-6">
          {/* Peek */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Peek (getMax/getMin) - O(1)
            </h4>
            <p className="text-sm text-neutral-400 mb-2">
              The root element is always at index 0, providing constant-time access to the
              maximum (max-heap) or minimum (min-heap) element.
            </p>
            <code className="block bg-background-primary px-3 py-2 rounded text-sm font-mono text-blue-400">
              return heap[0]; // Always O(1)
            </code>
          </div>

          {/* Insert */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              Insert - O(log n)
            </h4>
            <p className="text-sm text-neutral-400 mb-2">
              Add element at the end of the array, then bubble up by comparing with parent
              and swapping if heap property is violated. Maximum swaps = tree height = log n.
            </p>
            <div className="bg-background-primary px-3 py-2 rounded text-sm">
              <div className="text-neutral-500 mb-1">// Bubble up path:</div>
              <div className="font-mono text-green-400">leaf → parent → ... → root</div>
            </div>
          </div>

          {/* Extract */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              Extract (extractMax/extractMin) - O(log n)
            </h4>
            <p className="text-sm text-neutral-400 mb-2">
              Remove root, move last element to root, then bubble down by comparing with
              children and swapping with the larger (max-heap) or smaller (min-heap) child.
            </p>
            <div className="bg-background-primary px-3 py-2 rounded text-sm">
              <div className="text-neutral-500 mb-1">// Bubble down path:</div>
              <div className="font-mono text-orange-400">root → child → ... → leaf</div>
            </div>
          </div>

          {/* Heapify */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Build Heap (Heapify) - O(n)
            </h4>
            <p className="text-sm text-neutral-400 mb-2">
              Counter-intuitively, building a heap from n elements is O(n), not O(n log n).
              Using bottom-up heapify, most nodes require few operations because they are near leaves.
            </p>
            <div className="bg-background-primary px-3 py-2 rounded text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-neutral-500">n/2 nodes (leaves):</span>
                <span className="text-green-400">0 swaps each</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">n/4 nodes:</span>
                <span className="text-yellow-400">1 swap max</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">n/8 nodes:</span>
                <span className="text-yellow-400">2 swaps max</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Total work:</span>
                <span className="text-blue-400">O(n)</span>
              </div>
            </div>
          </div>

          {/* Search */}
          <div>
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              Search - O(n)
            </h4>
            <p className="text-sm text-neutral-400">
              Heaps do not support efficient search. The heap property only guarantees the
              relationship between parent and children, not siblings. To find an arbitrary
              element, you may need to check all n elements.
            </p>
          </div>
        </div>
      </Panel>

      {/* Comparison table */}
      <Panel title="Complexity Comparison">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-border-default">
                <th className="pb-2 text-neutral-500 font-medium">Operation</th>
                <th className="pb-2 text-neutral-500 font-medium">Binary Heap</th>
                <th className="pb-2 text-neutral-500 font-medium">Sorted Array</th>
                <th className="pb-2 text-neutral-500 font-medium">BST (balanced)</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              <tr className="border-b border-border-default/50">
                <td className="py-2 text-neutral-300">Get Min/Max</td>
                <td className="py-2 text-green-400">O(1)</td>
                <td className="py-2 text-green-400">O(1)</td>
                <td className="py-2 text-yellow-400">O(log n)</td>
              </tr>
              <tr className="border-b border-border-default/50">
                <td className="py-2 text-neutral-300">Insert</td>
                <td className="py-2 text-yellow-400">O(log n)</td>
                <td className="py-2 text-red-400">O(n)</td>
                <td className="py-2 text-yellow-400">O(log n)</td>
              </tr>
              <tr className="border-b border-border-default/50">
                <td className="py-2 text-neutral-300">Extract Min/Max</td>
                <td className="py-2 text-yellow-400">O(log n)</td>
                <td className="py-2 text-green-400">O(1)</td>
                <td className="py-2 text-yellow-400">O(log n)</td>
              </tr>
              <tr className="border-b border-border-default/50">
                <td className="py-2 text-neutral-300">Search</td>
                <td className="py-2 text-red-400">O(n)</td>
                <td className="py-2 text-yellow-400">O(log n)</td>
                <td className="py-2 text-yellow-400">O(log n)</td>
              </tr>
              <tr>
                <td className="py-2 text-neutral-300">Build from n</td>
                <td className="py-2 text-green-400">O(n)</td>
                <td className="py-2 text-yellow-400">O(n log n)</td>
                <td className="py-2 text-yellow-400">O(n log n)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Panel>

      {/* When to use */}
      <Panel>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <Info className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">When to Use a Heap</h4>
            <ul className="text-sm text-neutral-400 space-y-1">
              <li>* You need repeated access to min/max element</li>
              <li>* Priority queue operations (insert + extract) are frequent</li>
              <li>* You need to efficiently find top K elements</li>
              <li>* Building from existing data (O(n) heapify)</li>
              <li>* Memory efficiency is important (array storage)</li>
            </ul>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export default HeapComplexity;
