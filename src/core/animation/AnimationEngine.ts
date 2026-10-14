import type {
  IAnimationStep,
  IAnimationState,
  PlaybackStatus,
  PlaybackMode,
} from '../interfaces';

export type AnimationStateListener = (state: IAnimationState) => void;

export class AnimationEngine {
  private steps: IAnimationStep[] = [];
  private currentIndex = 0;
  private speed = 1;
  private mode: PlaybackMode = 'auto';
  private status: PlaybackStatus = 'idle';
  private listeners: Set<AnimationStateListener> = new Set();
  private animationFrameId: number | null = null;
  private stepResolvers: Map<number, () => void> = new Map();
  private isPaused = false;
  private stepTimeoutId: ReturnType<typeof setTimeout> | null = null;

  subscribe(listener: AnimationStateListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  loadSteps(steps: IAnimationStep[]): void {
    this.steps = steps;
    this.currentIndex = 0;
    this.status = steps.length > 0 ? 'ready' : 'idle';
    this.emitState();
  }

  async play(): Promise<void> {
    if (this.steps.length === 0) return;

    this.isPaused = false;
    this.status = 'playing';
    this.emitState();

    while (this.currentIndex < this.steps.length && !this.isPaused) {
      const step = this.steps[this.currentIndex];
      if (!step) break;

      await this.executeStep(step);

      if (this.isPaused) break;

      if (this.mode === 'step' && step.isPausePoint) {
        this.status = 'stepping';
        this.emitState();
        await this.waitForStepContinue();
        if (this.isPaused) break;
      }

      this.currentIndex++;
      this.emitState();
    }

    if (!this.isPaused && this.currentIndex >= this.steps.length) {
      this.status = 'complete';
      this.emitState();
    }
  }

  private executeStep(step: IAnimationStep): Promise<void> {
    return new Promise((resolve) => {
      const duration = step.baseDuration / this.speed;
      this.stepTimeoutId = setTimeout(() => {
        this.stepTimeoutId = null;
        resolve();
      }, duration);
    });
  }

  pause(): void {
    this.isPaused = true;
    if (this.stepTimeoutId) {
      clearTimeout(this.stepTimeoutId);
      this.stepTimeoutId = null;
    }
    this.status = 'paused';
    this.emitState();
  }

  resume(): void {
    if (this.status === 'paused') {
      this.play();
    }
  }

  stop(): void {
    this.isPaused = true;
    if (this.stepTimeoutId) {
      clearTimeout(this.stepTimeoutId);
      this.stepTimeoutId = null;
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.currentIndex = 0;
    this.status = this.steps.length > 0 ? 'ready' : 'idle';
    this.stepResolvers.clear();
    this.emitState();
  }

  stepForward(): void {
    const resolver = this.stepResolvers.get(this.currentIndex);
    if (resolver) {
      resolver();
      this.stepResolvers.delete(this.currentIndex);
      return;
    }

    if (this.currentIndex < this.steps.length - 1) {
      this.currentIndex++;
      this.status = 'stepping';
      this.emitState();
    }
  }

  stepBack(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.status = 'stepping';
      this.emitState();
    }
  }

  goToStep(index: number): void {
    if (index >= 0 && index < this.steps.length) {
      this.currentIndex = index;
      this.status = 'stepping';
      this.emitState();
    }
  }

  setSpeed(speed: number): void {
    this.speed = Math.max(0.25, Math.min(4, speed));
    this.emitState();
  }

  setMode(mode: PlaybackMode): void {
    this.mode = mode;
    this.emitState();
  }

  reset(): void {
    this.stop();
    this.steps = [];
    this.status = 'idle';
    this.emitState();
  }

  private waitForStepContinue(): Promise<void> {
    return new Promise((resolve) => {
      this.stepResolvers.set(this.currentIndex, resolve);
    });
  }

  getState(): IAnimationState {
    return {
      status: this.status,
      steps: this.steps,
      currentStepIndex: this.currentIndex,
      speed: this.speed,
      mode: this.mode,
      progress:
        this.steps.length > 0
          ? (this.currentIndex / this.steps.length) * 100
          : 0,
      totalDuration: this.calculateTotalDuration(),
      elapsedTime: this.calculateElapsedTime(),
    };
  }

  private calculateTotalDuration(): number {
    return this.steps.reduce((sum, step) => sum + step.baseDuration, 0);
  }

  private calculateElapsedTime(): number {
    return this.steps
      .slice(0, this.currentIndex)
      .reduce((sum, step) => sum + step.baseDuration, 0);
  }

  private emitState(): void {
    const state = this.getState();
    this.listeners.forEach((listener) => listener(state));
  }

  get currentStep(): IAnimationStep | null {
    return this.steps[this.currentIndex] ?? null;
  }
}

// Singleton instance
export const animationEngine = new AnimationEngine();
