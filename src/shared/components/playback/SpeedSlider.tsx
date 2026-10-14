import { SPEED_PRESETS } from '@/core/animation';
import { cn } from '@/shared/utils';

interface SpeedSliderProps {
  speed: number;
  onChange: (speed: number) => void;
  className?: string;
}

export function SpeedSlider({ speed, onChange, className }: SpeedSliderProps) {

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className="text-xs text-neutral-400 w-8">Speed</span>
      <div className="flex items-center gap-2">
        {SPEED_PRESETS.map((preset) => (
          <button
            key={preset}
            onClick={() => onChange(preset)}
            className={cn(
              'px-2 py-1 text-xs font-mono rounded transition-colors',
              speed === preset
                ? 'bg-blue-600 text-white'
                : 'bg-background-tertiary text-neutral-400 hover:text-white'
            )}
          >
            {preset}x
          </button>
        ))}
      </div>
    </div>
  );
}
