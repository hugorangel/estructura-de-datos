import { Panel } from '@/shared/components/ui';
import { CheckCircle, XCircle, Lightbulb, Code } from 'lucide-react';

export function ArrayOverview() {
  return (
    <div className="space-y-6">
      {/* What is an Array */}
      <Panel title="What is an Array?">
        <div className="space-y-4 text-neutral-300">
          <p>
            An <strong className="text-white">array</strong> is a fundamental data structure that stores
            elements in <strong className="text-blue-400">contiguous memory locations</strong>. Each element
            can be accessed directly using its index, making arrays extremely efficient for random access
            operations.
          </p>
          <div className="bg-background-primary rounded-lg p-4 font-mono text-sm">
            <div className="text-neutral-500">// Memory layout</div>
            <div className="flex gap-2 mt-2">
              {['0x1000', '0x1004', '0x1008', '0x100C', '0x1010'].map((addr, i) => (
                <div key={addr} className="text-center">
                  <div className="w-12 h-10 bg-background-tertiary border border-border-default rounded flex items-center justify-center text-blue-400">
                    {[15, 42, 8, 23, 67][i]}
                  </div>
                  <div className="text-xs text-neutral-600 mt-1">{addr}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Panel>

      {/* Use Cases */}
      <Panel title="Common Use Cases">
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: '📊', title: 'Data Storage', desc: 'Store collections of items like lists, records' },
            { icon: '🔢', title: 'Matrices', desc: '2D arrays for image processing, games' },
            { icon: '📈', title: 'Buffers', desc: 'Audio/video streaming, I/O operations' },
            { icon: '🎯', title: 'Lookup Tables', desc: 'Fast O(1) lookups by index' },
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
              'O(1) random access by index',
              'Memory efficient (contiguous)',
              'Cache-friendly data locality',
              'Simple implementation',
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
              'Fixed size (static arrays)',
              'O(n) insertion/deletion',
              'Costly resize operations',
              'Unused space wastes memory',
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
              The key advantage of arrays is <strong className="text-yellow-400">O(1) access time</strong>.
              Given an index, the memory address is calculated as: <code className="bg-background-primary px-2 py-1 rounded text-blue-400">
              address = base + (index × elementSize)</code>. This direct calculation makes arrays ideal
              when you need fast access by position.
            </p>
          </div>
        </div>
      </Panel>

      {/* Real-world Examples */}
      <Panel title="Real-World Examples">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white">String Representation</h4>
              <p className="text-sm text-neutral-400">Strings in most languages are arrays of characters</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 text-purple-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white">Image Pixels</h4>
              <p className="text-sm text-neutral-400">Images are 2D arrays of pixel color values</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 text-green-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white">Database Tables</h4>
              <p className="text-sm text-neutral-400">Row-based storage uses arrays internally</p>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export default ArrayOverview;
