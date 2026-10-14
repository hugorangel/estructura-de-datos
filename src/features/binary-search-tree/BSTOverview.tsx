import { Panel } from '@/shared/components/ui';
import { CheckCircle, XCircle, Lightbulb, Code, AlertTriangle } from 'lucide-react';

export function BSTOverview() {
  return (
    <div className="space-y-6">
      {/* What is a BST */}
      <Panel title="What is a Binary Search Tree?">
        <div className="space-y-4 text-neutral-300">
          <p>
            A <strong className="text-white">Binary Search Tree (BST)</strong> is a hierarchical
            data structure where each node has at most two children. The key property that makes
            it a <em>search</em> tree is the <strong className="text-blue-400">ordering invariant</strong>:
          </p>
          <div className="bg-background-primary rounded-lg p-4 text-center">
            <div className="text-lg font-mono text-yellow-400">
              left.value &lt; node.value &lt; right.value
            </div>
            <div className="text-sm text-neutral-500 mt-2">
              For every node, all values in the left subtree are smaller,
              and all values in the right subtree are larger
            </div>
          </div>
          <div className="bg-background-primary rounded-lg p-4">
            <div className="text-neutral-500 text-xs mb-2">Example BST Structure</div>
            <pre className="text-sm font-mono text-blue-400">
{`        50
       /  \\
      30    70
     /  \\  /  \\
    20  40 60  80`}
            </pre>
          </div>
        </div>
      </Panel>

      {/* BST Property */}
      <Panel title="The BST Property">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background-primary rounded-lg p-4">
              <h4 className="font-medium text-green-400 mb-2">Valid BST</h4>
              <pre className="text-sm font-mono text-neutral-400">
{`    10
   /  \\
  5    15
 / \\
2   7`}
              </pre>
              <p className="text-xs text-neutral-500 mt-2">
                Every node satisfies: left &lt; parent &lt; right
              </p>
            </div>
            <div className="bg-background-primary rounded-lg p-4">
              <h4 className="font-medium text-red-400 mb-2">Invalid BST</h4>
              <pre className="text-sm font-mono text-neutral-400">
{`    10
   /  \\
  5    15
 / \\
2   12  ← Wrong!`}
              </pre>
              <p className="text-xs text-neutral-500 mt-2">
                12 is in left subtree but &gt; 10
              </p>
            </div>
          </div>
        </div>
      </Panel>

      {/* Balanced vs Unbalanced */}
      <Panel title="Balanced vs Unbalanced Trees">
        <div className="space-y-4 text-neutral-300">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-medium text-green-400 mb-2">Balanced Tree</h4>
              <pre className="text-sm font-mono text-neutral-400">
{`      50
     /  \\
    25    75
   /  \\  /  \\
  10  30 60  90`}
              </pre>
              <p className="text-xs text-green-400/70 mt-2">
                Height: O(log n) — Optimal performance!
              </p>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-medium text-red-400 mb-2">Unbalanced (Degenerate)</h4>
              <pre className="text-sm font-mono text-neutral-400">
{`  10
    \\
     20
       \\
        30
          \\
           40`}
              </pre>
              <p className="text-xs text-red-400/70 mt-2">
                Height: O(n) — Degrades to linked list!
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-yellow-500/10 p-3 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-300">
              Inserting sorted data creates a degenerate tree. To maintain O(log n) operations,
              use <strong>self-balancing trees</strong> like AVL or Red-Black trees.
            </p>
          </div>
        </div>
      </Panel>

      {/* Advantages & Disadvantages */}
      <div className="grid grid-cols-2 gap-4">
        <Panel title="Advantages">
          <ul className="space-y-3">
            {[
              'O(log n) search, insert, delete (balanced)',
              'Maintains sorted order automatically',
              'Efficient range queries',
              'Simple to implement',
              'Inorder traversal yields sorted data',
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
              'O(n) worst case if unbalanced',
              'No O(1) access by index',
              'Extra memory for pointers',
              'Not cache-friendly (non-contiguous)',
              'Requires balancing for guarantees',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-neutral-300">{item}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Real-world Use Cases */}
      <Panel title="Real-World Applications">
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: '🗄️', title: 'Database Indexing', desc: 'B-trees (BST variant) power database indexes for fast lookups' },
            { icon: '🔍', title: 'Autocomplete', desc: 'Trie/BST hybrids enable fast prefix searching' },
            { icon: '📦', title: 'File Systems', desc: 'Directory structures often use tree-based indexing' },
            { icon: '🎮', title: 'Game Development', desc: 'Spatial partitioning trees for collision detection' },
          ].map((item) => (
            <div key={item.title} className="bg-background-primary rounded-lg p-4">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h4 className="font-medium text-white mb-1">{item.title}</h4>
              <p className="text-sm text-neutral-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </Panel>

      {/* Self-balancing variants */}
      <Panel title="Self-Balancing Variants">
        <div className="space-y-4">
          <p className="text-sm text-neutral-400">
            To guarantee O(log n) operations, these variants automatically rebalance:
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-background-primary rounded-lg p-3">
              <h4 className="font-medium text-purple-400">AVL Tree</h4>
              <p className="text-xs text-neutral-500 mt-1">
                Strictly balanced (height diff ≤ 1). Best for lookup-heavy workloads.
              </p>
            </div>
            <div className="bg-background-primary rounded-lg p-3">
              <h4 className="font-medium text-red-400">Red-Black Tree</h4>
              <p className="text-xs text-neutral-500 mt-1">
                Relaxed balance. Used in Java TreeMap, C++ std::map.
              </p>
            </div>
            <div className="bg-background-primary rounded-lg p-3">
              <h4 className="font-medium text-blue-400">B-Tree</h4>
              <p className="text-xs text-neutral-500 mt-1">
                Multi-way BST optimized for disk access. Powers databases.
              </p>
            </div>
          </div>
        </div>
      </Panel>

      {/* Key Insight */}
      <Panel>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-yellow-500/10 rounded-lg">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">Key Insight</h4>
            <p className="text-sm text-neutral-400">
              The BST property enables <strong className="text-yellow-400">binary search in a dynamic structure</strong>.
              Unlike arrays (which need O(n) to insert while keeping sorted order), BSTs can insert
              in O(log n) while maintaining the ability to search in O(log n). This makes them ideal
              for applications requiring both fast searches AND frequent modifications.
            </p>
          </div>
        </div>
      </Panel>

      {/* Traversal Reference */}
      <Panel title="Traversal Methods">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 text-green-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white">Inorder (Left → Root → Right)</h4>
              <p className="text-sm text-neutral-400">
                Visits nodes in sorted order. Used to get sorted data from BST.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white">Preorder (Root → Left → Right)</h4>
              <p className="text-sm text-neutral-400">
                Used to create a copy of the tree or serialize it.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 text-purple-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white">Postorder (Left → Right → Root)</h4>
              <p className="text-sm text-neutral-400">
                Used to delete the tree or evaluate expression trees.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 text-orange-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white">BFS / Level Order</h4>
              <p className="text-sm text-neutral-400">
                Visits level by level using a queue. Used to find shortest paths.
              </p>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export default BSTOverview;
