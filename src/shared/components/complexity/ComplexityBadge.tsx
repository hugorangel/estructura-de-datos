import { cn } from '@/shared/utils';
import type { BigONotation } from '@/core/interfaces';

interface ComplexityBadgeProps {
  complexity: BigONotation;
  label?: string;
  className?: string;
}

const complexityColors: Record<BigONotation, string> = {
  'O(1)': 'text-green-500 border-green-500/50 bg-green-500/10',
  'O(log n)': 'text-emerald-500 border-emerald-500/50 bg-emerald-500/10',
  'O(n)': 'text-yellow-500 border-yellow-500/50 bg-yellow-500/10',
  'O(n log n)': 'text-orange-500 border-orange-500/50 bg-orange-500/10',
  'O(n²)': 'text-red-500 border-red-500/50 bg-red-500/10',
  'O(2ⁿ)': 'text-red-600 border-red-600/50 bg-red-600/10',
};

export function ComplexityBadge({
  complexity,
  label,
  className,
}: ComplexityBadgeProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {label && <span className="text-xs text-neutral-500">{label}</span>}
      <span
        className={cn(
          'px-2 py-0.5 rounded border font-mono text-xs',
          complexityColors[complexity]
        )}
      >
        {complexity}
      </span>
    </div>
  );
}
