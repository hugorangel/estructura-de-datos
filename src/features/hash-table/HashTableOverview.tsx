import { Panel } from '@/shared/components/ui';
import { CheckCircle, XCircle, Lightbulb, Code, AlertTriangle } from 'lucide-react';

export function HashTableOverview() {
  return (
    <div className="space-y-6">
      {/* What is a Hash Table */}
      <Panel title="What is a Hash Table?">
        <div className="space-y-4 text-neutral-300">
          <p>
            A <strong className="text-white">hash table</strong> (also called hash map or dictionary) is a
            data structure that implements an <strong className="text-blue-400">associative array</strong>,
            mapping keys to values. It uses a <strong className="text-purple-400">hash function</strong> to
            compute an index into an array of buckets, from which the desired value can be found.
          </p>
          <div className="bg-background-primary rounded-lg p-4 font-mono text-sm">
            <div className="text-neutral-500">// Hash function concept</div>
            <div className="mt-2 space-y-1">
              <div><span className="text-green-400">"apple"</span> → <span className="text-purple-400">hash()</span> → <span className="text-yellow-400">3</span> → bucket[3]</div>
              <div><span className="text-green-400">"banana"</span> → <span className="text-purple-400">hash()</span> → <span className="text-yellow-400">7</span> → bucket[7]</div>
              <div><span className="text-green-400">"cherry"</span> → <span className="text-purple-400">hash()</span> → <span className="text-yellow-400">3</span> → bucket[3] <span className="text-orange-400">(collision!)</span></div>
            </div>
          </div>
        </div>
      </Panel>

      {/* Hash Function */}
      <Panel title="The Hash Function">
        <div className="space-y-4 text-neutral-300">
          <p>
            A <strong className="text-purple-400">hash function</strong> converts a key into an array index.
            A good hash function should:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">1.</span>
              <span><strong className="text-white">Be deterministic</strong> - same key always produces same hash</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">2.</span>
              <span><strong className="text-white">Distribute uniformly</strong> - spread keys evenly across buckets</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">3.</span>
              <span><strong className="text-white">Be fast to compute</strong> - O(k) where k is key length</span>
            </li>
          </ul>
          <div className="bg-background-primary rounded-lg p-4 font-mono text-sm">
            <div className="text-neutral-500">// Simple hash function example</div>
            <div className="text-blue-400 mt-2">
              hash = (hash × 31 + charCode) % bucketCount
            </div>
          </div>
        </div>
      </Panel>

      {/* Collision Resolution */}
      <Panel title="Collision Resolution">
        <div className="space-y-4">
          <p className="text-neutral-300">
            When two keys hash to the same bucket, we have a <strong className="text-orange-400">collision</strong>.
            Two main strategies exist:
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background-primary rounded-lg p-4">
              <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                Chaining (Separate Chaining)
              </h4>
              <p className="text-sm text-neutral-400 mb-3">
                Each bucket contains a linked list of entries. Collisions are added to the list.
              </p>
              <div className="font-mono text-xs space-y-1">
                <div>bucket[3] → [apple:5] → [cherry:8] → null</div>
              </div>
            </div>
            <div className="bg-background-primary rounded-lg p-4">
              <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Open Addressing (Linear Probing)
              </h4>
              <p className="text-sm text-neutral-400 mb-3">
                If bucket is occupied, check the next bucket sequentially until empty one found.
              </p>
              <div className="font-mono text-xs space-y-1">
                <div>bucket[3] = apple, bucket[4] = cherry</div>
              </div>
            </div>
          </div>
        </div>
      </Panel>

      {/* Why O(1) */}
      <Panel title="Why O(1) Average Time?">
        <div className="space-y-4 text-neutral-300">
          <p>
            Hash tables achieve <strong className="text-green-400">O(1) average</strong> time because:
          </p>
          <ol className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs">1</span>
              <span>Computing the hash takes O(k) where k is key length (constant for fixed-size keys)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs">2</span>
              <span>Array access by index is O(1)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs">3</span>
              <span>With a good hash function and load factor &lt; 1, chains are short (expected length ~1)</span>
            </li>
          </ol>
        </div>
      </Panel>

      {/* Load Factor */}
      <Panel title="Load Factor & Rehashing">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Load Factor = n / m</h4>
              <p className="text-sm text-neutral-400">
                Where n = number of entries, m = number of buckets. When load factor exceeds a threshold
                (typically 0.75), the table is <strong className="text-yellow-400">rehashed</strong>:
                bucket count doubles and all entries are re-inserted.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-background-primary rounded-lg p-3">
              <div className="text-2xl font-mono text-green-400">0.5</div>
              <div className="text-xs text-neutral-500 mt-1">Good: Fast operations</div>
            </div>
            <div className="bg-background-primary rounded-lg p-3">
              <div className="text-2xl font-mono text-yellow-400">0.75</div>
              <div className="text-xs text-neutral-500 mt-1">Threshold: Consider rehash</div>
            </div>
            <div className="bg-background-primary rounded-lg p-3">
              <div className="text-2xl font-mono text-red-400">1.0+</div>
              <div className="text-xs text-neutral-500 mt-1">High: Many collisions</div>
            </div>
          </div>
        </div>
      </Panel>

      {/* Advantages & Disadvantages */}
      <div className="grid grid-cols-2 gap-4">
        <Panel title="Advantages">
          <ul className="space-y-3">
            {[
              'O(1) average for insert, search, delete',
              'Flexible keys (strings, objects)',
              'Dynamic size with rehashing',
              'Efficient for large datasets',
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
              'O(n) worst case (all collisions)',
              'No ordering of keys',
              'Poor cache locality',
              'Space overhead for buckets',
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
              The power of hash tables comes from <strong className="text-yellow-400">trading space for time</strong>.
              By maintaining extra bucket space and a good hash function, we achieve near-constant time operations.
              The hash function is the "magic" that converts any key into a direct array index.
            </p>
          </div>
        </div>
      </Panel>

      {/* Real-world Examples */}
      <Panel title="Real-World Applications">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white">Dictionaries & Maps</h4>
              <p className="text-sm text-neutral-400">JavaScript objects, Python dicts, Java HashMap</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 text-purple-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white">Caches</h4>
              <p className="text-sm text-neutral-400">Memoization, LRU cache, browser cache</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 text-green-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white">Database Indexes</h4>
              <p className="text-sm text-neutral-400">Hash indexes for equality lookups</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 text-orange-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white">Symbol Tables</h4>
              <p className="text-sm text-neutral-400">Compilers use hash tables for variable lookup</p>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export default HashTableOverview;
