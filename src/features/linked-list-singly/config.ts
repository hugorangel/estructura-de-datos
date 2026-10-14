import type { IComplexityInfo } from '@/core/interfaces';

export interface LinkedListNode {
  id: string;
  value: number;
  next: string | null; // ID of next node or null
}

export interface SinglyLinkedListState {
  nodes: LinkedListNode[];
  head: string | null; // ID of head node
}

export const singlyLinkedListConfig = {
  id: 'singly-linked-list',
  name: 'Singly Linked List',
  description: 'A linear data structure where elements are linked using pointers, allowing efficient insertion and deletion',
  slug: 'linked-list-singly',
  icon: 'link',
  category: 'linear' as const,

  complexity: {
    average: {
      access: { time: 'O(n)', explanation: 'Must traverse from head to reach element' },
      search: { time: 'O(n)', explanation: 'Linear search through nodes' },
      insert: { time: 'O(n)', explanation: 'O(1) at head, O(n) at tail or position' },
      delete: { time: 'O(n)', explanation: 'Must find node and its predecessor' },
    },
    worst: {
      access: { time: 'O(n)', explanation: 'Element at the end of list' },
      search: { time: 'O(n)', explanation: 'Element at end or not found' },
      insert: { time: 'O(n)', explanation: 'Insert at tail requires traversal' },
      delete: { time: 'O(n)', explanation: 'Delete tail node' },
    },
    best: {
      access: { time: 'O(1)', explanation: 'Access head node' },
      search: { time: 'O(1)', explanation: 'Element is at head' },
      insert: { time: 'O(1)', explanation: 'Insert at head' },
      delete: { time: 'O(1)', explanation: 'Delete head node' },
    },
    space: 'O(n)',
  } as IComplexityInfo,

  getInitialState: (): SinglyLinkedListState => {
    const values = [10, 25, 15, 30];
    const nodes: LinkedListNode[] = values.map((value, index) => ({
      id: `node-${index}`,
      value,
      next: index < values.length - 1 ? `node-${index + 1}` : null,
    }));

    const firstNode = nodes[0];
    return {
      nodes,
      head: firstNode ? firstNode.id : null,
    };
  },

  generateRandomData: (size = 4): SinglyLinkedListState => {
    const values = Array.from({ length: size }, () => Math.floor(Math.random() * 100));
    const nodes: LinkedListNode[] = values.map((value, index) => ({
      id: `node-${Date.now()}-${index}`,
      value,
      next: null,
    }));

    // Fix the next pointers after generating IDs
    for (let i = 0; i < nodes.length - 1; i++) {
      const currentNode = nodes[i];
      const nextNode = nodes[i + 1];
      if (currentNode && nextNode) {
        currentNode.next = nextNode.id;
      }
    }

    const firstNode = nodes[0];
    return {
      nodes,
      head: firstNode ? firstNode.id : null,
    };
  },

  validate: (
    params: { value?: number; position?: number },
    operation: string,
    state: SinglyLinkedListState
  ) => {
    const listLength = state.nodes.length;

    if (operation === 'insertAtHead' || operation === 'insertAtTail') {
      if (params.value === undefined) {
        return { valid: false, error: 'Value is required' };
      }
    }

    if (operation === 'insertAtPosition') {
      if (params.value === undefined) {
        return { valid: false, error: 'Value is required' };
      }
      if (params.position === undefined || params.position < 0 || params.position > listLength) {
        return { valid: false, error: 'Invalid position' };
      }
    }

    if (operation === 'deleteNode') {
      if (params.value === undefined) {
        return { valid: false, error: 'Value is required to find node to delete' };
      }
      if (listLength === 0) {
        return { valid: false, error: 'List is empty' };
      }
    }

    if (operation === 'search') {
      if (params.value === undefined) {
        return { valid: false, error: 'Value is required' };
      }
    }

    if (operation === 'traverse') {
      if (listLength === 0) {
        return { valid: false, error: 'List is empty' };
      }
    }

    return { valid: true };
  },

  // Helper to get node by ID
  getNodeById: (state: SinglyLinkedListState, id: string): LinkedListNode | undefined => {
    return state.nodes.find((node) => node.id === id);
  },

  // Helper to get node index
  getNodeIndex: (state: SinglyLinkedListState, id: string): number => {
    return state.nodes.findIndex((node) => node.id === id);
  },

  // Helper to traverse and get ordered nodes
  getOrderedNodes: (state: SinglyLinkedListState): LinkedListNode[] => {
    const ordered: LinkedListNode[] = [];
    let currentId = state.head;

    while (currentId) {
      const node = state.nodes.find((n) => n.id === currentId);
      if (node) {
        ordered.push(node);
        currentId = node.next;
      } else {
        break;
      }
    }

    return ordered;
  },
};
