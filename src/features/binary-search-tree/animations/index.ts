import type { IAnimationStep, ElementVisualState } from '@/core/interfaces';
import type { BSTState, BSTNode } from '../config';
import { bstConfig } from '../config';
import { baseDurations } from '@/constants/animations';

// Helper to get all node values for resetting states
function getAllNodeIds(node: BSTNode | null): string[] {
  if (!node) return [];
  return [
    `bst-node-${node.value}`,
    ...getAllNodeIds(node.left),
    ...getAllNodeIds(node.right),
  ];
}

export function createInsertAnimation(
  state: BSTState,
  value: number
): { newState: BSTState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];

  // Step 1: Start insertion
  steps.push({
    id: `insert-start-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Inserting value ${value} into the BST`,
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 2-N: Traverse comparing at each node
  let current = state.root;
  let stepIndex = 1;

  while (current) {
    const comparison = value < current.value ? 'less than' : 'greater than';
    const direction = value < current.value ? 'left' : 'right';

    steps.push({
      id: `insert-compare-${current.value}-${Date.now()}`,
      index: stepIndex++,
      type: 'compare',
      description: `${value} is ${comparison} ${current.value}, go ${direction}`,
      codeLine: 3,
      elements: [
        {
          elementId: `bst-node-${current.value}`,
          state: 'comparing' as ElementVisualState,
          motionProps: {
            animate: { scale: 1.1 },
          },
        },
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });

    // Mark as visited
    steps.push({
      id: `insert-visited-${current.value}-${Date.now()}`,
      index: stepIndex++,
      type: 'traverse',
      description: `Moving ${direction} from ${current.value}`,
      codeLine: 4,
      elements: [
        {
          elementId: `bst-node-${current.value}`,
          state: 'visited' as ElementVisualState,
          motionProps: {
            animate: { scale: 1, opacity: 0.7 },
          },
        },
      ],
      baseDuration: baseDurations.fast,
      isPausePoint: false,
    });

    if (value < current.value) {
      if (!current.left) break;
      current = current.left;
    } else if (value > current.value) {
      if (!current.right) break;
      current = current.right;
    } else {
      // Value already exists
      steps.push({
        id: `insert-exists-${Date.now()}`,
        index: stepIndex++,
        type: 'found',
        description: `Value ${value} already exists in the tree`,
        codeLine: 5,
        elements: [
          {
            elementId: `bst-node-${current.value}`,
            state: 'found' as ElementVisualState,
            motionProps: {
              animate: { scale: 1.15 },
            },
          },
        ],
        baseDuration: baseDurations.slow,
        isPausePoint: true,
      });
      return { newState: state, steps };
    }
  }

  // Step N+1: Insert at the correct position
  steps.push({
    id: `insert-place-${Date.now()}`,
    index: stepIndex++,
    type: 'insert',
    description: `Inserting ${value} as a new leaf node`,
    codeLine: 6,
    elements: [
      {
        elementId: `bst-node-${value}`,
        state: 'found' as ElementVisualState,
        motionProps: {
          initial: { scale: 0, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { type: 'spring', stiffness: 300, damping: 25 },
        },
      },
    ],
    baseDuration: baseDurations.slow,
    isPausePoint: true,
  });

  // Step: Complete
  const newRoot = bstConfig.insertValue(state.root, value);
  const allNodeIds = getAllNodeIds(newRoot);

  steps.push({
    id: `insert-complete-${Date.now()}`,
    index: stepIndex,
    type: 'complete',
    description: `Successfully inserted ${value}`,
    codeLine: 8,
    elements: allNodeIds.map((id) => ({
      elementId: id,
      state: 'default' as ElementVisualState,
      motionProps: { animate: { scale: 1, opacity: 1 } },
    })),
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  return {
    newState: { root: newRoot },
    steps,
  };
}

export function createSearchAnimation(
  state: BSTState,
  value: number
): { newState: BSTState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];

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

  let current = state.root;
  let stepIndex = 1;
  let found = false;

  while (current) {
    // Compare with current node
    steps.push({
      id: `search-compare-${current.value}-${Date.now()}`,
      index: stepIndex++,
      type: 'compare',
      description: `Comparing ${value} with ${current.value}`,
      codeLine: 3,
      elements: [
        {
          elementId: `bst-node-${current.value}`,
          state: 'comparing' as ElementVisualState,
          motionProps: {
            animate: { scale: 1.1 },
          },
        },
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });

    if (value === current.value) {
      // Found!
      found = true;
      steps.push({
        id: `search-found-${Date.now()}`,
        index: stepIndex++,
        type: 'found',
        description: `Found ${value}!`,
        codeLine: 4,
        elements: [
          {
            elementId: `bst-node-${current.value}`,
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

    const direction = value < current.value ? 'left' : 'right';
    steps.push({
      id: `search-traverse-${current.value}-${Date.now()}`,
      index: stepIndex++,
      type: 'traverse',
      description: `${value} ${value < current.value ? '<' : '>'} ${current.value}, go ${direction}`,
      codeLine: 5,
      elements: [
        {
          elementId: `bst-node-${current.value}`,
          state: 'visited' as ElementVisualState,
          motionProps: {
            animate: { scale: 1, opacity: 0.7 },
          },
        },
      ],
      baseDuration: baseDurations.fast,
      isPausePoint: false,
    });

    current = value < current.value ? current.left : current.right;
  }

  if (!found) {
    steps.push({
      id: `search-notfound-${Date.now()}`,
      index: stepIndex++,
      type: 'not-found',
      description: `Value ${value} not found in the tree`,
      codeLine: 7,
      elements: [],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });
  }

  // Complete
  const allNodeIds = getAllNodeIds(state.root);
  steps.push({
    id: `search-complete-${Date.now()}`,
    index: stepIndex,
    type: 'complete',
    description: found ? `Search complete: found ${value}` : `Search complete: ${value} not found`,
    codeLine: 8,
    elements: allNodeIds.map((id) => ({
      elementId: id,
      state: 'default' as ElementVisualState,
      motionProps: { animate: { scale: 1, opacity: 1 } },
    })),
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  return { newState: state, steps };
}

export function createDeleteAnimation(
  state: BSTState,
  value: number
): { newState: BSTState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];

  // Step 1: Start delete
  steps.push({
    id: `delete-start-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Deleting value ${value} from the BST`,
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Find the node
  let current = state.root;
  let stepIndex = 1;
  let found = false;

  while (current) {
    steps.push({
      id: `delete-search-${current.value}-${Date.now()}`,
      index: stepIndex++,
      type: 'compare',
      description: `Searching: comparing ${value} with ${current.value}`,
      codeLine: 2,
      elements: [
        {
          elementId: `bst-node-${current.value}`,
          state: 'comparing' as ElementVisualState,
          motionProps: { animate: { scale: 1.1 } },
        },
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });

    if (value === current.value) {
      found = true;
      break;
    }

    steps.push({
      id: `delete-traverse-${current.value}-${Date.now()}`,
      index: stepIndex++,
      type: 'traverse',
      description: `Moving ${value < current.value ? 'left' : 'right'}`,
      codeLine: 3,
      elements: [
        {
          elementId: `bst-node-${current.value}`,
          state: 'visited' as ElementVisualState,
          motionProps: { animate: { opacity: 0.7 } },
        },
      ],
      baseDuration: baseDurations.fast,
      isPausePoint: false,
    });

    current = value < current.value ? current.left : current.right;
  }

  if (!found || !current) {
    steps.push({
      id: `delete-notfound-${Date.now()}`,
      index: stepIndex++,
      type: 'not-found',
      description: `Value ${value} not found in the tree`,
      codeLine: 4,
      elements: [],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });
    return { newState: state, steps };
  }

  // Determine deletion case
  const hasLeft = current.left !== null;
  const hasRight = current.right !== null;

  if (!hasLeft && !hasRight) {
    // Case 1: Leaf node
    steps.push({
      id: `delete-case1-${Date.now()}`,
      index: stepIndex++,
      type: 'highlight',
      description: `Case 1: ${value} is a leaf node, simply remove it`,
      codeLine: 5,
      elements: [
        {
          elementId: `bst-node-${value}`,
          state: 'deleting' as ElementVisualState,
          motionProps: { animate: { scale: 0.9, opacity: 0.5 } },
        },
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });
  } else if (!hasLeft || !hasRight) {
    // Case 2: One child
    const child = hasLeft ? current.left : current.right;
    steps.push({
      id: `delete-case2-${Date.now()}`,
      index: stepIndex++,
      type: 'highlight',
      description: `Case 2: ${value} has one child (${child!.value}), replace with child`,
      codeLine: 6,
      elements: [
        {
          elementId: `bst-node-${value}`,
          state: 'deleting' as ElementVisualState,
          motionProps: { animate: { scale: 0.9, opacity: 0.5 } },
        },
        {
          elementId: `bst-node-${child!.value}`,
          state: 'modified' as ElementVisualState,
          motionProps: { animate: { scale: 1.1 } },
        },
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });
  } else {
    // Case 3: Two children - find inorder successor
    const successor = bstConfig.findMin(current.right!);
    steps.push({
      id: `delete-case3-${Date.now()}`,
      index: stepIndex++,
      type: 'highlight',
      description: `Case 3: ${value} has two children, finding inorder successor`,
      codeLine: 7,
      elements: [
        {
          elementId: `bst-node-${value}`,
          state: 'deleting' as ElementVisualState,
          motionProps: { animate: { scale: 0.9, opacity: 0.5 } },
        },
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });

    // Find successor animation
    let succ = current.right;
    while (succ && succ.left) {
      steps.push({
        id: `delete-findsucc-${succ.value}-${Date.now()}`,
        index: stepIndex++,
        type: 'traverse',
        description: `Finding minimum in right subtree, checking ${succ.value}`,
        codeLine: 8,
        elements: [
          {
            elementId: `bst-node-${succ.value}`,
            state: 'comparing' as ElementVisualState,
            motionProps: { animate: { scale: 1.05 } },
          },
        ],
        baseDuration: baseDurations.fast,
        isPausePoint: false,
      });
      succ = succ.left;
    }

    steps.push({
      id: `delete-successor-${Date.now()}`,
      index: stepIndex++,
      type: 'found',
      description: `Inorder successor is ${successor.value}, will replace ${value}`,
      codeLine: 9,
      elements: [
        {
          elementId: `bst-node-${successor.value}`,
          state: 'found' as ElementVisualState,
          motionProps: { animate: { scale: 1.15 } },
        },
      ],
      baseDuration: baseDurations.slow,
      isPausePoint: true,
    });
  }

  // Perform deletion
  steps.push({
    id: `delete-remove-${Date.now()}`,
    index: stepIndex++,
    type: 'delete',
    description: `Removing node ${value}`,
    codeLine: 10,
    elements: [
      {
        elementId: `bst-node-${value}`,
        state: 'deleting' as ElementVisualState,
        motionProps: {
          animate: { scale: 0, opacity: 0 },
          transition: { duration: 0.3 },
        },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Create new state
  const newRoot = bstConfig.deleteValue(state.root, value);
  const allNodeIds = getAllNodeIds(newRoot);

  steps.push({
    id: `delete-complete-${Date.now()}`,
    index: stepIndex,
    type: 'complete',
    description: `Successfully deleted ${value}`,
    codeLine: 12,
    elements: allNodeIds.map((id) => ({
      elementId: id,
      state: 'default' as ElementVisualState,
      motionProps: { animate: { scale: 1, opacity: 1 } },
    })),
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  return {
    newState: { root: newRoot },
    steps,
  };
}

export function createInorderAnimation(
  state: BSTState
): { newState: BSTState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const result: number[] = [];

  steps.push({
    id: `inorder-start-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: 'Starting Inorder Traversal (Left → Root → Right)',
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  let stepIndex = 1;

  function inorder(node: BSTNode | null) {
    if (!node) return;

    // Visit left
    if (node.left) {
      steps.push({
        id: `inorder-goleft-${node.value}-${Date.now()}-${stepIndex}`,
        index: stepIndex++,
        type: 'traverse',
        description: `Going left from ${node.value}`,
        codeLine: 2,
        elements: [
          {
            elementId: `bst-node-${node.value}`,
            state: 'comparing' as ElementVisualState,
            motionProps: { animate: { scale: 1.05 } },
          },
        ],
        baseDuration: baseDurations.fast,
        isPausePoint: false,
      });
    }

    inorder(node.left);

    // Visit current (root of subtree)
    result.push(node.value);
    steps.push({
      id: `inorder-visit-${node.value}-${Date.now()}-${stepIndex}`,
      index: stepIndex++,
      type: 'found',
      description: `Visit ${node.value} → Result: [${result.join(', ')}]`,
      codeLine: 3,
      elements: [
        {
          elementId: `bst-node-${node.value}`,
          state: 'found' as ElementVisualState,
          motionProps: { animate: { scale: 1.15 } },
        },
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });

    steps.push({
      id: `inorder-visited-${node.value}-${Date.now()}-${stepIndex}`,
      index: stepIndex++,
      type: 'traverse',
      description: `Completed ${node.value}`,
      codeLine: 4,
      elements: [
        {
          elementId: `bst-node-${node.value}`,
          state: 'visited' as ElementVisualState,
          motionProps: { animate: { scale: 1, opacity: 0.7 } },
        },
      ],
      baseDuration: baseDurations.fast,
      isPausePoint: false,
    });

    // Visit right
    if (node.right) {
      steps.push({
        id: `inorder-goright-${node.value}-${Date.now()}-${stepIndex}`,
        index: stepIndex++,
        type: 'traverse',
        description: `Going right from ${node.value}`,
        codeLine: 5,
        elements: [],
        baseDuration: baseDurations.fast,
        isPausePoint: false,
      });
    }

    inorder(node.right);
  }

  inorder(state.root);

  const allNodeIds = getAllNodeIds(state.root);
  steps.push({
    id: `inorder-complete-${Date.now()}`,
    index: stepIndex,
    type: 'complete',
    description: `Inorder complete: [${result.join(', ')}] (sorted order)`,
    codeLine: 6,
    elements: allNodeIds.map((id) => ({
      elementId: id,
      state: 'default' as ElementVisualState,
      motionProps: { animate: { scale: 1, opacity: 1 } },
    })),
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  return { newState: state, steps };
}

export function createPreorderAnimation(
  state: BSTState
): { newState: BSTState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const result: number[] = [];

  steps.push({
    id: `preorder-start-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: 'Starting Preorder Traversal (Root → Left → Right)',
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  let stepIndex = 1;

  function preorder(node: BSTNode | null) {
    if (!node) return;

    // Visit current first
    result.push(node.value);
    steps.push({
      id: `preorder-visit-${node.value}-${Date.now()}-${stepIndex}`,
      index: stepIndex++,
      type: 'found',
      description: `Visit ${node.value} → Result: [${result.join(', ')}]`,
      codeLine: 2,
      elements: [
        {
          elementId: `bst-node-${node.value}`,
          state: 'found' as ElementVisualState,
          motionProps: { animate: { scale: 1.15 } },
        },
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });

    steps.push({
      id: `preorder-visited-${node.value}-${Date.now()}-${stepIndex}`,
      index: stepIndex++,
      type: 'traverse',
      description: `Completed ${node.value}`,
      codeLine: 3,
      elements: [
        {
          elementId: `bst-node-${node.value}`,
          state: 'visited' as ElementVisualState,
          motionProps: { animate: { scale: 1, opacity: 0.7 } },
        },
      ],
      baseDuration: baseDurations.fast,
      isPausePoint: false,
    });

    // Then left
    if (node.left) {
      steps.push({
        id: `preorder-goleft-${node.value}-${Date.now()}-${stepIndex}`,
        index: stepIndex++,
        type: 'traverse',
        description: `Going left from ${node.value}`,
        codeLine: 4,
        elements: [],
        baseDuration: baseDurations.fast,
        isPausePoint: false,
      });
    }
    preorder(node.left);

    // Then right
    if (node.right) {
      steps.push({
        id: `preorder-goright-${node.value}-${Date.now()}-${stepIndex}`,
        index: stepIndex++,
        type: 'traverse',
        description: `Going right from ${node.value}`,
        codeLine: 5,
        elements: [],
        baseDuration: baseDurations.fast,
        isPausePoint: false,
      });
    }
    preorder(node.right);
  }

  preorder(state.root);

  const allNodeIds = getAllNodeIds(state.root);
  steps.push({
    id: `preorder-complete-${Date.now()}`,
    index: stepIndex,
    type: 'complete',
    description: `Preorder complete: [${result.join(', ')}]`,
    codeLine: 6,
    elements: allNodeIds.map((id) => ({
      elementId: id,
      state: 'default' as ElementVisualState,
      motionProps: { animate: { scale: 1, opacity: 1 } },
    })),
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  return { newState: state, steps };
}

export function createPostorderAnimation(
  state: BSTState
): { newState: BSTState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const result: number[] = [];

  steps.push({
    id: `postorder-start-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: 'Starting Postorder Traversal (Left → Right → Root)',
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  let stepIndex = 1;

  function postorder(node: BSTNode | null) {
    if (!node) return;

    // Left first
    if (node.left) {
      steps.push({
        id: `postorder-goleft-${node.value}-${Date.now()}-${stepIndex}`,
        index: stepIndex++,
        type: 'traverse',
        description: `Going left from ${node.value}`,
        codeLine: 2,
        elements: [
          {
            elementId: `bst-node-${node.value}`,
            state: 'comparing' as ElementVisualState,
            motionProps: { animate: { scale: 1.05 } },
          },
        ],
        baseDuration: baseDurations.fast,
        isPausePoint: false,
      });
    }
    postorder(node.left);

    // Right
    if (node.right) {
      steps.push({
        id: `postorder-goright-${node.value}-${Date.now()}-${stepIndex}`,
        index: stepIndex++,
        type: 'traverse',
        description: `Going right from ${node.value}`,
        codeLine: 3,
        elements: [],
        baseDuration: baseDurations.fast,
        isPausePoint: false,
      });
    }
    postorder(node.right);

    // Visit current last
    result.push(node.value);
    steps.push({
      id: `postorder-visit-${node.value}-${Date.now()}-${stepIndex}`,
      index: stepIndex++,
      type: 'found',
      description: `Visit ${node.value} → Result: [${result.join(', ')}]`,
      codeLine: 4,
      elements: [
        {
          elementId: `bst-node-${node.value}`,
          state: 'found' as ElementVisualState,
          motionProps: { animate: { scale: 1.15 } },
        },
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });

    steps.push({
      id: `postorder-visited-${node.value}-${Date.now()}-${stepIndex}`,
      index: stepIndex++,
      type: 'traverse',
      description: `Completed ${node.value}`,
      codeLine: 5,
      elements: [
        {
          elementId: `bst-node-${node.value}`,
          state: 'visited' as ElementVisualState,
          motionProps: { animate: { scale: 1, opacity: 0.7 } },
        },
      ],
      baseDuration: baseDurations.fast,
      isPausePoint: false,
    });
  }

  postorder(state.root);

  const allNodeIds = getAllNodeIds(state.root);
  steps.push({
    id: `postorder-complete-${Date.now()}`,
    index: stepIndex,
    type: 'complete',
    description: `Postorder complete: [${result.join(', ')}]`,
    codeLine: 6,
    elements: allNodeIds.map((id) => ({
      elementId: id,
      state: 'default' as ElementVisualState,
      motionProps: { animate: { scale: 1, opacity: 1 } },
    })),
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  return { newState: state, steps };
}

export function createBFSAnimation(
  state: BSTState
): { newState: BSTState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const result: number[] = [];

  steps.push({
    id: `bfs-start-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: 'Starting BFS Traversal (Level by Level)',
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  if (!state.root) {
    steps.push({
      id: `bfs-empty-${Date.now()}`,
      index: 1,
      type: 'complete',
      description: 'Tree is empty',
      codeLine: 2,
      elements: [],
      baseDuration: baseDurations.fast,
      isPausePoint: false,
    });
    return { newState: state, steps };
  }

  const queue: BSTNode[] = [state.root];
  const queueValues: number[] = [state.root.value];
  let stepIndex = 1;
  let level = 0;

  // Show initial queue
  steps.push({
    id: `bfs-queue-init-${Date.now()}`,
    index: stepIndex++,
    type: 'highlight',
    description: `Initialize queue with root: [${queueValues.join(', ')}]`,
    codeLine: 2,
    elements: [
      {
        elementId: `bst-node-${state.root.value}`,
        state: 'comparing' as ElementVisualState,
        motionProps: { animate: { scale: 1.05 } },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  while (queue.length > 0) {
    const levelSize = queue.length;

    steps.push({
      id: `bfs-level-${level}-${Date.now()}`,
      index: stepIndex++,
      type: 'traverse',
      description: `Processing Level ${level} (${levelSize} node${levelSize > 1 ? 's' : ''})`,
      codeLine: 3,
      elements: [],
      baseDuration: baseDurations.fast,
      isPausePoint: false,
    });

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      queueValues.shift();
      result.push(node.value);

      // Dequeue and visit
      steps.push({
        id: `bfs-dequeue-${node.value}-${Date.now()}`,
        index: stepIndex++,
        type: 'found',
        description: `Dequeue ${node.value} → Result: [${result.join(', ')}]`,
        codeLine: 4,
        elements: [
          {
            elementId: `bst-node-${node.value}`,
            state: 'found' as ElementVisualState,
            motionProps: { animate: { scale: 1.15 } },
          },
        ],
        baseDuration: baseDurations.normal,
        isPausePoint: true,
      });

      // Add children to queue
      if (node.left) {
        queue.push(node.left);
        queueValues.push(node.left.value);
      }
      if (node.right) {
        queue.push(node.right);
        queueValues.push(node.right.value);
      }

      if (node.left || node.right) {
        const childElements = [];
        if (node.left) {
          childElements.push({
            elementId: `bst-node-${node.left.value}`,
            state: 'comparing' as ElementVisualState,
            motionProps: { animate: { scale: 1.05 } },
          });
        }
        if (node.right) {
          childElements.push({
            elementId: `bst-node-${node.right.value}`,
            state: 'comparing' as ElementVisualState,
            motionProps: { animate: { scale: 1.05 } },
          });
        }

        steps.push({
          id: `bfs-enqueue-${node.value}-${Date.now()}`,
          index: stepIndex++,
          type: 'traverse',
          description: `Enqueue children of ${node.value} → Queue: [${queueValues.join(', ')}]`,
          codeLine: 5,
          elements: childElements,
          baseDuration: baseDurations.fast,
          isPausePoint: false,
        });
      }

      // Mark as visited
      steps.push({
        id: `bfs-visited-${node.value}-${Date.now()}`,
        index: stepIndex++,
        type: 'traverse',
        description: `Completed ${node.value}`,
        codeLine: 6,
        elements: [
          {
            elementId: `bst-node-${node.value}`,
            state: 'visited' as ElementVisualState,
            motionProps: { animate: { scale: 1, opacity: 0.7 } },
          },
        ],
        baseDuration: baseDurations.fast,
        isPausePoint: false,
      });
    }

    level++;
  }

  const allNodeIds = getAllNodeIds(state.root);
  steps.push({
    id: `bfs-complete-${Date.now()}`,
    index: stepIndex,
    type: 'complete',
    description: `BFS complete: [${result.join(', ')}]`,
    codeLine: 7,
    elements: allNodeIds.map((id) => ({
      elementId: id,
      state: 'default' as ElementVisualState,
      motionProps: { animate: { scale: 1, opacity: 1 } },
    })),
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  return { newState: state, steps };
}
