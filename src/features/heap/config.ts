import type { IComplexityInfo } from '@/core/interfaces';

export type HeapType = 'max' | 'min';

export interface HeapState {
  elements: number[];
  heapType: HeapType;
}

export const heapConfig = {
  id: 'heap',
  name: 'Heap',
  description: 'A complete binary tree that satisfies the heap property, with O(1) peek and O(log n) insert/extract',
  slug: 'heap',
  icon: 'binary-tree',
  category: 'tree' as const,

  complexity: {
    average: {
      access: { time: 'O(n)', explanation: 'Must search through heap' },
      search: { time: 'O(n)', explanation: 'No ordering guarantees for search' },
      insert: { time: 'O(log n)', explanation: 'Bubble up through tree height' },
      delete: { time: 'O(log n)', explanation: 'Bubble down through tree height' },
    },
    worst: {
      access: { time: 'O(n)', explanation: 'Element at bottom of heap' },
      search: { time: 'O(n)', explanation: 'Must check all elements' },
      insert: { time: 'O(log n)', explanation: 'Bubble up to root' },
      delete: { time: 'O(log n)', explanation: 'Bubble down to leaf' },
    },
    best: {
      access: { time: 'O(1)', explanation: 'Access root element' },
      search: { time: 'O(1)', explanation: 'Element is at root' },
      insert: { time: 'O(1)', explanation: 'Element stays at insertion point' },
      delete: { time: 'O(1)', explanation: 'Only root removed, no reheap needed' },
    },
    space: 'O(n)',
  } as IComplexityInfo,

  // Index calculations for array-based heap
  getParentIndex: (i: number): number => Math.floor((i - 1) / 2),
  getLeftChildIndex: (i: number): number => 2 * i + 1,
  getRightChildIndex: (i: number): number => 2 * i + 2,

  getInitialState: (): HeapState => ({
    // Valid max-heap: [90, 80, 70, 50, 60, 30, 20]
    elements: [90, 80, 70, 50, 60, 30, 20],
    heapType: 'max',
  }),

  generateRandomHeap: (size = 7, heapType: HeapType = 'max'): number[] => {
    const elements = Array.from({ length: size }, () => Math.floor(Math.random() * 100));
    // Build a valid heap from random elements
    return heapConfig.buildHeap([...elements], heapType);
  },

  buildHeap: (arr: number[], heapType: HeapType): number[] => {
    const result = [...arr];
    const n = result.length;
    // Start from last non-leaf node
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapConfig.heapifyDown(result, i, n, heapType);
    }
    return result;
  },

  heapifyDown: (arr: number[], index: number, size: number, heapType: HeapType): void => {
    let targetIdx = index;
    const left = heapConfig.getLeftChildIndex(index);
    const right = heapConfig.getRightChildIndex(index);

    const compare = (a: number, b: number) =>
      heapType === 'max' ? a > b : a < b;

    if (left < size && compare(arr[left]!, arr[targetIdx]!)) {
      targetIdx = left;
    }
    if (right < size && compare(arr[right]!, arr[targetIdx]!)) {
      targetIdx = right;
    }

    if (targetIdx !== index) {
      const temp = arr[index]!;
      arr[index] = arr[targetIdx]!;
      arr[targetIdx] = temp;
      heapConfig.heapifyDown(arr, targetIdx, size, heapType);
    }
  },

  validate: (
    params: { value?: number },
    operation: string,
    state: HeapState
  ) => {
    if (operation === 'insert') {
      if (params.value === undefined) {
        return { valid: false, error: 'Value is required' };
      }
    }
    if (operation === 'extractMax' || operation === 'extractMin' || operation === 'peek') {
      if (state.elements.length === 0) {
        return { valid: false, error: 'Heap is empty' };
      }
    }
    return { valid: true };
  },
};
