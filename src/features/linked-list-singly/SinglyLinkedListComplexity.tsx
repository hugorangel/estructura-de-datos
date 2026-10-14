import { Panel } from '@/shared/components/ui';
import { ComplexityTable } from '@/shared/components/complexity';
import { singlyLinkedListConfig } from './config';
import { Info } from 'lucide-react';

export function SinglyLinkedListComplexity() {
  return (
    <div className="space-y-6">
      <Panel title="Time & Space Complexity">
        <ComplexityTable complexity={singlyLinkedListConfig.complexity} />
      </Panel>

      {/* Detailed explanations */}
      <Panel title="Operation Details">
        <div className="space-y-6">
          {/* Insert at Head */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Insert at Head - O(1)
            </h4>
            <p className="text-sm text-neutral-400 mb-2">
              Creating a new node and updating the head pointer requires constant time, regardless
              of list size. No traversal needed.
            </p>
            <code className="block bg-background-primary px-3 py-2 rounded text-sm font-mono text-blue-400">
              newNode.next = head; head = newNode;
            </code>
          </div>

          {/* Insert at Tail */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              Insert at Tail - O(n)
            </h4>
            <p className="text-sm text-neutral-400">
              Must traverse the entire list to find the last node before inserting. With a tail
              pointer optimization, this becomes O(1).
            </p>
          </div>

          {/* Insert at Position */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              Insert at Position - O(n)
            </h4>
            <p className="text-sm text-neutral-400">
              Requires traversing to the position before the insertion point. In the worst case
              (inserting near the end), this visits nearly all nodes.
            </p>
          </div>

          {/* Delete */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              Delete - O(n)
            </h4>
            <p className="text-sm text-neutral-400">
              Finding the node to delete and its predecessor requires traversal. Deleting the head
              is O(1), but deleting other nodes is O(n).
            </p>
          </div>

          {/* Search */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              Search - O(n)
            </h4>
            <p className="text-sm text-neutral-400">
              Must traverse the list sequentially, comparing each node's value. In the worst case,
              the target is at the end or not present.
            </p>
          </div>

          {/* Access */}
          <div>
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              Access by Index - O(n)
            </h4>
            <p className="text-sm text-neutral-400">
              Unlike arrays, linked lists don't support direct indexing. To access the k-th element,
              you must traverse k nodes from the head.
            </p>
          </div>
        </div>
      </Panel>

      {/* Space Complexity */}
      <Panel title="Space Complexity">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-background-primary rounded-lg">
            <span className="text-neutral-300">Total Space</span>
            <span className="font-mono text-blue-400">O(n)</span>
          </div>
          <p className="text-sm text-neutral-400">
            Each node requires space for the value plus a pointer to the next node. For n elements:
          </p>
          <code className="block bg-background-primary px-3 py-2 rounded text-sm font-mono text-neutral-300">
            Space = n × (sizeof(value) + sizeof(pointer))
          </code>
          <p className="text-sm text-neutral-500">
            Note: Pointers typically use 4-8 bytes depending on system architecture, adding overhead
            compared to arrays.
          </p>
        </div>
      </Panel>

      {/* When to use */}
      <Panel>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <Info className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">When to Use Singly Linked Lists</h4>
            <ul className="text-sm text-neutral-400 space-y-1">
              <li>• Frequent insertions/deletions at the beginning</li>
              <li>• Unknown or frequently changing size</li>
              <li>• Memory allocation is fragmented</li>
              <li>• You don't need random access by index</li>
              <li>• Implementing stacks, queues, or hash table chains</li>
            </ul>
          </div>
        </div>
      </Panel>

      {/* Optimization tips */}
      <Panel title="Optimization Tips">
        <div className="space-y-3">
          <div className="p-3 bg-background-primary rounded-lg">
            <h5 className="text-sm font-medium text-white mb-1">Tail Pointer</h5>
            <p className="text-xs text-neutral-400">
              Maintain a pointer to the last node to make insert-at-tail O(1) instead of O(n).
            </p>
          </div>
          <div className="p-3 bg-background-primary rounded-lg">
            <h5 className="text-sm font-medium text-white mb-1">Size Counter</h5>
            <p className="text-xs text-neutral-400">
              Keep a count variable to return list length in O(1) without traversing.
            </p>
          </div>
          <div className="p-3 bg-background-primary rounded-lg">
            <h5 className="text-sm font-medium text-white mb-1">Doubly Linked List</h5>
            <p className="text-xs text-neutral-400">
              Add a previous pointer to enable O(1) deletion when you have the node reference.
            </p>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export default SinglyLinkedListComplexity;
