import type { IAnimationStep, ElementVisualState } from '@/core/interfaces';
import type { HeapState, HeapType } from '../config';
import { heapConfig } from '../config';
import { baseDurations } from '@/constants/animations';

export function createInsertAnimation(
  state: HeapState,
  value: number
): { newState: HeapState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const elements = [...state.elements];
  const heapType = state.heapType;

  // Step 1: Add element at end
  const insertIndex = elements.length;
  elements.push(value);

  steps.push({
    id: `insert-add-${Date.now()}`,
    index: 0,
    type: 'insert',
    description: `Adding ${value} at index ${insertIndex} (end of array)`,
    codeLine: 1,
    elements: [
      {
        elementId: `heap-element-${insertIndex}`,
        state: 'inserting' as ElementVisualState,
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

  // Step 2+: Bubble up
  let currentIndex = insertIndex;
  while (currentIndex > 0) {
    const parentIndex = heapConfig.getParentIndex(currentIndex);
    const currentVal = elements[currentIndex]!;
    const parentVal = elements[parentIndex]!;
    const shouldSwap =
      heapType === 'max'
        ? currentVal > parentVal
        : currentVal < parentVal;

    steps.push({
      id: `insert-compare-${currentIndex}-${Date.now()}`,
      index: steps.length,
      type: 'compare',
      description: `Comparing ${elements[currentIndex]} with parent ${elements[parentIndex]} at index ${parentIndex}`,
      codeLine: 3,
      elements: [
        {
          elementId: `heap-element-${currentIndex}`,
          state: 'comparing' as ElementVisualState,
          motionProps: { animate: { scale: 1.1 } },
        },
        {
          elementId: `heap-element-${parentIndex}`,
          state: 'comparing' as ElementVisualState,
          motionProps: { animate: { scale: 1.1 } },
        },
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });

    if (!shouldSwap) {
      steps.push({
        id: `insert-noswap-${Date.now()}`,
        index: steps.length,
        type: 'highlight',
        description: `Heap property satisfied. No swap needed.`,
        codeLine: 4,
        elements: [
          {
            elementId: `heap-element-${currentIndex}`,
            state: 'found' as ElementVisualState,
            motionProps: { animate: { scale: 1 } },
          },
        ],
        baseDuration: baseDurations.fast,
        isPausePoint: false,
      });
      break;
    }

    // Swap
    steps.push({
      id: `insert-swap-${currentIndex}-${parentIndex}-${Date.now()}`,
      index: steps.length,
      type: 'swap',
      description: `Swapping ${elements[currentIndex]} with ${elements[parentIndex]} (bubble up)`,
      codeLine: 5,
      elements: [
        {
          elementId: `heap-element-${currentIndex}`,
          state: 'modified' as ElementVisualState,
          motionProps: {
            animate: { y: -40 },
            transition: { duration: 0.3 },
          },
        },
        {
          elementId: `heap-element-${parentIndex}`,
          state: 'modified' as ElementVisualState,
          motionProps: {
            animate: { y: 40 },
            transition: { duration: 0.3 },
          },
        },
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });

    const temp = elements[currentIndex]!;
    elements[currentIndex] = elements[parentIndex]!;
    elements[parentIndex] = temp;
    currentIndex = parentIndex;
  }

  // Complete
  steps.push({
    id: `insert-complete-${Date.now()}`,
    index: steps.length,
    type: 'complete',
    description: `Successfully inserted ${value}. Heap property maintained.`,
    codeLine: 7,
    elements: elements.map((_, i) => ({
      elementId: `heap-element-${i}`,
      state: 'default' as ElementVisualState,
      motionProps: {},
    })),
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  return {
    newState: { elements, heapType },
    steps,
  };
}

export function createExtractAnimation(
  state: HeapState
): { newState: HeapState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const elements = [...state.elements];
  const heapType = state.heapType;
  const extractedValue = elements[0];
  const opName = heapType === 'max' ? 'ExtractMax' : 'ExtractMin';

  if (elements.length === 0) {
    return { newState: state, steps: [] };
  }

  // Step 1: Highlight root to extract
  steps.push({
    id: `extract-highlight-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `${opName}: Removing root element ${extractedValue}`,
    codeLine: 1,
    elements: [
      {
        elementId: `heap-element-0`,
        state: 'deleting' as ElementVisualState,
        motionProps: { animate: { scale: 1.15, opacity: 0.7 } },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  if (elements.length === 1) {
    elements.pop();
    steps.push({
      id: `extract-complete-${Date.now()}`,
      index: steps.length,
      type: 'complete',
      description: `Extracted ${extractedValue}. Heap is now empty.`,
      codeLine: 8,
      elements: [],
      baseDuration: baseDurations.fast,
      isPausePoint: false,
    });
    return { newState: { elements, heapType }, steps };
  }

  // Step 2: Move last element to root
  const lastValue = elements[elements.length - 1];
  steps.push({
    id: `extract-move-last-${Date.now()}`,
    index: steps.length,
    type: 'move',
    description: `Moving last element ${lastValue} to root position`,
    codeLine: 2,
    elements: [
      {
        elementId: `heap-element-${elements.length - 1}`,
        state: 'modified' as ElementVisualState,
        motionProps: {
          animate: { scale: 1.1 },
          transition: { duration: 0.3 },
        },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  elements[0] = elements.pop()!;

  // Step 3+: Bubble down
  let currentIndex = 0;
  const size = elements.length;

  while (true) {
    const leftIndex = heapConfig.getLeftChildIndex(currentIndex);
    const rightIndex = heapConfig.getRightChildIndex(currentIndex);
    let targetIndex = currentIndex;

    const compare = (a: number, b: number) =>
      heapType === 'max' ? a > b : a < b;

    if (leftIndex < size && compare(elements[leftIndex]!, elements[targetIndex]!)) {
      targetIndex = leftIndex;
    }
    if (rightIndex < size && compare(elements[rightIndex]!, elements[targetIndex]!)) {
      targetIndex = rightIndex;
    }

    if (targetIndex === currentIndex) {
      steps.push({
        id: `extract-settled-${Date.now()}`,
        index: steps.length,
        type: 'highlight',
        description: `Element ${elements[currentIndex]} is in correct position. Heap property satisfied.`,
        codeLine: 6,
        elements: [
          {
            elementId: `heap-element-${currentIndex}`,
            state: 'found' as ElementVisualState,
            motionProps: { animate: { scale: 1 } },
          },
        ],
        baseDuration: baseDurations.fast,
        isPausePoint: false,
      });
      break;
    }

    // Compare step
    const compareElements = [
      {
        elementId: `heap-element-${currentIndex}`,
        state: 'comparing' as ElementVisualState,
        motionProps: { animate: { scale: 1.05 } },
      },
    ];
    if (leftIndex < size) {
      compareElements.push({
        elementId: `heap-element-${leftIndex}`,
        state: 'comparing' as ElementVisualState,
        motionProps: { animate: { scale: 1.05 } },
      });
    }
    if (rightIndex < size) {
      compareElements.push({
        elementId: `heap-element-${rightIndex}`,
        state: 'comparing' as ElementVisualState,
        motionProps: { animate: { scale: 1.05 } },
      });
    }

    steps.push({
      id: `extract-compare-${currentIndex}-${Date.now()}`,
      index: steps.length,
      type: 'compare',
      description: `Comparing ${elements[currentIndex]} with children to find ${heapType === 'max' ? 'largest' : 'smallest'}`,
      codeLine: 4,
      elements: compareElements,
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });

    // Swap step
    steps.push({
      id: `extract-swap-${currentIndex}-${targetIndex}-${Date.now()}`,
      index: steps.length,
      type: 'swap',
      description: `Swapping ${elements[currentIndex]} with ${elements[targetIndex]} (bubble down)`,
      codeLine: 5,
      elements: [
        {
          elementId: `heap-element-${currentIndex}`,
          state: 'modified' as ElementVisualState,
          motionProps: {
            animate: { y: 40 },
            transition: { duration: 0.3 },
          },
        },
        {
          elementId: `heap-element-${targetIndex}`,
          state: 'modified' as ElementVisualState,
          motionProps: {
            animate: { y: -40 },
            transition: { duration: 0.3 },
          },
        },
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });

    const tempExtract = elements[currentIndex]!;
    elements[currentIndex] = elements[targetIndex]!;
    elements[targetIndex] = tempExtract;
    currentIndex = targetIndex;
  }

  // Complete
  steps.push({
    id: `extract-complete-${Date.now()}`,
    index: steps.length,
    type: 'complete',
    description: `Successfully extracted ${extractedValue}. Heap property restored.`,
    codeLine: 8,
    elements: elements.map((_, i) => ({
      elementId: `heap-element-${i}`,
      state: 'default' as ElementVisualState,
      motionProps: {},
    })),
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  return {
    newState: { elements, heapType },
    steps,
  };
}

export function createPeekAnimation(
  state: HeapState
): { newState: HeapState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const opName = state.heapType === 'max' ? 'Max' : 'Min';

  if (state.elements.length === 0) {
    steps.push({
      id: `peek-empty-${Date.now()}`,
      index: 0,
      type: 'not-found',
      description: `Heap is empty. No ${opName.toLowerCase()} element to peek.`,
      codeLine: 1,
      elements: [],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });
    return { newState: state, steps };
  }

  // Step 1: Direct access to root
  steps.push({
    id: `peek-access-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Peek${opName}: Accessing root element (O(1) operation)`,
    codeLine: 1,
    elements: [
      {
        elementId: `heap-element-0`,
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

  // Step 2: Show value
  steps.push({
    id: `peek-found-${Date.now()}`,
    index: 1,
    type: 'found',
    description: `${opName} element is ${state.elements[0]} (root of heap)`,
    codeLine: 2,
    elements: [
      {
        elementId: `heap-element-0`,
        state: 'found' as ElementVisualState,
        motionProps: { animate: { scale: 1.2 } },
      },
    ],
    baseDuration: baseDurations.slow,
    isPausePoint: true,
  });

  // Complete
  steps.push({
    id: `peek-complete-${Date.now()}`,
    index: 2,
    type: 'complete',
    description: `Peek complete. ${opName} = ${state.elements[0]}`,
    codeLine: 3,
    elements: [
      {
        elementId: `heap-element-0`,
        state: 'default' as ElementVisualState,
        motionProps: { animate: { scale: 1 } },
      },
    ],
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  return { newState: state, steps };
}

export function createHeapifyAnimation(
  state: HeapState,
  newElements: number[]
): { newState: HeapState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const elements = [...newElements];
  const heapType = state.heapType;
  const n = elements.length;

  // Step 1: Show unordered array
  steps.push({
    id: `heapify-start-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Building ${heapType}-heap from unordered array: [${elements.join(', ')}]`,
    codeLine: 1,
    elements: elements.map((_, i) => ({
      elementId: `heap-element-${i}`,
      state: 'default' as ElementVisualState,
      motionProps: {},
    })),
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Start from last non-leaf node
  const startIdx = Math.floor(n / 2) - 1;

  steps.push({
    id: `heapify-strategy-${Date.now()}`,
    index: steps.length,
    type: 'highlight',
    description: `Starting from last non-leaf node at index ${startIdx}. Will heapify each subtree.`,
    codeLine: 2,
    elements: [
      {
        elementId: `heap-element-${startIdx}`,
        state: 'comparing' as ElementVisualState,
        motionProps: { animate: { scale: 1.1 } },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Heapify each subtree
  for (let i = startIdx; i >= 0; i--) {
    heapifyDownWithSteps(elements, i, n, heapType, steps);
  }

  // Complete
  steps.push({
    id: `heapify-complete-${Date.now()}`,
    index: steps.length,
    type: 'complete',
    description: `Heapify complete! Array is now a valid ${heapType}-heap: [${elements.join(', ')}]`,
    codeLine: 8,
    elements: elements.map((_, i) => ({
      elementId: `heap-element-${i}`,
      state: 'default' as ElementVisualState,
      motionProps: {},
    })),
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  return {
    newState: { elements, heapType },
    steps,
  };
}

function heapifyDownWithSteps(
  arr: number[],
  index: number,
  size: number,
  heapType: HeapType,
  steps: IAnimationStep[]
): void {
  let targetIdx = index;
  const left = heapConfig.getLeftChildIndex(index);
  const right = heapConfig.getRightChildIndex(index);

  const compare = (a: number, b: number) =>
    heapType === 'max' ? a > b : a < b;

  // Compare step
  const compareElements = [
    {
      elementId: `heap-element-${index}`,
      state: 'comparing' as ElementVisualState,
      motionProps: { animate: { scale: 1.05 } },
    },
  ];

  if (left < size) {
    compareElements.push({
      elementId: `heap-element-${left}`,
      state: 'comparing' as ElementVisualState,
      motionProps: { animate: { scale: 1.05 } },
    });
    if (compare(arr[left]!, arr[targetIdx]!)) {
      targetIdx = left;
    }
  }
  if (right < size) {
    compareElements.push({
      elementId: `heap-element-${right}`,
      state: 'comparing' as ElementVisualState,
      motionProps: { animate: { scale: 1.05 } },
    });
    if (compare(arr[right]!, arr[targetIdx]!)) {
      targetIdx = right;
    }
  }

  steps.push({
    id: `heapify-compare-${index}-${Date.now()}-${Math.random()}`,
    index: steps.length,
    type: 'compare',
    description: `Heapifying subtree at index ${index}: comparing ${arr[index]} with children`,
    codeLine: 4,
    elements: compareElements,
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  if (targetIdx !== index) {
    steps.push({
      id: `heapify-swap-${index}-${targetIdx}-${Date.now()}-${Math.random()}`,
      index: steps.length,
      type: 'swap',
      description: `Swapping ${arr[index]} with ${arr[targetIdx]}`,
      codeLine: 5,
      elements: [
        {
          elementId: `heap-element-${index}`,
          state: 'modified' as ElementVisualState,
          motionProps: { animate: { y: 20 } },
        },
        {
          elementId: `heap-element-${targetIdx}`,
          state: 'modified' as ElementVisualState,
          motionProps: { animate: { y: -20 } },
        },
      ],
      baseDuration: baseDurations.fast,
      isPausePoint: true,
    });

    const tempHeapify = arr[index]!;
    arr[index] = arr[targetIdx]!;
    arr[targetIdx] = tempHeapify;
    heapifyDownWithSteps(arr, targetIdx, size, heapType, steps);
  }
}
