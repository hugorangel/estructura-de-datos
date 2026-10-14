import { Panel } from '@/shared/components/ui';
import { ComplexityTable } from '@/shared/components/complexity';
import { queueConfig } from './config';
import { Info } from 'lucide-react';

export function QueueComplexity() {
  return (
    <div className="space-y-6">
      <Panel title="Time & Space Complexity">
        <ComplexityTable complexity={queueConfig.complexity} />
      </Panel>

      {/* Detailed explanations */}
      <Panel title="Operation Details">
        <div className="space-y-6">
          {/* Enqueue */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Enqueue - O(1)
            </h4>
            <p className="text-sm text-neutral-400 mb-2">
              Adding an element to the rear of the queue is a constant time operation.
              We simply add the new element at the end position.
            </p>
            <code className="block bg-background-primary px-3 py-2 rounded text-sm font-mono text-blue-400">
              queue.push(element) // Add at rear
            </code>
          </div>

          {/* Dequeue */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Dequeue - O(1)
            </h4>
            <p className="text-sm text-neutral-400 mb-2">
              Removing the front element is constant time. In a linked list implementation,
              we simply update the head pointer. In array implementations with circular
              buffers, we update the front index.
            </p>
            <code className="block bg-background-primary px-3 py-2 rounded text-sm font-mono text-blue-400">
              element = queue.shift() // Remove from front
            </code>
            <p className="text-xs text-neutral-500 mt-2">
              Note: Array shift() is technically O(n) due to reindexing, but circular
              queue implementations achieve true O(1).
            </p>
          </div>

          {/* Peek */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Peek - O(1)
            </h4>
            <p className="text-sm text-neutral-400">
              Accessing the front element without removing it is a constant time operation.
              We simply return the element at the front position without modifying the queue.
            </p>
          </div>

          {/* Search */}
          <div>
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              Search - O(n)
            </h4>
            <p className="text-sm text-neutral-400">
              Searching for an element requires traversing from the front to the rear,
              checking each element. In the worst case, the element is at the rear
              or not present, requiring n comparisons.
            </p>
          </div>
        </div>
      </Panel>

      {/* Implementation comparison */}
      <Panel title="Implementation Comparison">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-default">
                <th className="text-left py-2 text-neutral-400 font-medium">Implementation</th>
                <th className="text-center py-2 text-neutral-400 font-medium">Enqueue</th>
                <th className="text-center py-2 text-neutral-400 font-medium">Dequeue</th>
                <th className="text-center py-2 text-neutral-400 font-medium">Space</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-default">
                <td className="py-2 text-white">Array (dynamic)</td>
                <td className="text-center py-2 text-green-400">O(1)*</td>
                <td className="text-center py-2 text-yellow-400">O(n)</td>
                <td className="text-center py-2 text-blue-400">O(n)</td>
              </tr>
              <tr className="border-b border-border-default">
                <td className="py-2 text-white">Circular Array</td>
                <td className="text-center py-2 text-green-400">O(1)</td>
                <td className="text-center py-2 text-green-400">O(1)</td>
                <td className="text-center py-2 text-blue-400">O(n)</td>
              </tr>
              <tr>
                <td className="py-2 text-white">Linked List</td>
                <td className="text-center py-2 text-green-400">O(1)</td>
                <td className="text-center py-2 text-green-400">O(1)</td>
                <td className="text-center py-2 text-blue-400">O(n)</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-neutral-500 mt-2">* Amortized O(1) with occasional O(n) resize</p>
        </div>
      </Panel>

      {/* When to use */}
      <Panel>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <Info className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">When to Use Queues</h4>
            <ul className="text-sm text-neutral-400 space-y-1">
              <li>• Processing tasks in the order they arrive</li>
              <li>• Breadth-First Search (BFS) traversal</li>
              <li>• Handling asynchronous requests</li>
              <li>• Buffering data streams</li>
              <li>• Job scheduling and task management</li>
            </ul>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export default QueueComplexity;
