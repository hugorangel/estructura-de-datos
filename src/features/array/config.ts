import type { IComplexityInfo } from '@/core/interfaces';

export interface ArrayState {
  elements: number[];
}

export const arrayConfig = {
  id: 'array',
  name: 'Array',
  description: 'A contiguous block of memory storing elements of the same type with O(1) index access',
  slug: 'array',
  icon: 'brackets',
  category: 'linear' as const,

  complexity: {
    average: {
      access: { time: 'O(1)', explanation: 'Direct index calculation' },
      search: { time: 'O(n)', explanation: 'Linear search through elements' },
      insert: { time: 'O(n)', explanation: 'Shift elements after insertion point' },
      delete: { time: 'O(n)', explanation: 'Shift elements after deletion point' },
    },
    worst: {
      access: { time: 'O(1)', explanation: 'Always direct access' },
      search: { time: 'O(n)', explanation: 'Element at end or not found' },
      insert: { time: 'O(n)', explanation: 'Insert at beginning' },
      delete: { time: 'O(n)', explanation: 'Delete from beginning' },
    },
    best: {
      access: { time: 'O(1)', explanation: 'Direct index access' },
      search: { time: 'O(1)', explanation: 'Element at beginning' },
      insert: { time: 'O(1)', explanation: 'Insert at end (amortized)' },
      delete: { time: 'O(1)', explanation: 'Delete from end' },
    },
    space: 'O(n)',
  } as IComplexityInfo,

  getInitialState: (): ArrayState => ({
    elements: [15, 42, 8, 23, 67, 31],
  }),

  generateRandomData: (size = 6): number[] =>
    Array.from({ length: size }, () => Math.floor(Math.random() * 100)),

  validate: (
    params: { value?: number; index?: number },
    operation: string,
    state: ArrayState
  ) => {
    if (operation === 'access' || operation === 'delete') {
      if (params.index === undefined || params.index < 0 || params.index >= state.elements.length) {
        return { valid: false, error: 'Index out of bounds' };
      }
    }
    if (operation === 'insert') {
      if (params.value === undefined) {
        return { valid: false, error: 'Value is required' };
      }
      if (params.index !== undefined && (params.index < 0 || params.index > state.elements.length)) {
        return { valid: false, error: 'Index out of bounds' };
      }
    }
    if (operation === 'search') {
      if (params.value === undefined) {
        return { valid: false, error: 'Value is required' };
      }
    }
    return { valid: true };
  },
};
