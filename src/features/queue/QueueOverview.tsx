import { Panel } from '@/shared/components/ui';
import { CheckCircle, XCircle, Lightbulb, Code } from 'lucide-react';

export function QueueOverview() {
  return (
    <div className="space-y-6">
      {/* What is a Queue */}
      <Panel title="What is a Queue?">
        <div className="space-y-4 text-neutral-300">
          <p>
            A <strong className="text-white">queue</strong> is a linear data structure that follows the
            <strong className="text-blue-400"> FIFO (First-In-First-Out)</strong> principle. Elements are
            added at one end (rear) and removed from the other end (front), just like a line of people
            waiting for service.
          </p>
          <div className="bg-background-primary rounded-lg p-4 font-mono text-sm">
            <div className="text-neutral-500">// Queue operations</div>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <span className="text-green-400">FRONT</span>
                <span className="text-neutral-600">-&gt;</span>
              </div>
              <div className="flex gap-1">
                {[15, 28, 42, 33].map((val, i) => (
                  <div key={i} className="w-10 h-10 bg-background-tertiary border border-border-default rounded flex items-center justify-center text-blue-400">
                    {val}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neutral-600">&lt;-</span>
                <span className="text-blue-400">REAR</span>
              </div>
            </div>
            <div className="text-xs text-neutral-500 mt-2">
              Dequeue from front | Enqueue at rear
            </div>
          </div>
        </div>
      </Panel>

      {/* Real-World Examples */}
      <Panel title="Real-World Examples">
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: '🖨️', title: 'Printer Queue', desc: 'Print jobs are processed in the order received' },
            { icon: '🎫', title: 'Ticket Line', desc: 'First person in line gets served first' },
            { icon: '🔍', title: 'BFS Algorithm', desc: 'Breadth-first search uses a queue to explore nodes level by level' },
            { icon: '📨', title: 'Message Queues', desc: 'RabbitMQ, Kafka process messages in order' },
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
              'O(1) enqueue and dequeue',
              'Maintains insertion order',
              'Fair processing (FIFO)',
              'Simple and intuitive concept',
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
              'Can only access front element',
              'O(n) search operation',
              'Fixed size in array implementation',
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
              The queue&apos;s <strong className="text-yellow-400">FIFO property</strong> ensures fairness
              in processing. Unlike a stack where the most recent item is processed first, a queue guarantees
              that items are processed in the exact order they arrived. This makes queues essential for
              scenarios requiring <strong className="text-yellow-400">ordered processing</strong> like
              task scheduling, request handling, and event systems.
            </p>
          </div>
        </div>
      </Panel>

      {/* Queue Variants */}
      <Panel title="Queue Variants">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white">Circular Queue</h4>
              <p className="text-sm text-neutral-400">Wraps around to reuse empty space at the front</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 text-purple-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white">Priority Queue</h4>
              <p className="text-sm text-neutral-400">Elements are dequeued based on priority, not arrival order</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 text-green-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white">Double-Ended Queue (Deque)</h4>
              <p className="text-sm text-neutral-400">Elements can be added or removed from both ends</p>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export default QueueOverview;
