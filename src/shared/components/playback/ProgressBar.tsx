import { usePlaybackStore } from '@/stores/playbackStore';
import { cn } from '@/shared/utils';

interface ProgressBarProps {
  className?: string;
  onSeek?: (stepIndex: number) => void;
}

export function ProgressBar({ className, onSeek }: ProgressBarProps) {
  const { steps, currentStepIndex, progress } = usePlaybackStore(
    (s) => s.animationState
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onSeek || steps.length === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const stepIndex = Math.floor(percentage * steps.length);
    onSeek(Math.min(Math.max(0, stepIndex), steps.length - 1));
  };

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div
        className="relative h-2 bg-background-tertiary rounded-full cursor-pointer overflow-hidden"
        onClick={handleClick}
      >
        <div
          className="absolute inset-y-0 left-0 bg-blue-600 rounded-full transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
        {/* Step markers */}
        {steps.length > 0 && steps.length <= 20 && (
          <div className="absolute inset-0 flex justify-between px-0.5">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  'w-0.5 h-full',
                  idx <= currentStepIndex ? 'bg-blue-400/50' : 'bg-neutral-600/50'
                )}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-between text-xs text-neutral-500">
        <span>Step {currentStepIndex + 1}</span>
        <span>{steps.length} total</span>
      </div>
    </div>
  );
}
