import type { IAnimationStep, ElementVisualState } from '@/core/interfaces';
import type { ArrayState } from '../config';
import { baseDurations } from '@/constants/animations';

export function createInsertAnimation(
  state: ArrayState,
  value: number,
  index: number
): { newState: ArrayState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const elements = [...state.elements];
  const insertIndex = index ?? elements.length;

  // Step 1: Highlight insertion point
  steps.push({
    id: `insert-highlight-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Inserting ${value} at index ${insertIndex}`,
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 2: Shift elements to the right (if not inserting at end)
  if (insertIndex < elements.length) {
    for (let i = elements.length - 1; i >= insertIndex; i--) {
      steps.push({
        id: `insert-shift-${i}-${Date.now()}`,
        index: steps.length,
        type: 'move',
        description: `Shifting element ${elements[i]} from index ${i} to ${i + 1}`,
        codeLine: 3,
        elements: [
          {
            elementId: `array-element-${i}`,
            state: 'modified' as ElementVisualState,
            position: { from: { x: i * 70, y: 0 }, to: { x: (i + 1) * 70, y: 0 } },
            motionProps: {
              animate: { x: 70 },
              transition: { duration: 0.3 },
            },
          },
        ],
        baseDuration: baseDurations.fast,
        isPausePoint: false,
      });
    }
  }

  // Step 3: Insert the new element
  steps.push({
    id: `insert-place-${Date.now()}`,
    index: steps.length,
    type: 'insert',
    description: `Placing ${value} at index ${insertIndex}`,
    codeLine: 5,
    elements: [
      {
        elementId: `array-element-${insertIndex}`,
        state: 'found' as ElementVisualState,
        motionProps: {
          initial: { scale: 0, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { type: 'spring', stiffness: 300, damping: 25 },
        },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 4: Complete
  steps.push({
    id: `insert-complete-${Date.now()}`,
    index: steps.length,
    type: 'complete',
    description: `Successfully inserted ${value} at index ${insertIndex}`,
    codeLine: 7,
    elements: elements.map((_, i) => ({
      elementId: `array-element-${i}`,
      state: 'default' as ElementVisualState,
      motionProps: {},
    })),
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  // Create new state
  const newElements = [...elements];
  newElements.splice(insertIndex, 0, value);

  return {
    newState: { elements: newElements },
    steps,
  };
}

export function createDeleteAnimation(
  state: ArrayState,
  index: number
): { newState: ArrayState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const elements = [...state.elements];
  const deletedValue = elements[index];

  // Step 1: Highlight element to delete
  steps.push({
    id: `delete-highlight-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Deleting element ${deletedValue} at index ${index}`,
    codeLine: 1,
    elements: [
      {
        elementId: `array-element-${index}`,
        state: 'deleting' as ElementVisualState,
        motionProps: {
          animate: { scale: 0.9, opacity: 0.5 },
        },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 2: Remove the element
  steps.push({
    id: `delete-remove-${Date.now()}`,
    index: 1,
    type: 'delete',
    description: `Removing element ${deletedValue}`,
    codeLine: 2,
    elements: [
      {
        elementId: `array-element-${index}`,
        state: 'deleting' as ElementVisualState,
        motionProps: {
          animate: { scale: 0, opacity: 0 },
          transition: { duration: 0.3 },
        },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: false,
  });

  // Step 3: Shift remaining elements left
  for (let i = index + 1; i < elements.length; i++) {
    steps.push({
      id: `delete-shift-${i}-${Date.now()}`,
      index: steps.length,
      type: 'move',
      description: `Shifting element ${elements[i]} from index ${i} to ${i - 1}`,
      codeLine: 4,
      elements: [
        {
          elementId: `array-element-${i}`,
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
    id: `delete-complete-${Date.now()}`,
    index: steps.length,
    type: 'complete',
    description: `Successfully deleted element at index ${index}`,
    codeLine: 6,
    elements: [],
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  // Create new state
  const newElements = elements.filter((_, i) => i !== index);

  return {
    newState: { elements: newElements },
    steps,
  };
}

export function createAccessAnimation(
  state: ArrayState,
  index: number
): { newState: ArrayState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const value = state.elements[index];

  // Step 1: Calculate address
  steps.push({
    id: `access-calc-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Calculating memory address: base + (${index} × elementSize)`,
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 2: Direct access
  steps.push({
    id: `access-direct-${Date.now()}`,
    index: 1,
    type: 'found',
    description: `Direct access to index ${index}: found value ${value}`,
    codeLine: 2,
    elements: [
      {
        elementId: `array-element-${index}`,
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

  // Step 3: Complete
  steps.push({
    id: `access-complete-${Date.now()}`,
    index: 2,
    type: 'complete',
    description: `Access complete: array[${index}] = ${value}`,
    codeLine: 3,
    elements: [
      {
        elementId: `array-element-${index}`,
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
  state: ArrayState,
  value: number
): { newState: ArrayState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const elements = state.elements;
  let foundIndex = -1;

  // Step 1: Start search
  steps.push({
    id: `search-start-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Searching for value ${value}`,
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 2-N: Check each element
  for (let i = 0; i < elements.length; i++) {
    const isMatch = elements[i] === value;

    steps.push({
      id: `search-compare-${i}-${Date.now()}`,
      index: steps.length,
      type: 'compare',
      description: `Comparing array[${i}] = ${elements[i]} with ${value}${isMatch ? ' ✓ Match!' : ''}`,
      codeLine: 3,
      elements: [
        {
          elementId: `array-element-${i}`,
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
        description: `Found ${value} at index ${i}!`,
        codeLine: 4,
        elements: [
          {
            elementId: `array-element-${i}`,
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
      description: `${elements[i]} ≠ ${value}, continue searching`,
      codeLine: 5,
      elements: [
        {
          elementId: `array-element-${i}`,
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
      description: `Value ${value} not found in array`,
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
      ? `Search complete: found at index ${foundIndex}`
      : `Search complete: value not found`,
    codeLine: 8,
    elements: elements.map((_, i) => ({
      elementId: `array-element-${i}`,
      state: 'default' as ElementVisualState,
      motionProps: { animate: { scale: 1, opacity: 1 } },
    })),
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  return { newState: state, steps };
}
