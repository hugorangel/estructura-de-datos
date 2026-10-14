import { useCallback, useRef, useEffect } from 'react';
import { usePlaybackStore } from '@/stores/playbackStore';
import { useUIStore } from '@/stores/uiStore';
import { AnimationEngine } from './AnimationEngine';

export const SPEED_PRESETS = [0.25, 0.5, 1, 1.5, 2, 4] as const;

export function useSpeedControl() {
  const engineRef = useRef<AnimationEngine | null>(null);
  const animationState = usePlaybackStore((s) => s.animationState);
  const setAnimationState = usePlaybackStore((s) => s.setAnimationState);
  const setPreferredSpeed = useUIStore((s) => s.setPreferredSpeed);

  useEffect(() => {
    if (!engineRef.current) {
      engineRef.current = new AnimationEngine();
      engineRef.current.subscribe(setAnimationState);
    }
  }, [setAnimationState]);

  const setSpeed = useCallback(
    (speed: number) => {
      engineRef.current?.setSpeed(speed);
      setPreferredSpeed(speed);
    },
    [setPreferredSpeed]
  );

  const increaseSpeed = useCallback(() => {
    const currentSpeed = animationState.speed;
    const idx = SPEED_PRESETS.findIndex((s) => s >= currentSpeed);
    if (idx < SPEED_PRESETS.length - 1) {
      const nextSpeed = SPEED_PRESETS[idx + 1];
      if (nextSpeed !== undefined) {
        setSpeed(nextSpeed);
      }
    }
  }, [animationState.speed, setSpeed]);

  const decreaseSpeed = useCallback(() => {
    const currentSpeed = animationState.speed;
    const idx = SPEED_PRESETS.findIndex((s) => s >= currentSpeed);
    if (idx > 0) {
      const prevSpeed = SPEED_PRESETS[idx - 1];
      if (prevSpeed !== undefined) {
        setSpeed(prevSpeed);
      }
    }
  }, [animationState.speed, setSpeed]);

  return {
    speed: animationState.speed,
    setSpeed,
    increaseSpeed,
    decreaseSpeed,
    speedPresets: SPEED_PRESETS,
  };
}
