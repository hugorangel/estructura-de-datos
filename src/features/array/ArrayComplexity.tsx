import { Panel } from '@/shared/components/ui';
import { ComplexityTable } from '@/shared/components/complexity';
import { arrayConfig } from './config';
import { Info } from 'lucide-react';

export function ArrayComplexity() {
  return (
    <div className="space-y-6">
      <Panel title="Time & Space Complexity">
        <ComplexityTable complexity={arrayConfig.complexity} />
      </Panel>

      {/* Detailed explanations */}
      <Panel title="Operation Details">
        <div className="space-y-6">
          {/* Access */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Access - O(1)
            </h4>
            <p className="text-sm text-neutral-400 mb-2">
              Direct memory access using index calculation. The address is computed as:
            </p>
            <code className="block bg-background-primary px-3 py-2 rounded text-sm font-mono text-blue-400">
              address = baseAddress + (index × elementSize)
            </code>
          </div>

          {/* Search */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              Search - O(n)
            </h4>
            <p className="text-sm text-neutral-400">
              Linear search requires checking each element sequentially until the target is found
              or the end is reached. In the worst case, all n elements must be examined.
            </p>
          </div>

          {/* Insert */}
          <div className="border-b border-border-default pb-4">
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              Insert - O(n)
            </h4>
            <p className="text-sm text-neutral-400">
              Inserting at position i requires shifting all elements from i to n-1 one position
              to the right. Inserting at the end is O(1) amortized (when no resize needed).
            </p>
          </div>

          {/* Delete */}
          <div>
            <h4 className="font-medium text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              Delete - O(n)
            </h4>
            <p className="text-sm text-neutral-400">
              Deleting at position i requires shifting all elements from i+1 to n-1 one position
              to the left. Deleting from the end is O(1).
            </p>
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
            <h4 className="font-medium text-white mb-2">When to Use Arrays</h4>
            <ul className="text-sm text-neutral-400 space-y-1">
              <li>• You need fast random access by index</li>
              <li>• The size is known or changes infrequently</li>
              <li>• Memory locality is important for performance</li>
              <li>• Insertions/deletions are rare or happen at the end</li>
            </ul>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export default ArrayComplexity;
