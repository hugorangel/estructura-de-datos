import type { IComplexityInfo } from '@/core/interfaces';

export interface StackState {
  elements: number[];
}

export const stackConfig = {
  id: 'stack',
  name: 'Stack',
  description: 'A LIFO (Last-In-First-Out) data structure where elements are added and removed from the top',
  slug: 'stack',
  icon: 'layers',
  category: 'linear' as const,

  complexity: {
    average: {
      push: { time: 'O(1)', explanation: 'Add element to top of stack' },
      pop: { time: 'O(1)', explanation: 'Remove element from top of stack' },
      peek: { time: 'O(1)', explanation: 'View top element without removal' },
      search: { time: 'O(n)', explanation: 'Linear search through stack elements' },
    },
    worst: {
      push: { time: 'O(1)', explanation: 'Always constant time (amortized with dynamic array)' },
      pop: { time: 'O(1)', explanation: 'Always constant time' },
      peek: { time: 'O(1)', explanation: 'Always constant time' },
      search: { time: 'O(n)', explanation: 'Element at bottom or not found' },
    },
    best: {
      push: { time: 'O(1)', explanation: 'Direct insertion at top' },
      pop: { time: 'O(1)', explanation: 'Direct removal from top' },
      peek: { time: 'O(1)', explanation: 'Direct access to top' },
      search: { time: 'O(1)', explanation: 'Element at top' },
    },
    space: 'O(n)',
  } as IComplexityInfo,

  getInitialState: (): StackState => ({
    elements: [23, 45, 12, 67], // Bottom to top: 23 is bottom, 67 is top
  }),

  generateRandomData: (size = 4): number[] =>
    Array.from({ length: size }, () => Math.floor(Math.random() * 100)),

  validate: (
    params: { value?: number },
    operation: string,
    state: StackState
  ) => {
    if (operation === 'push') {
      if (params.value === undefined) {
        return { valid: false, error: 'Value is required for push' };
      }
    }
    if (operation === 'pop' || operation === 'peek') {
      if (state.elements.length === 0) {
        return { valid: false, error: 'Stack is empty' };
      }
    }
    return { valid: true };
  },
};
