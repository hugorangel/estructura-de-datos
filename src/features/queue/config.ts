import type { IComplexityInfo } from '@/core/interfaces';

export interface QueueState {
  elements: number[];
}

export const queueConfig = {
  id: 'queue',
  name: 'Queue',
  description: 'A FIFO (First-In-First-Out) data structure where elements are added at the rear and removed from the front',
  slug: 'queue',
  icon: 'arrow-right-left',
  category: 'linear' as const,

  complexity: {
    average: {
      enqueue: { time: 'O(1)', explanation: 'Add element at the rear' },
      dequeue: { time: 'O(1)', explanation: 'Remove element from the front' },
      peek: { time: 'O(1)', explanation: 'Access front element without removal' },
      search: { time: 'O(n)', explanation: 'Linear search through elements' },
    },
    worst: {
      enqueue: { time: 'O(1)', explanation: 'Always constant time' },
      dequeue: { time: 'O(1)', explanation: 'Always constant time' },
      peek: { time: 'O(1)', explanation: 'Always constant time' },
      search: { time: 'O(n)', explanation: 'Element at rear or not found' },
    },
    best: {
      enqueue: { time: 'O(1)', explanation: 'Direct addition at rear' },
      dequeue: { time: 'O(1)', explanation: 'Direct removal from front' },
      peek: { time: 'O(1)', explanation: 'Direct access to front' },
      search: { time: 'O(1)', explanation: 'Element at front' },
    },
    space: 'O(n)',
  } as IComplexityInfo,

  getInitialState: (): QueueState => ({
    elements: [15, 28, 42, 33],
  }),

  generateRandomData: (size = 4): number[] =>
    Array.from({ length: size }, () => Math.floor(Math.random() * 100)),

  validate: (
    params: { value?: number },
    operation: string,
    state: QueueState
  ) => {
    if (operation === 'enqueue') {
      if (params.value === undefined) {
        return { valid: false, error: 'Value is required' };
      }
    }
    if (operation === 'dequeue' || operation === 'peek') {
      if (state.elements.length === 0) {
        return { valid: false, error: 'Queue is empty' };
      }
    }
    return { valid: true };
  },
};
