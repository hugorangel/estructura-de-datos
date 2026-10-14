import { useCallback, useRef, useEffect } from 'react';
import { usePlaybackStore } from '@/stores/playbackStore';
import { AnimationEngine } from './AnimationEngine';

export function usePlayback() {
  const engineRef = useRef<AnimationEngine | null>(null);
  const animationState = usePlaybackStore((s) => s.animationState);
  const setAnimationState = usePlaybackStore((s) => s.setAnimationState);

  useEffect(() => {
    if (!engineRef.current) {
      engineRef.current = new AnimationEngine();
      engineRef.current.subscribe(setAnimationState);
    }
  }, [setAnimationState]);

  const play = useCallback(() => {
    engineRef.current?.play();
  }, []);

  const pause = useCallback(() => {
    engineRef.current?.pause();
  }, []);

  const resume = useCallback(() => {
    engineRef.current?.resume();
  }, []);

  const stop = useCallback(() => {
    engineRef.current?.stop();
  }, []);

  const togglePlayPause = useCallback(() => {
    if (!engineRef.current) return;
    const status = animationState.status;
    if (status === 'playing') {
      engineRef.current.pause();
    } else if (status === 'paused' || status === 'ready' || status === 'stepping') {
      engineRef.current.play();
    }
  }, [animationState.status]);

  return {
    play,
    pause,
    resume,
    stop,
    togglePlayPause,
    isPlaying: animationState.status === 'playing',
    isPaused: animationState.status === 'paused',
    isComplete: animationState.status === 'complete',
    isIdle: animationState.status === 'idle',
    isReady: animationState.status === 'ready',
    engine: engineRef.current,
  };
}
