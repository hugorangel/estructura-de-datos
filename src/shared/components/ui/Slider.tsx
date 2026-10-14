import { cn } from '@/shared/utils';

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
  className?: string;
  disabled?: boolean;
}

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  formatValue = (v) => String(v),
  className,
  disabled = false,
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="text-neutral-300">{label}</span>}
          {showValue && (
            <span className="text-neutral-400 font-mono">
              {formatValue(value)}
            </span>
          )}
        </div>
      )}
      <div className="relative h-2">
        <div className="absolute inset-0 bg-background-tertiary rounded-full" />
        <div
          className="absolute inset-y-0 left-0 bg-blue-600 rounded-full"
          style={{ width: `${percentage}%` }}
        />
        <input
          type="range"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={cn(
            'absolute inset-0 w-full h-full opacity-0 cursor-pointer',
            disabled && 'cursor-not-allowed'
          )}
        />
        <div
          className={cn(
            'absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg',
            'transition-transform duration-150',
            !disabled && 'hover:scale-110',
            disabled && 'opacity-50'
          )}
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>
    </div>
  );
}
