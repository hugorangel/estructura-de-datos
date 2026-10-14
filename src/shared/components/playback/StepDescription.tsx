import { usePlaybackStore } from '@/stores/playbackStore';
import { cn } from '@/shared/utils';

interface StepDescriptionProps {
  className?: string;
}

export function StepDescription({ className }: StepDescriptionProps) {
  const currentStep = usePlaybackStore((s) => s.currentStep);
  const status = usePlaybackStore((s) => s.animationState.status);

  if (!currentStep && status === 'idle') {
    return (
      <div className={cn('text-center text-neutral-500 text-sm py-4', className)}>
        Select an operation to begin
      </div>
    );
  }

  if (!currentStep) {
    return (
      <div className={cn('text-center text-neutral-500 text-sm py-4', className)}>
        Ready to start
      </div>
    );
  }

  const typeColors: Record<string, string> = {
    highlight: 'text-yellow-500',
    compare: 'text-orange-500',
    swap: 'text-purple-500',
    insert: 'text-green-500',
    delete: 'text-red-500',
    move: 'text-blue-500',
    traverse: 'text-blue-400',
    found: 'text-green-400',
    'not-found': 'text-red-400',
    complete: 'text-green-500',
  };

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 bg-background-tertiary rounded-lg',
        className
      )}
    >
      <span
        className={cn(
          'text-xs font-mono uppercase px-2 py-0.5 rounded',
          'bg-background-secondary',
          typeColors[currentStep.type] || 'text-neutral-400'
        )}
      >
        {currentStep.type}
      </span>
      <span className="text-sm text-neutral-200">{currentStep.description}</span>
    </div>
  );
}
