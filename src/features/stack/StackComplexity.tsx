import { Panel } from '@/shared/components/ui';
import { ComplexityTable } from '@/shared/components/complexity';
import { stackConfig } from './config';
import { Info } from 'lucide-react';

export function StackComplexity() {
  return (
    <div className="space-y-6">
      <Panel title="Time & Space Complexity">
        <ComplexityTable complexity={stackConfig.complexity} />
      </Panel>

      {/* Detailed explanations */}
      <Panel title="Operation Details">
        <div className="space-y-6">
          {/* Push */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Push - O(1)
            </h4>
            <p className="text-sm text-neutral-400 mb-2">
              Adding an element to the top of the stack is constant time. The new element is
              simply placed at the end of the underlying array or linked list.
            </p>
            <code className="block bg-background-primary px-3 py-2 rounded text-sm font-mono text-blue-400">
              stack.push(value) // Always O(1) amortized
            </code>
          </div>

          {/* Pop */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Pop - O(1)
            </h4>
            <p className="text-sm text-neutral-400 mb-2">
              Removing the top element is constant time. We simply decrement the size pointer
              and return the element (no shifting needed).
            </p>
            <code className="block bg-background-primary px-3 py-2 rounded text-sm font-mono text-blue-400">
              value = stack.pop() // Returns and removes top element
            </code>
          </div>

          {/* Peek */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Peek - O(1)
            </h4>
            <p className="text-sm text-neutral-400 mb-2">
              Viewing the top element without removal is constant time. Direct access to
              the last element in the underlying structure.
            </p>
            <code className="block bg-background-primary px-3 py-2 rounded text-sm font-mono text-blue-400">
              top = stack.peek() // Returns top without removing
            </code>
          </div>

          {/* Search */}
          <div>
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              Search - O(n)
            </h4>
            <p className="text-sm text-neutral-400">
              Searching for an element requires examining each item from top to bottom.
              In the worst case, the element is at the bottom or not present, requiring
              all n elements to be checked.
            </p>
          </div>
        </div>
      </Panel>

      {/* Comparison with other structures */}
      <Panel title="Stack vs Other Structures">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-default">
                <th className="text-left py-2 text-neutral-400 font-medium">Operation</th>
                <th className="text-center py-2 text-neutral-400 font-medium">Stack</th>
                <th className="text-center py-2 text-neutral-400 font-medium">Array</th>
                <th className="text-center py-2 text-neutral-400 font-medium">Queue</th>
              </tr>
            </thead>
            <tbody className="text-neutral-300">
              <tr className="border-b border-border-default/50">
                <td className="py-2">Insert (end)</td>
                <td className="text-center text-green-400">O(1)</td>
                <td className="text-center text-green-400">O(1)*</td>
                <td className="text-center text-green-400">O(1)</td>
              </tr>
              <tr className="border-b border-border-default/50">
                <td className="py-2">Remove (end)</td>
                <td className="text-center text-green-400">O(1)</td>
                <td className="text-center text-green-400">O(1)</td>
                <td className="text-center text-yellow-400">O(n)</td>
              </tr>
              <tr className="border-b border-border-default/50">
                <td className="py-2">Access (arbitrary)</td>
                <td className="text-center text-yellow-400">O(n)</td>
                <td className="text-center text-green-400">O(1)</td>
                <td className="text-center text-yellow-400">O(n)</td>
              </tr>
              <tr>
                <td className="py-2">Search</td>
                <td className="text-center text-yellow-400">O(n)</td>
                <td className="text-center text-yellow-400">O(n)</td>
                <td className="text-center text-yellow-400">O(n)</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-neutral-500 mt-2">* Amortized O(1) for dynamic arrays</p>
        </div>
      </Panel>

      {/* When to use */}
      <Panel>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <Info className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">When to Use a Stack</h4>
            <ul className="text-sm text-neutral-400 space-y-1">
              <li>* You need LIFO (last-in, first-out) behavior</li>
              <li>* Tracking nested or recursive structures</li>
              <li>* Implementing undo/redo functionality</li>
              <li>* Parsing expressions with nested elements</li>
              <li>* Backtracking algorithms (maze, puzzle solving)</li>
            </ul>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export default StackComplexity;
