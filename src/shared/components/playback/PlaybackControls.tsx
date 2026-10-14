import {
  Play,
  Pause,
  RotateCcw,
  StepBack,
  StepForward
} from 'lucide-react';
import { Button } from '../ui/Button';
import { usePlaybackStore } from '@/stores/playbackStore';
import { cn } from '@/shared/utils';

interface PlaybackControlsProps {
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onStepForward: () => void;
  onStepBack: () => void;
  className?: string;
}

export function PlaybackControls({
  onPlay,
  onPause,
  onStop,
  onStepForward,
  onStepBack,
  className,
}: PlaybackControlsProps) {
  const { status, steps, currentStepIndex } = usePlaybackStore(
    (s) => s.animationState
  );

  const isPlaying = status === 'playing';
  const canStepBack = currentStepIndex > 0;
  const canStepForward = currentStepIndex < steps.length - 1;
  const hasSteps = steps.length > 0;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={onStop}
        disabled={!hasSteps}
        title="Reset"
      >
        <RotateCcw className="w-4 h-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onStepBack}
        disabled={!canStepBack}
        title="Step Back"
      >
        <StepBack className="w-4 h-4" />
      </Button>

      <Button
        variant="primary"
        size="md"
        onClick={isPlaying ? onPause : onPlay}
        disabled={!hasSteps}
        className="px-6"
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onStepForward}
        disabled={!canStepForward}
        title="Step Forward"
      >
        <StepForward className="w-4 h-4" />
      </Button>
    </div>
  );
}
