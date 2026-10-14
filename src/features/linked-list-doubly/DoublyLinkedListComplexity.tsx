import { Panel } from '@/shared/components/ui';
import { ComplexityTable } from '@/shared/components/complexity';
import { doublyLinkedListConfig } from './config';
import { Info } from 'lucide-react';

export function DoublyLinkedListComplexity() {
  return (
    <div className="space-y-6">
      <Panel title="Time & Space Complexity">
        <ComplexityTable complexity={doublyLinkedListConfig.complexity} />
      </Panel>

      {/* Detailed explanations */}
      <Panel title="Operation Details">
        <div className="space-y-6">
          {/* Insert at Head/Tail */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Insert at Head/Tail - O(1)
            </h4>
            <p className="text-sm text-neutral-400 mb-2">
              With direct references to both head and tail, insertion at either end is constant time.
              Only requires updating 2-4 pointers regardless of list size.
            </p>
            <code className="block bg-background-primary px-3 py-2 rounded text-sm font-mono text-blue-400">
              newNode.next = head; head.prev = newNode; head = newNode;
            </code>
          </div>

          {/* Insert at Position */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              Insert at Position - O(n)
            </h4>
            <p className="text-sm text-neutral-400">
              Requires traversal to find the insertion point. Once found, the actual insertion
              is O(1) since we have access to both prev and next nodes.
            </p>
          </div>

          {/* Delete */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Delete (given node) - O(1)
            </h4>
            <p className="text-sm text-neutral-400 mb-2">
              The key advantage of doubly linked lists! Given a node reference, deletion is O(1)
              because we can directly access both neighbors via prev and next pointers.
            </p>
            <code className="block bg-background-primary px-3 py-2 rounded text-sm font-mono text-blue-400">
              node.prev.next = node.next; node.next.prev = node.prev;
            </code>
          </div>

          {/* Traverse */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              Traversal - O(n)
            </h4>
            <p className="text-sm text-neutral-400">
              Must visit each node sequentially. However, unlike singly linked lists, we can
              traverse in either direction (forward via next, backward via prev).
            </p>
          </div>

          {/* Access/Search */}
          <div>
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              Access/Search - O(n)
            </h4>
            <p className="text-sm text-neutral-400">
              No random access like arrays. Must traverse from head or tail to reach a specific
              position. Optimization: can start from tail if index is in the second half.
            </p>
          </div>
        </div>
      </Panel>

      {/* Space complexity */}
      <Panel title="Space Complexity">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-background-primary rounded-lg">
            <span className="text-neutral-300">Total Space</span>
            <span className="font-mono text-blue-400">O(n)</span>
          </div>
          <p className="text-sm text-neutral-400">
            Each node stores: value + prev pointer + next pointer. Compared to singly linked lists,
            doubly linked lists use approximately <strong className="text-yellow-400">50% more memory</strong> per
            node due to the additional prev pointer.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-3 bg-background-primary rounded-lg">
              <div className="text-xs text-neutral-500 mb-1">Singly Linked</div>
              <div className="font-mono text-sm">value + next</div>
            </div>
            <div className="p-3 bg-background-primary rounded-lg border border-blue-500/30">
              <div className="text-xs text-neutral-500 mb-1">Doubly Linked</div>
              <div className="font-mono text-sm">value + prev + next</div>
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
            <h4 className="font-medium text-white mb-2">When to Use Doubly Linked Lists</h4>
            <ul className="text-sm text-neutral-400 space-y-1">
              <li>- You need O(1) deletion given a node reference (LRU cache)</li>
              <li>- You need bidirectional traversal (browser history)</li>
              <li>- Frequent insertions/deletions at both ends</li>
              <li>- You need to implement undo/redo functionality</li>
              <li>- Memory overhead of extra pointer is acceptable</li>
            </ul>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export default DoublyLinkedListComplexity;
