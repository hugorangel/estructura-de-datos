import { Panel } from '@/shared/components/ui';
import { ComplexityTable } from '@/shared/components/complexity';
import { hashTableConfig } from './config';
import { Info, TrendingUp, TrendingDown } from 'lucide-react';

export function HashTableComplexity() {
  return (
    <div className="space-y-6">
      <Panel title="Time & Space Complexity">
        <ComplexityTable complexity={hashTableConfig.complexity} />
      </Panel>

      {/* Load Factor Impact */}
      <Panel title="Load Factor vs Performance">
        <div className="space-y-4">
          <p className="text-sm text-neutral-400">
            The <strong className="text-white">load factor</strong> (n/m) directly impacts performance.
            Higher load factor means more collisions and longer chains.
          </p>

          <div className="bg-background-primary rounded-lg p-4">
            <div className="flex items-end justify-between h-32 px-4">
              {[0.1, 0.25, 0.5, 0.75, 1.0, 1.5, 2.0].map((lf) => {
                const height = Math.min(100, lf * 50 + 10);
                const color = lf <= 0.5 ? 'bg-green-500' : lf <= 0.75 ? 'bg-yellow-500' : 'bg-red-500';
                return (
                  <div key={lf} className="flex flex-col items-center">
                    <div
                      className={`w-8 ${color} rounded-t transition-all`}
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-neutral-500 mt-2">{lf}</span>
                  </div>
                );
              })}
            </div>
            <div className="text-center text-xs text-neutral-500 mt-4">
              Load Factor → Expected Chain Length
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <TrendingDown className="w-4 h-4 text-green-500 mt-0.5" />
              <div>
                <span className="text-white">Low load factor (&lt;0.5)</span>
                <p className="text-neutral-500">Fewer collisions, more memory used</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-red-500 mt-0.5" />
              <div>
                <span className="text-white">High load factor (&gt;0.75)</span>
                <p className="text-neutral-500">More collisions, approaches O(n)</p>
              </div>
            </div>
          </div>
        </div>
      </Panel>

      {/* Detailed explanations */}
      <Panel title="Operation Details">
        <div className="space-y-6">
          {/* Insert */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Insert - O(1) average
            </h4>
            <p className="text-sm text-neutral-400 mb-2">
              Hash the key, go to bucket, add to chain head (or update if key exists).
            </p>
            <div className="text-xs text-neutral-500">
              <span className="text-yellow-400">Worst case O(n):</span> All keys hash to same bucket
            </div>
          </div>

          {/* Search */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Search - O(1) average
            </h4>
            <p className="text-sm text-neutral-400 mb-2">
              Hash the key, go to bucket, traverse chain to find matching key.
            </p>
            <div className="text-xs text-neutral-500">
              <span className="text-yellow-400">Worst case O(n):</span> Key at end of longest chain
            </div>
          </div>

          {/* Delete */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Delete - O(1) average
            </h4>
            <p className="text-sm text-neutral-400 mb-2">
              Same as search, then remove node from chain.
            </p>
            <div className="text-xs text-neutral-500">
              <span className="text-yellow-400">Worst case O(n):</span> Same as search worst case
            </div>
          </div>

          {/* Hash Function */}
          <div>
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              Hash Function - O(k)
            </h4>
            <p className="text-sm text-neutral-400">
              Where k is the key length. For fixed-size keys, this is effectively O(1).
              The hash function iterates through each character of the key.
            </p>
          </div>
        </div>
      </Panel>

      {/* Comparison with other structures */}
      <Panel title="Comparison with Other Structures">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-default">
                <th className="text-left py-2 text-neutral-400 font-medium">Operation</th>
                <th className="text-center py-2 text-neutral-400 font-medium">Hash Table</th>
                <th className="text-center py-2 text-neutral-400 font-medium">BST (balanced)</th>
                <th className="text-center py-2 text-neutral-400 font-medium">Array</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-default/50">
                <td className="py-2 text-neutral-300">Search</td>
                <td className="text-center py-2 text-green-400">O(1)</td>
                <td className="text-center py-2 text-yellow-400">O(log n)</td>
                <td className="text-center py-2 text-red-400">O(n)</td>
              </tr>
              <tr className="border-b border-border-default/50">
                <td className="py-2 text-neutral-300">Insert</td>
                <td className="text-center py-2 text-green-400">O(1)</td>
                <td className="text-center py-2 text-yellow-400">O(log n)</td>
                <td className="text-center py-2 text-red-400">O(n)</td>
              </tr>
              <tr className="border-b border-border-default/50">
                <td className="py-2 text-neutral-300">Delete</td>
                <td className="text-center py-2 text-green-400">O(1)</td>
                <td className="text-center py-2 text-yellow-400">O(log n)</td>
                <td className="text-center py-2 text-red-400">O(n)</td>
              </tr>
              <tr>
                <td className="py-2 text-neutral-300">Ordered iteration</td>
                <td className="text-center py-2 text-red-400">O(n log n)</td>
                <td className="text-center py-2 text-green-400">O(n)</td>
                <td className="text-center py-2 text-green-400">O(n)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Panel>

      {/* When to use */}
      <Panel>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <Info className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">When to Use Hash Tables</h4>
            <ul className="text-sm text-neutral-400 space-y-1">
              <li>- You need fast lookup by key (not index)</li>
              <li>- Key ordering is not important</li>
              <li>- You have a good hash function for your keys</li>
              <li>- Memory usage is not critical constraint</li>
            </ul>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export default HashTableComplexity;
