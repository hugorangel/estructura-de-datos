import { Panel } from '@/shared/components/ui';
import { CheckCircle, XCircle, Lightbulb, Code, ArrowLeftRight } from 'lucide-react';

export function DoublyLinkedListOverview() {
  return (
    <div className="space-y-6">
      {/* What is a Doubly Linked List */}
      <Panel title="What is a Doubly Linked List?">
        <div className="space-y-4 text-neutral-300">
          <p>
            A <strong className="text-white">doubly linked list</strong> is a linear data structure
            where each node contains a value and{' '}
            <strong className="text-blue-400">two pointers</strong>: one pointing to the{' '}
            <strong className="text-green-400">next node</strong> and one pointing to the{' '}
            <strong className="text-orange-400">previous node</strong>. This allows traversal in both
            directions.
          </p>
          <div className="bg-background-primary rounded-lg p-4 font-mono text-sm">
            <div className="text-neutral-500">// Node structure</div>
            <div className="mt-2 text-blue-400">
              {`class Node {`}
              <div className="ml-4 text-neutral-300">
                <div>value: number;</div>
                <div className="text-orange-400">prev: Node | null;</div>
                <div className="text-green-400">next: Node | null;</div>
              </div>
              {`}`}
            </div>
          </div>
        </div>
      </Panel>

      {/* Visual representation */}
      <Panel title="Structure Visualization">
        <div className="flex items-center justify-center gap-2 py-4 overflow-x-auto">
          <div className="text-xs text-neutral-600 font-mono px-2 py-1 border border-dashed border-neutral-700 rounded">
            null
          </div>
          <span className="text-neutral-600">←</span>
          {[
            { label: 'HEAD', value: 'A' },
            { value: 'B' },
            { value: 'C' },
            { label: 'TAIL', value: 'D' },
          ].map((node, i, arr) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center">
                {node.label && (
                  <span className={`text-xs mb-1 ${node.label === 'HEAD' ? 'text-green-400' : 'text-purple-400'}`}>
                    {node.label}
                  </span>
                )}
                <div className="w-10 h-10 border-2 border-border-default rounded flex items-center justify-center text-white font-mono">
                  {node.value}
                </div>
              </div>
              {i < arr.length - 1 && (
                <div className="flex flex-col mx-1">
                  <span className="text-blue-400 text-xs">→</span>
                  <span className="text-orange-400 text-xs">←</span>
                </div>
              )}
            </div>
          ))}
          <span className="text-neutral-600">→</span>
          <div className="text-xs text-neutral-600 font-mono px-2 py-1 border border-dashed border-neutral-700 rounded">
            null
          </div>
        </div>
      </Panel>

      {/* Use Cases */}
      <Panel title="Common Use Cases">
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: '🔄', title: 'Browser History', desc: 'Navigate back and forward through pages' },
            { icon: '↩️', title: 'Undo/Redo', desc: 'Text editors, image editors, IDEs' },
            { icon: '🎵', title: 'Music Playlist', desc: 'Previous/next song navigation' },
            { icon: '📱', title: 'LRU Cache', desc: 'Least Recently Used cache implementation' },
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
              'O(1) deletion with node reference',
              'Bidirectional traversal',
              'O(1) insert at head/tail',
              'Easy to reverse iterate',
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
              'Extra memory for prev pointer',
              'More complex insert/delete',
              'No random access (O(n))',
              'More pointers to maintain',
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
              The main advantage of a doubly linked list over a singly linked list is{' '}
              <strong className="text-yellow-400">O(1) deletion given a node reference</strong>.
              Since we have the prev pointer, we can update the previous node&apos;s next pointer without
              traversing from the head. This makes it ideal for LRU caches where we need to quickly
              remove items from the middle.
            </p>
          </div>
        </div>
      </Panel>

      {/* Comparison with Singly Linked List */}
      <Panel title="vs Singly Linked List">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <ArrowLeftRight className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white">Traversal Direction</h4>
              <p className="text-sm text-neutral-400">
                Singly: Forward only | Doubly: Both directions
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 text-purple-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white">Memory Usage</h4>
              <p className="text-sm text-neutral-400">
                Doubly linked lists use more memory (extra prev pointer per node)
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 text-green-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white">Delete Given Node</h4>
              <p className="text-sm text-neutral-400">
                Singly: O(n) to find prev | Doubly: O(1) with direct access
              </p>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export default DoublyLinkedListOverview;
