import { cn } from '@/shared/utils';
import type { IComplexityInfo, BigONotation } from '@/core/interfaces';

interface ComplexityTableProps {
  complexity: IComplexityInfo;
  className?: string;
}

const complexityColors: Record<BigONotation, string> = {
  'O(1)': 'text-green-500 bg-green-500/10',
  'O(log n)': 'text-emerald-500 bg-emerald-500/10',
  'O(n)': 'text-yellow-500 bg-yellow-500/10',
  'O(n log n)': 'text-orange-500 bg-orange-500/10',
  'O(n²)': 'text-red-500 bg-red-500/10',
  'O(2ⁿ)': 'text-red-600 bg-red-600/10',
};

export function ComplexityTable({ complexity, className }: ComplexityTableProps) {
  const operations = ['access', 'search', 'insert', 'delete'];
  const cases = ['best', 'average', 'worst'] as const;

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border-default">
            <th className="text-left py-3 px-4 text-neutral-400 font-medium">
              Operation
            </th>
            {cases.map((c) => (
              <th
                key={c}
                className="text-left py-3 px-4 text-neutral-400 font-medium capitalize"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {operations.map((op) => (
            <tr key={op} className="border-b border-border-default/50">
              <td className="py-3 px-4 font-medium text-white capitalize">
                {op}
              </td>
              {cases.map((c) => {
                const entry = complexity[c]?.[op];
                if (!entry) return <td key={c} className="py-3 px-4">-</td>;
                return (
                  <td key={c} className="py-3 px-4">
                    <span
                      className={cn(
                        'inline-block px-2 py-1 rounded font-mono text-xs',
                        complexityColors[entry.time]
                      )}
                    >
                      {entry.time}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Space complexity */}
      <div className="mt-4 flex items-center gap-2">
        <span className="text-neutral-400 text-sm">Space Complexity:</span>
        <span
          className={cn(
            'inline-block px-2 py-1 rounded font-mono text-xs',
            complexityColors[complexity.space]
          )}
        >
          {complexity.space}
        </span>
      </div>
    </div>
  );
}
