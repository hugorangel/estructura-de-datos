import type { IComplexityInfo } from '@/core/interfaces';

export interface DoublyLinkedListNode {
  id: string;
  value: number;
  prev: string | null;
  next: string | null;
}

export interface DoublyLinkedListState {
  nodes: DoublyLinkedListNode[];
  head: string | null;
  tail: string | null;
}

export const doublyLinkedListConfig = {
  id: 'doubly-linked-list',
  name: 'Doubly Linked List',
  description: 'A linked list where each node contains references to both the next and previous nodes',
  slug: 'linked-list-doubly',
  icon: 'link',
  category: 'linear' as const,

  complexity: {
    average: {
      access: { time: 'O(n)', explanation: 'Must traverse from head or tail' },
      search: { time: 'O(n)', explanation: 'Linear search through nodes' },
      insert: { time: 'O(1)', explanation: 'O(1) at head/tail, O(n) to find position' },
      delete: { time: 'O(1)', explanation: 'O(1) given node reference, O(n) to find' },
    },
    worst: {
      access: { time: 'O(n)', explanation: 'Element at opposite end' },
      search: { time: 'O(n)', explanation: 'Element at end or not found' },
      insert: { time: 'O(n)', explanation: 'Insert at middle position' },
      delete: { time: 'O(n)', explanation: 'Delete from middle position' },
    },
    best: {
      access: { time: 'O(1)', explanation: 'Access head or tail directly' },
      search: { time: 'O(1)', explanation: 'Element at head or tail' },
      insert: { time: 'O(1)', explanation: 'Insert at head or tail' },
      delete: { time: 'O(1)', explanation: 'Delete head, tail, or given node' },
    },
    space: 'O(n)',
  } as IComplexityInfo,

  getInitialState: (): DoublyLinkedListState => {
    const nodes: DoublyLinkedListNode[] = [
      { id: 'node-0', value: 5, prev: null, next: 'node-1' },
      { id: 'node-1', value: 18, prev: 'node-0', next: 'node-2' },
      { id: 'node-2', value: 42, prev: 'node-1', next: 'node-3' },
      { id: 'node-3', value: 7, prev: 'node-2', next: null },
    ];
    return {
      nodes,
      head: nodes[0]?.id ?? null,
      tail: nodes[nodes.length - 1]?.id ?? null,
    };
  },

  generateRandomData: (size = 4): DoublyLinkedListState => {
    const values = Array.from({ length: size }, () => Math.floor(Math.random() * 100));
    const nodes: DoublyLinkedListNode[] = values.map((value, index) => ({
      id: `node-${index}`,
      value,
      prev: index > 0 ? `node-${index - 1}` : null,
      next: index < size - 1 ? `node-${index + 1}` : null,
    }));
    return {
      nodes,
      head: nodes[0]?.id ?? null,
      tail: nodes[nodes.length - 1]?.id ?? null,
    };
  },

  validate: (
    params: { value?: number; position?: number },
    operation: string,
    state: DoublyLinkedListState
  ) => {
    if (operation === 'insertAtHead' || operation === 'insertAtTail') {
      if (params.value === undefined) {
        return { valid: false, error: 'Value is required' };
      }
    }
    if (operation === 'insertAtPosition') {
      if (params.value === undefined) {
        return { valid: false, error: 'Value is required' };
      }
      if (params.position === undefined || params.position < 0 || params.position > state.nodes.length) {
        return { valid: false, error: 'Position out of bounds' };
      }
    }
    if (operation === 'deleteNode') {
      if (params.position === undefined || params.position < 0 || params.position >= state.nodes.length) {
        return { valid: false, error: 'Position out of bounds' };
      }
    }
    return { valid: true };
  },
};
