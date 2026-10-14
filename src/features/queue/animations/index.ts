import type { IAnimationStep, ElementVisualState } from '@/core/interfaces';
import type { QueueState } from '../config';
import { baseDurations } from '@/constants/animations';

export function createEnqueueAnimation(
  state: QueueState,
  value: number
): { newState: QueueState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const elements = [...state.elements];
  const insertIndex = elements.length;

  // Step 1: Highlight rear position
  steps.push({
    id: `enqueue-highlight-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Enqueuing ${value} at the rear of the queue`,
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 2: Element enters from the right
  steps.push({
    id: `enqueue-enter-${Date.now()}`,
    index: 1,
    type: 'insert',
    description: `Adding ${value} to the rear (index ${insertIndex})`,
    codeLine: 2,
    elements: [
      {
        elementId: `queue-element-${insertIndex}`,
        state: 'found' as ElementVisualState,
        motionProps: {
          initial: { x: 100, opacity: 0, scale: 0.5 },
          animate: { x: 0, opacity: 1, scale: 1 },
          transition: { type: 'spring', stiffness: 300, damping: 25 },
        },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 3: Complete
  steps.push({
    id: `enqueue-complete-${Date.now()}`,
    index: 2,
    type: 'complete',
    description: `Successfully enqueued ${value}. Queue size: ${elements.length + 1}`,
    codeLine: 4,
    elements: elements.map((_, i) => ({
      elementId: `queue-element-${i}`,
      state: 'default' as ElementVisualState,
      motionProps: {},
    })),
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  // Create new state
  const newElements = [...elements, value];

  return {
    newState: { elements: newElements },
    steps,
  };
}

export function createDequeueAnimation(
  state: QueueState
): { newState: QueueState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const elements = [...state.elements];
  const dequeuedValue = elements[0];

  // Step 1: Highlight front element
  steps.push({
    id: `dequeue-highlight-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Dequeuing element ${dequeuedValue} from the front`,
    codeLine: 1,
    elements: [
      {
        elementId: `queue-element-0`,
        state: 'deleting' as ElementVisualState,
        motionProps: {
          animate: { scale: 1.1 },
        },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 2: Element exits to the left
  steps.push({
    id: `dequeue-exit-${Date.now()}`,
    index: 1,
    type: 'delete',
    description: `Removing ${dequeuedValue} from the queue`,
    codeLine: 2,
    elements: [
      {
        elementId: `queue-element-0`,
        state: 'deleting' as ElementVisualState,
        motionProps: {
          animate: { x: -100, opacity: 0, scale: 0.5 },
          transition: { duration: 0.3 },
        },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: false,
  });

  // Step 3: Shift remaining elements
  for (let i = 1; i < elements.length; i++) {
    steps.push({
      id: `dequeue-shift-${i}-${Date.now()}`,
      index: steps.length,
      type: 'move',
      description: `Shifting element ${elements[i]} forward`,
      codeLine: 3,
      elements: [
        {
          elementId: `queue-element-${i}`,
          state: 'modified' as ElementVisualState,
          position: { from: { x: i * 70, y: 0 }, to: { x: (i - 1) * 70, y: 0 } },
          motionProps: {
            animate: { x: -70 },
            transition: { duration: 0.3 },
          },
        },
      ],
      baseDuration: baseDurations.fast,
      isPausePoint: false,
    });
  }

  // Step 4: Complete
  steps.push({
    id: `dequeue-complete-${Date.now()}`,
    index: steps.length,
    type: 'complete',
    description: `Dequeued ${dequeuedValue}. Queue size: ${elements.length - 1}`,
    codeLine: 5,
    elements: [],
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  // Create new state
  const newElements = elements.slice(1);

  return {
    newState: { elements: newElements },
    steps,
  };
}

export function createPeekAnimation(
  state: QueueState
): { newState: QueueState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const frontValue = state.elements[0];

  // Step 1: Identify front
  steps.push({
    id: `peek-start-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Peeking at the front element`,
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 2: Highlight front element
  steps.push({
    id: `peek-highlight-${Date.now()}`,
    index: 1,
    type: 'found',
    description: `Front element is ${frontValue}`,
    codeLine: 2,
    elements: [
      {
        elementId: `queue-element-0`,
        state: 'found' as ElementVisualState,
        motionProps: {
          animate: { scale: 1.15, y: -10 },
          transition: { type: 'spring', stiffness: 300 },
        },
      },
    ],
    baseDuration: baseDurations.slow,
    isPausePoint: true,
  });

  // Step 3: Complete (element stays in queue)
  steps.push({
    id: `peek-complete-${Date.now()}`,
    index: 2,
    type: 'complete',
    description: `Peek complete: front = ${frontValue} (element remains in queue)`,
    codeLine: 3,
    elements: [
      {
        elementId: `queue-element-0`,
        state: 'default' as ElementVisualState,
        motionProps: {
          animate: { scale: 1, y: 0 },
        },
      },
    ],
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  return { newState: state, steps };
}
