import { useCallback, useRef, useEffect } from 'react';
import { usePlaybackStore } from '@/stores/playbackStore';
import { AnimationEngine } from './AnimationEngine';

export function useStepping() {
  const engineRef = useRef<AnimationEngine | null>(null);
  const animationState = usePlaybackStore((s) => s.animationState);
  const setAnimationState = usePlaybackStore((s) => s.setAnimationState);

  useEffect(() => {
    if (!engineRef.current) {
      engineRef.current = new AnimationEngine();
      engineRef.current.subscribe(setAnimationState);
    }
  }, [setAnimationState]);

  const stepForward = useCallback(() => {
    engineRef.current?.stepForward();
  }, []);

  const stepBack = useCallback(() => {
    engineRef.current?.stepBack();
  }, []);

  const goToStep = useCallback((index: number) => {
    engineRef.current?.goToStep(index);
  }, []);

  return {
    stepForward,
    stepBack,
    goToStep,
    currentStep: animationState.currentStepIndex,
    totalSteps: animationState.steps.length,
    currentStepData: animationState.steps[animationState.currentStepIndex] ?? null,
    canStepForward: animationState.currentStepIndex < animationState.steps.length - 1,
    canStepBack: animationState.currentStepIndex > 0,
  };
}
