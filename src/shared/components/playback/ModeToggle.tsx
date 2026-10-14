import { Toggle } from '../ui/Toggle';
import type { PlaybackMode } from '@/core/interfaces';

interface ModeToggleProps {
  mode: PlaybackMode;
  onChange: (mode: PlaybackMode) => void;
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-neutral-400">Auto</span>
      <Toggle
        checked={mode === 'step'}
        onChange={(checked) => onChange(checked ? 'step' : 'auto')}
      />
      <span className="text-xs text-neutral-400">Step</span>
    </div>
  );
}
