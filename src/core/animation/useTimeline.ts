import { useCallback, useEffect, useRef } from 'react';
import { AnimationEngine } from './AnimationEngine';
import { usePlaybackStore } from '@/stores/playbackStore';
import type { IAnimationStep } from '../interfaces';

export function useTimeline() {
  const engineRef = useRef<AnimationEngine | null>(null);
  const setAnimationState = usePlaybackStore((s) => s.setAnimationState);

  useEffect(() => {
    if (!engineRef.current) {
      engineRef.current = new AnimationEngine();
    }

    const unsubscribe = engineRef.current.subscribe(setAnimationState);
    return () => unsubscribe();
  }, [setAnimationState]);

  const loadAnimation = useCallback((steps: IAnimationStep[]) => {
    engineRef.current?.loadSteps(steps);
  }, []);

  const clearAnimation = useCallback(() => {
    engineRef.current?.reset();
  }, []);

  return {
    loadAnimation,
    clearAnimation,
    engine: engineRef.current,
  };
}
