import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { IAnimationState, IAnimationStep } from '@/core/interfaces';

interface PlaybackStore {
  animationState: IAnimationState;
  setAnimationState: (state: IAnimationState) => void;
  isAnimating: boolean;
  currentStep: IAnimationStep | null;
}

const initialAnimationState: IAnimationState = {
  status: 'idle',
  steps: [],
  currentStepIndex: 0,
  speed: 1,
  mode: 'auto',
  progress: 0,
  totalDuration: 0,
  elapsedTime: 0,
};

export const usePlaybackStore = create<PlaybackStore>()(
  subscribeWithSelector((set) => ({
    animationState: initialAnimationState,

    setAnimationState: (state) =>
      set({
        animationState: state,
        isAnimating: state.status === 'playing',
        currentStep: state.steps[state.currentStepIndex] ?? null,
      }),

    isAnimating: false,
    currentStep: null,
  }))
);
