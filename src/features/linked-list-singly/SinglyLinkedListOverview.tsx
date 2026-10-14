import { Panel } from '@/shared/components/ui';
import { CheckCircle, XCircle, Lightbulb, Code, ArrowRight } from 'lucide-react';

export function SinglyLinkedListOverview() {
  return (
    <div className="space-y-6">
      {/* What is a Linked List */}
      <Panel title="What is a Singly Linked List?">
        <div className="space-y-4 text-neutral-300">
          <p>
            A <strong className="text-white">singly linked list</strong> is a linear data structure
            where elements are stored in <strong className="text-blue-400">nodes</strong>. Each node
            contains two parts: a <strong className="text-green-400">value</strong> and a{' '}
            <strong className="text-purple-400">pointer (reference)</strong> to the next node.
          </p>
          <div className="bg-background-primary rounded-lg p-4 font-mono text-sm">
            <div className="text-neutral-500 mb-3">// Node structure</div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center border border-purple-500/50 rounded overflow-hidden">
                <div className="px-3 py-2 bg-purple-500/20 text-purple-400 text-xs">HEAD</div>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-500" />
              {[
                { val: 10, addr: '0x1A2B' },
                { val: 25, addr: '0x3C4D' },
                { val: 15, addr: '0x5E6F' },
              ].map((node, i) => (
                <div key={node.addr} className="flex items-center">
                  <div className="flex border border-border-default rounded overflow-hidden">
                    <div className="px-3 py-2 bg-background-tertiary">
                      <div className="text-xs text-neutral-500">val</div>
                      <div className="text-blue-400 font-semibold">{node.val}</div>
                    </div>
                    <div className="px-2 py-2 bg-background-primary border-l border-border-default">
                      <div className="text-xs text-neutral-500">next</div>
                      <ArrowRight className="w-4 h-4 text-green-400" />
                    </div>
                  </div>
                  {i < 2 && <ArrowRight className="w-4 h-4 text-green-400 mx-1" />}
                </div>
              ))}
              <ArrowRight className="w-4 h-4 text-neutral-500 mx-1" />
              <div className="px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-neutral-500">
                null
              </div>
            </div>
            <div className="text-neutral-600 text-xs mt-3">
              Memory addresses: 0x1A2B, 0x3C4D, 0x5E6F (non-contiguous)
            </div>
          </div>
        </div>
      </Panel>

      {/* Memory Model */}
      <Panel title="Memory Model">
        <div className="space-y-4 text-neutral-300">
          <p>
            Unlike arrays, linked list nodes are stored in{' '}
            <strong className="text-yellow-400">non-contiguous memory locations</strong>. Each node
            can be anywhere in memory, and they are connected through pointers.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background-primary rounded-lg p-4">
              <h4 className="text-sm font-medium text-white mb-2">Array (Contiguous)</h4>
              <div className="flex">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 border border-blue-500/50 bg-blue-500/10 flex items-center justify-center text-blue-400 text-sm"
                  >
                    {10 + i * 5}
                  </div>
                ))}
              </div>
              <div className="text-xs text-neutral-500 mt-2">Adjacent memory cells</div>
            </div>
            <div className="bg-background-primary rounded-lg p-4">
              <h4 className="text-sm font-medium text-white mb-2">Linked List (Scattered)</h4>
              <div className="flex items-center">
                {[10, 15, 20].map((val, i) => (
                  <div key={val} className="flex items-center">
                    <div className="w-10 h-10 border border-green-500/50 bg-green-500/10 flex items-center justify-center text-green-400 text-sm rounded">
                      {val}
                    </div>
                    {i < 2 && <ArrowRight className="w-3 h-3 text-green-400 mx-0.5" />}
                  </div>
                ))}
              </div>
              <div className="text-xs text-neutral-500 mt-2">Anywhere in memory</div>
            </div>
          </div>
        </div>
      </Panel>

      {/* Use Cases */}
      <Panel title="Real-World Applications">
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              icon: '🎵',
              title: 'Music Playlist',
              desc: 'Each song points to the next track',
            },
            {
              icon: '🖼️',
              title: 'Image Viewer',
              desc: 'Navigate through images sequentially',
            },
            {
              icon: '↩️',
              title: 'Undo Functionality',
              desc: 'Each state points to the previous one',
            },
            {
              icon: '🔗',
              title: 'Symbol Tables',
              desc: 'Compiler hash table collision chains',
            },
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
              'O(1) insertion at head',
              'Dynamic size (no capacity limit)',
              'Efficient insertion/deletion',
              'No memory waste from unused slots',
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
              'O(n) random access (no indexing)',
              'Extra memory for pointers',
              'No cache locality benefits',
              'Cannot traverse backwards',
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
              The power of linked lists lies in{' '}
              <strong className="text-yellow-400">pointer manipulation</strong>. Inserting or
              deleting a node only requires changing a few pointers, not moving any data. This makes
              operations like{' '}
              <code className="bg-background-primary px-2 py-1 rounded text-green-400">
                insertAtHead
              </code>{' '}
              run in O(1) time, regardless of list size.
            </p>
          </div>
        </div>
      </Panel>

      {/* Array vs Linked List Comparison */}
      <Panel title="Array vs Singly Linked List">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-default">
                <th className="text-left py-2 pr-4 text-neutral-400 font-medium">Operation</th>
                <th className="text-left py-2 px-4 text-blue-400 font-medium">Array</th>
                <th className="text-left py-2 pl-4 text-green-400 font-medium">Linked List</th>
              </tr>
            </thead>
            <tbody className="text-neutral-300">
              <tr className="border-b border-border-default/50">
                <td className="py-2 pr-4">Access by index</td>
                <td className="py-2 px-4 text-green-400">O(1)</td>
                <td className="py-2 pl-4 text-red-400">O(n)</td>
              </tr>
              <tr className="border-b border-border-default/50">
                <td className="py-2 pr-4">Insert at beginning</td>
                <td className="py-2 px-4 text-red-400">O(n)</td>
                <td className="py-2 pl-4 text-green-400">O(1)</td>
              </tr>
              <tr className="border-b border-border-default/50">
                <td className="py-2 pr-4">Insert at end</td>
                <td className="py-2 px-4 text-green-400">O(1)*</td>
                <td className="py-2 pl-4 text-red-400">O(n)</td>
              </tr>
              <tr className="border-b border-border-default/50">
                <td className="py-2 pr-4">Search</td>
                <td className="py-2 px-4 text-yellow-400">O(n)</td>
                <td className="py-2 pl-4 text-yellow-400">O(n)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Memory</td>
                <td className="py-2 px-4">Contiguous</td>
                <td className="py-2 pl-4">Scattered + pointer overhead</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-neutral-500 mt-2">* Amortized, when no resize needed</p>
        </div>
      </Panel>

      {/* Code Example */}
      <Panel title="Node Structure">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <Code className="w-6 h-6 text-blue-500" />
          </div>
          <div className="flex-1">
            <pre className="bg-background-primary rounded-lg p-4 text-sm font-mono overflow-x-auto">
              <code className="text-neutral-300">
                {`class Node {
  value: number;      // Data stored in node
  next: Node | null;  // Pointer to next node

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}`}
              </code>
            </pre>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export default SinglyLinkedListOverview;
