import { Panel } from '@/shared/components/ui';
import { ComplexityTable } from '@/shared/components/complexity';
import { bstConfig } from './config';
import { Info, AlertTriangle } from 'lucide-react';

export function BSTComplexity() {
  return (
    <div className="space-y-6">
      <Panel title="Time & Space Complexity">
        <ComplexityTable complexity={bstConfig.complexity} />
      </Panel>

      {/* Average vs Worst Case Comparison */}
      <Panel title="Average Case vs Worst Case">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-medium text-green-400 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Average Case: O(log n)
              </h4>
              <p className="text-sm text-neutral-400 mb-3">
                When the tree is reasonably balanced, each comparison eliminates
                roughly half of the remaining nodes.
              </p>
              <div className="bg-background-primary rounded p-3">
                <pre className="text-xs font-mono text-neutral-400">
{`       50          Height = 3
      /  \\         Nodes = 7
     30    70
    /  \\  /  \\     log₂(7) ≈ 2.8
   20  40 60  80`}
                </pre>
              </div>
              <p className="text-xs text-green-400/70 mt-2">
                7 nodes, ~3 comparisons max to find any element
              </p>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-medium text-red-400 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full" />
                Worst Case: O(n)
              </h4>
              <p className="text-sm text-neutral-400 mb-3">
                When the tree degenerates into a linked list (e.g., inserting
                sorted data), every node must be checked.
              </p>
              <div className="bg-background-primary rounded p-3">
                <pre className="text-xs font-mono text-neutral-400">
{`10                 Height = 7
  \\                Nodes = 7
   20
     \\             All nodes in
      30           one chain!
        \\
         40 → 50 → 60 → 70`}
                </pre>
              </div>
              <p className="text-xs text-red-400/70 mt-2">
                7 nodes, 7 comparisons to find 70
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-yellow-500/10 p-3 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-yellow-300 font-medium">
                When does worst case happen?
              </p>
              <ul className="text-sm text-yellow-300/80 mt-2 space-y-1">
                <li>• Inserting elements in sorted order (ascending or descending)</li>
                <li>• Inserting elements in nearly sorted order</li>
                <li>• Repeated insertions and deletions that unbalance the tree</li>
              </ul>
            </div>
          </div>
        </div>
      </Panel>

      {/* Detailed explanations */}
      <Panel title="Operation Details">
        <div className="space-y-6">
          {/* Search */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Search - O(log n) average, O(n) worst
            </h4>
            <p className="text-sm text-neutral-400 mb-2">
              Compare target with current node. If smaller, go left; if larger, go right.
              Each step eliminates a subtree (in balanced tree, ~half the remaining nodes).
            </p>
            <code className="block bg-background-primary px-3 py-2 rounded text-sm font-mono text-blue-400">
              if (target &lt; node.value) search(node.left) else search(node.right)
            </code>
          </div>

          {/* Insert */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Insert - O(log n) average, O(n) worst
            </h4>
            <p className="text-sm text-neutral-400">
              Follow the same path as search until reaching a null pointer, then create
              the new node. The time is proportional to the tree height.
            </p>
          </div>

          {/* Delete */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              Delete - O(log n) average, O(n) worst
            </h4>
            <p className="text-sm text-neutral-400 mb-3">
              Three cases based on the node&apos;s children:
            </p>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="bg-background-primary p-3 rounded">
                <div className="font-medium text-green-400">Case 1: Leaf</div>
                <div className="text-neutral-500 mt-1">Simply remove it</div>
              </div>
              <div className="bg-background-primary p-3 rounded">
                <div className="font-medium text-yellow-400">Case 2: One child</div>
                <div className="text-neutral-500 mt-1">Replace with child</div>
              </div>
              <div className="bg-background-primary p-3 rounded">
                <div className="font-medium text-red-400">Case 3: Two children</div>
                <div className="text-neutral-500 mt-1">Replace with inorder successor</div>
              </div>
            </div>
          </div>

          {/* Traversals */}
          <div>
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              Traversals - O(n) all cases
            </h4>
            <p className="text-sm text-neutral-400">
              All traversals (inorder, preorder, postorder, BFS) must visit every node
              exactly once, resulting in O(n) time regardless of tree shape.
            </p>
          </div>
        </div>
      </Panel>

      {/* Space Complexity */}
      <Panel title="Space Complexity">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background-primary rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">Tree Storage: O(n)</h4>
              <p className="text-sm text-neutral-400">
                Each of the n nodes stores a value and two pointers (left, right).
              </p>
            </div>
            <div className="bg-background-primary rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">Recursive Calls: O(h)</h4>
              <p className="text-sm text-neutral-400">
                Stack space for recursion is proportional to tree height h
                (O(log n) balanced, O(n) worst).
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
            <h4 className="font-medium text-white mb-2">When to Use a BST</h4>
            <ul className="text-sm text-neutral-400 space-y-1">
              <li>• You need fast search, insert, and delete (O(log n) average)</li>
              <li>• You need data in sorted order (inorder traversal)</li>
              <li>• You need range queries (find all values between X and Y)</li>
              <li>• Data changes frequently (unlike sorted array which is O(n) to modify)</li>
            </ul>
            <div className="mt-3 p-2 bg-blue-500/10 rounded text-xs text-blue-400">
              <strong>Pro tip:</strong> For guaranteed O(log n), use self-balancing variants
              like AVL or Red-Black trees.
            </div>
          </div>
        </div>
      </Panel>

      {/* Comparison Table */}
      <Panel title="BST vs Other Data Structures">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-default">
                <th className="text-left py-2 text-neutral-400 font-medium">Operation</th>
                <th className="text-center py-2 text-neutral-400 font-medium">Sorted Array</th>
                <th className="text-center py-2 text-neutral-400 font-medium">BST (avg)</th>
                <th className="text-center py-2 text-neutral-400 font-medium">Hash Table</th>
              </tr>
            </thead>
            <tbody className="text-neutral-300">
              <tr className="border-b border-border-default/50">
                <td className="py-2">Search</td>
                <td className="text-center text-green-400">O(log n)</td>
                <td className="text-center text-green-400">O(log n)</td>
                <td className="text-center text-green-400">O(1)</td>
              </tr>
              <tr className="border-b border-border-default/50">
                <td className="py-2">Insert</td>
                <td className="text-center text-red-400">O(n)</td>
                <td className="text-center text-green-400">O(log n)</td>
                <td className="text-center text-green-400">O(1)</td>
              </tr>
              <tr className="border-b border-border-default/50">
                <td className="py-2">Delete</td>
                <td className="text-center text-red-400">O(n)</td>
                <td className="text-center text-green-400">O(log n)</td>
                <td className="text-center text-green-400">O(1)</td>
              </tr>
              <tr className="border-b border-border-default/50">
                <td className="py-2">Find Min/Max</td>
                <td className="text-center text-green-400">O(1)</td>
                <td className="text-center text-green-400">O(log n)</td>
                <td className="text-center text-red-400">O(n)</td>
              </tr>
              <tr>
                <td className="py-2">Range Query</td>
                <td className="text-center text-green-400">O(log n + k)</td>
                <td className="text-center text-green-400">O(log n + k)</td>
                <td className="text-center text-red-400">O(n)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-neutral-500 mt-2">
          k = number of elements in the range
        </p>
      </Panel>
    </div>
  );
}

export default BSTComplexity;
