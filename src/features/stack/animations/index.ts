import type { IAnimationStep, ElementVisualState } from '@/core/interfaces';
import type { StackState } from '../config';
import { baseDurations } from '@/constants/animations';

export function createPushAnimation(
  state: StackState,
  value: number
): { newState: StackState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const elements = [...state.elements];
  const newIndex = elements.length;

  // Step 1: Announce push operation
  steps.push({
    id: `push-announce-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Pushing ${value} onto the stack`,
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 2: Element drops from above and lands on top
  steps.push({
    id: `push-drop-${Date.now()}`,
    index: 1,
    type: 'insert',
    description: `Element ${value} drops onto top of stack`,
    codeLine: 2,
    elements: [
      {
        elementId: `stack-element-${newIndex}`,
        state: 'found' as ElementVisualState,
        position: { from: { x: 0, y: -100 }, to: { x: 0, y: 0 } },
        motionProps: {
          initial: { y: -100, opacity: 0, scale: 0.8 },
          animate: { y: 0, opacity: 1, scale: 1 },
          transition: { type: 'spring', stiffness: 200, damping: 20 },
        },
      },
    ],
    baseDuration: baseDurations.slow,
    isPausePoint: true,
  });

  // Step 3: Complete
  steps.push({
    id: `push-complete-${Date.now()}`,
    index: 2,
    type: 'complete',
    description: `Successfully pushed ${value}. Stack size: ${elements.length + 1}`,
    codeLine: 3,
    elements: [
      {
        elementId: `stack-element-${newIndex}`,
        state: 'default' as ElementVisualState,
        motionProps: {},
      },
    ],
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

export function createPopAnimation(
  state: StackState
): { newState: StackState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const elements = [...state.elements];
  const topIndex = elements.length - 1;
  const poppedValue = elements[topIndex];

  // Step 1: Highlight top element
  steps.push({
    id: `pop-highlight-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Popping top element: ${poppedValue}`,
    codeLine: 1,
    elements: [
      {
        elementId: `stack-element-${topIndex}`,
        state: 'current' as ElementVisualState,
        motionProps: {
          animate: { scale: 1.1 },
        },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 2: Element lifts off and fades
  steps.push({
    id: `pop-lift-${Date.now()}`,
    index: 1,
    type: 'delete',
    description: `Element ${poppedValue} lifts off the stack`,
    codeLine: 2,
    elements: [
      {
        elementId: `stack-element-${topIndex}`,
        state: 'deleting' as ElementVisualState,
        position: { from: { x: 0, y: 0 }, to: { x: 0, y: -80 } },
        motionProps: {
          animate: { y: -80, opacity: 0, scale: 0.8 },
          transition: { duration: 0.4, ease: 'easeOut' },
        },
      },
    ],
    baseDuration: baseDurations.slow,
    isPausePoint: true,
  });

  // Step 3: Complete
  steps.push({
    id: `pop-complete-${Date.now()}`,
    index: 2,
    type: 'complete',
    description: `Successfully popped ${poppedValue}. Stack size: ${elements.length - 1}`,
    codeLine: 3,
    elements: [],
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  // Create new state
  const newElements = elements.slice(0, -1);

  return {
    newState: { elements: newElements },
    steps,
  };
}

export function createPeekAnimation(
  state: StackState
): { newState: StackState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const topIndex = state.elements.length - 1;
  const topValue = state.elements[topIndex];

  // Step 1: Announce peek
  steps.push({
    id: `peek-announce-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Peeking at top element`,
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 2: Highlight top element
  steps.push({
    id: `peek-highlight-${Date.now()}`,
    index: 1,
    type: 'found',
    description: `Top element is ${topValue} (not removed)`,
    codeLine: 2,
    elements: [
      {
        elementId: `stack-element-${topIndex}`,
        state: 'found' as ElementVisualState,
        motionProps: {
          animate: { scale: 1.15 },
          transition: { type: 'spring', stiffness: 300 },
        },
      },
    ],
    baseDuration: baseDurations.slow,
    isPausePoint: true,
  });

  // Step 3: Complete (return to normal)
  steps.push({
    id: `peek-complete-${Date.now()}`,
    index: 2,
    type: 'complete',
    description: `Peek complete: top = ${topValue}`,
    codeLine: 3,
    elements: [
      {
        elementId: `stack-element-${topIndex}`,
        state: 'default' as ElementVisualState,
        motionProps: {
          animate: { scale: 1 },
        },
      },
    ],
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  return { newState: state, steps };
}

export function createSearchAnimation(
  state: StackState,
  value: number
): { newState: StackState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const elements = state.elements;
  let foundIndex = -1;

  // Step 1: Start search (from top)
  steps.push({
    id: `search-start-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Searching for ${value} (starting from top)`,
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Search from top to bottom
  for (let i = elements.length - 1; i >= 0; i--) {
    const isMatch = elements[i] === value;

    steps.push({
      id: `search-compare-${i}-${Date.now()}`,
      index: steps.length,
      type: 'compare',
      description: `Comparing stack[${i}] = ${elements[i]} with ${value}${isMatch ? ' - Match!' : ''}`,
      codeLine: 3,
      elements: [
        {
          elementId: `stack-element-${i}`,
          state: 'comparing' as ElementVisualState,
          motionProps: {
            animate: { scale: 1.05 },
          },
        },
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });

    if (isMatch) {
      foundIndex = i;
      steps.push({
        id: `search-found-${Date.now()}`,
        index: steps.length,
        type: 'found',
        description: `Found ${value} at position ${elements.length - 1 - i} from top!`,
        codeLine: 4,
        elements: [
          {
            elementId: `stack-element-${i}`,
            state: 'found' as ElementVisualState,
            motionProps: {
              animate: { scale: 1.15 },
              transition: { type: 'spring', stiffness: 300 },
            },
          },
        ],
        baseDuration: baseDurations.slow,
        isPausePoint: true,
      });
      break;
    }

    // Mark as visited
    steps.push({
      id: `search-visited-${i}-${Date.now()}`,
      index: steps.length,
      type: 'traverse',
      description: `${elements[i]} !== ${value}, continue searching`,
      codeLine: 5,
      elements: [
        {
          elementId: `stack-element-${i}`,
          state: 'visited' as ElementVisualState,
          motionProps: {
            animate: { scale: 1, opacity: 0.7 },
          },
        },
      ],
      baseDuration: baseDurations.fast,
      isPausePoint: false,
    });
  }

  // Final step
  if (foundIndex === -1) {
    steps.push({
      id: `search-notfound-${Date.now()}`,
      index: steps.length,
      type: 'not-found',
      description: `Value ${value} not found in stack`,
      codeLine: 7,
      elements: [],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });
  }

  steps.push({
    id: `search-complete-${Date.now()}`,
    index: steps.length,
    type: 'complete',
    description: foundIndex >= 0
      ? `Search complete: found at depth ${elements.length - 1 - foundIndex}`
      : `Search complete: value not found`,
    codeLine: 8,
    elements: elements.map((_, i) => ({
      elementId: `stack-element-${i}`,
      state: 'default' as ElementVisualState,
      motionProps: { animate: { scale: 1, opacity: 1 } },
    })),
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  return { newState: state, steps };
}
