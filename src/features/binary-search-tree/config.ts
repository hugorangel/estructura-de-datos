import type { IComplexityInfo } from '@/core/interfaces';

export interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

export interface BSTState {
  root: BSTNode | null;
}

export type BSTOperationType =
  | 'insert'
  | 'search'
  | 'delete'
  | 'inorderTraversal'
  | 'preorderTraversal'
  | 'postorderTraversal'
  | 'bfsTraversal';

export const bstConfig = {
  id: 'binary-search-tree',
  name: 'Binary Search Tree',
  description: 'A hierarchical data structure where each node has at most two children, with left < parent < right ordering',
  slug: 'binary-search-tree',
  icon: 'git-branch',
  category: 'tree' as const,

  complexity: {
    average: {
      search: { time: 'O(log n)', explanation: 'Divide search space in half each step' },
      insert: { time: 'O(log n)', explanation: 'Traverse to correct position' },
      delete: { time: 'O(log n)', explanation: 'Find node then restructure' },
      access: { time: 'O(log n)', explanation: 'Traverse from root to target' },
    },
    worst: {
      search: { time: 'O(n)', explanation: 'Degenerate tree (linked list)' },
      insert: { time: 'O(n)', explanation: 'Unbalanced tree' },
      delete: { time: 'O(n)', explanation: 'Unbalanced tree' },
      access: { time: 'O(n)', explanation: 'Unbalanced tree' },
    },
    best: {
      search: { time: 'O(1)', explanation: 'Target is root' },
      insert: { time: 'O(1)', explanation: 'Insert at root of empty tree' },
      delete: { time: 'O(1)', explanation: 'Delete root with no children' },
      access: { time: 'O(1)', explanation: 'Access root' },
    },
    space: 'O(n)',
  } as IComplexityInfo,

  getInitialState: (): BSTState => {
    // Build initial tree: root=50, left subtree [30, 20, 40], right subtree [70, 60, 80]
    const root: BSTNode = {
      value: 50,
      left: {
        value: 30,
        left: { value: 20, left: null, right: null },
        right: { value: 40, left: null, right: null },
      },
      right: {
        value: 70,
        left: { value: 60, left: null, right: null },
        right: { value: 80, left: null, right: null },
      },
    };
    return { root };
  },

  generateRandomData: (size = 7): number[] => {
    const values = new Set<number>();
    while (values.size < size) {
      values.add(Math.floor(Math.random() * 100));
    }
    return Array.from(values);
  },

  buildTreeFromValues: (values: number[]): BSTNode | null => {
    if (values.length === 0) return null;

    const insert = (root: BSTNode | null, value: number): BSTNode => {
      if (!root) {
        return { value, left: null, right: null };
      }
      if (value < root.value) {
        root.left = insert(root.left, value);
      } else if (value > root.value) {
        root.right = insert(root.right, value);
      }
      return root;
    };

    let root: BSTNode | null = null;
    for (const value of values) {
      root = insert(root, value);
    }
    return root;
  },

  validate: (
    params: { value?: number },
    operation: string,
    _state: BSTState
  ) => {
    if (operation === 'insert' || operation === 'search' || operation === 'delete') {
      if (params.value === undefined) {
        return { valid: false, error: 'Value is required' };
      }
    }
    return { valid: true };
  },

  // Helper to clone the tree for immutable updates
  cloneTree: (node: BSTNode | null): BSTNode | null => {
    if (!node) return null;
    return {
      value: node.value,
      left: bstConfig.cloneTree(node.left),
      right: bstConfig.cloneTree(node.right),
    };
  },

  // Insert a value into the tree
  insertValue: (root: BSTNode | null, value: number): BSTNode => {
    if (!root) {
      return { value, left: null, right: null };
    }
    const newRoot = { ...root };
    if (value < root.value) {
      newRoot.left = bstConfig.insertValue(root.left, value);
    } else if (value > root.value) {
      newRoot.right = bstConfig.insertValue(root.right, value);
    }
    return newRoot;
  },

  // Find minimum value node
  findMin: (node: BSTNode): BSTNode => {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  },

  // Delete a value from the tree
  deleteValue: (root: BSTNode | null, value: number): BSTNode | null => {
    if (!root) return null;

    if (value < root.value) {
      return { ...root, left: bstConfig.deleteValue(root.left, value) };
    } else if (value > root.value) {
      return { ...root, right: bstConfig.deleteValue(root.right, value) };
    } else {
      // Node to delete found
      if (!root.left) return root.right;
      if (!root.right) return root.left;

      // Node has two children: get inorder successor
      const successor = bstConfig.findMin(root.right);
      return {
        value: successor.value,
        left: root.left,
        right: bstConfig.deleteValue(root.right, successor.value),
      };
    }
  },

  // Search for a value
  searchValue: (root: BSTNode | null, value: number): BSTNode | null => {
    if (!root || root.value === value) return root;
    if (value < root.value) return bstConfig.searchValue(root.left, value);
    return bstConfig.searchValue(root.right, value);
  },
};
