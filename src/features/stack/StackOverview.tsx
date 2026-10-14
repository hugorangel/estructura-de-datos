import { Panel } from '@/shared/components/ui';
import { CheckCircle, XCircle, Lightbulb, Code } from 'lucide-react';

export function StackOverview() {
  return (
    <div className="space-y-6">
      {/* What is a Stack */}
      <Panel title="What is a Stack?">
        <div className="space-y-4 text-neutral-300">
          <p>
            A <strong className="text-white">stack</strong> is a linear data structure that follows
            the <strong className="text-blue-400">LIFO (Last-In-First-Out)</strong> principle.
            Elements are added and removed only from the <strong className="text-green-400">top</strong> of
            the stack, like a stack of plates.
          </p>
          <div className="bg-background-primary rounded-lg p-4 font-mono text-sm">
            <div className="text-neutral-500 mb-2">// Stack visualization</div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <span className="text-green-400 text-xs">TOP -{'>'}</span>
                <div className="w-16 h-10 bg-green-500/20 border border-green-500 rounded flex items-center justify-center text-green-400">
                  67
                </div>
              </div>
              {[12, 45, 23].map((val) => (
                <div key={val} className="w-16 h-10 bg-background-tertiary border border-border-default rounded flex items-center justify-center text-blue-400">
                  {val}
                </div>
              ))}
              <div className="text-neutral-600 text-xs mt-1">BOTTOM</div>
            </div>
          </div>
        </div>
      </Panel>

      {/* Use Cases */}
      <Panel title="Real-World Examples">
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: '🔙', title: 'Browser Back Button', desc: 'History of visited pages stored in a stack' },
            { icon: '↩️', title: 'Undo/Redo', desc: 'Action history for text editors, graphics tools' },
            { icon: '📞', title: 'Call Stack', desc: 'Function calls tracked during program execution' },
            { icon: '🧮', title: 'Expression Evaluation', desc: 'Parsing mathematical expressions, parentheses matching' },
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
              'O(1) push and pop operations',
              'Simple implementation',
              'Memory efficient (no gaps)',
              'Natural for recursion/backtracking',
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
              'No random access to elements',
              'O(n) search time',
              'Limited access (only top)',
              'Potential stack overflow',
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
              The power of a stack lies in its <strong className="text-yellow-400">restricted access pattern</strong>.
              By only allowing operations at the top, stacks naturally handle
              <code className="bg-background-primary px-2 py-1 rounded text-blue-400 mx-1">nested structures</code>
              like function calls, balanced parentheses, and recursive algorithms. When you need to
              "remember" something to come back to later, think stack!
            </p>
          </div>
        </div>
      </Panel>

      {/* Programming Examples */}
      <Panel title="Programming Use Cases">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white">Function Call Stack</h4>
              <p className="text-sm text-neutral-400">Every function call pushes a frame; returning pops it</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 text-purple-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white">DFS (Depth-First Search)</h4>
              <p className="text-sm text-neutral-400">Explores as deep as possible before backtracking</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 text-green-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white">Syntax Parsing</h4>
              <p className="text-sm text-neutral-400">Compilers use stacks to match brackets and parse expressions</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 text-orange-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white">Backtracking Algorithms</h4>
              <p className="text-sm text-neutral-400">Maze solving, puzzle solving, game AI decisions</p>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export default StackOverview;
