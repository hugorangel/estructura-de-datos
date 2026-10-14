import type { IAnimationStep, ElementVisualState } from '@/core/interfaces';
import type { SinglyLinkedListState, LinkedListNode } from '../config';
import { singlyLinkedListConfig } from '../config';
import { baseDurations } from '@/constants/animations';

export function createInsertAtHeadAnimation(
  state: SinglyLinkedListState,
  value: number
): { newState: SinglyLinkedListState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const newNodeId = `node-${Date.now()}`;

  // Step 1: Create new node
  steps.push({
    id: `insert-head-create-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Creating new node with value ${value}`,
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 2: New node appears
  steps.push({
    id: `insert-head-appear-${Date.now()}`,
    index: 1,
    type: 'insert',
    description: `New node appears with value ${value}`,
    codeLine: 2,
    elements: [
      {
        elementId: `linked-list-node-${newNodeId}`,
        state: 'found' as ElementVisualState,
        motionProps: {
          initial: { scale: 0, opacity: 0, y: -50 },
          animate: { scale: 1, opacity: 1, y: 0 },
          transition: { type: 'spring', stiffness: 300, damping: 25 },
        },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 3: Point new node's next to old head
  if (state.head) {
    steps.push({
      id: `insert-head-rewire-${Date.now()}`,
      index: 2,
      type: 'move',
      description: `Setting new node's next pointer to old head`,
      codeLine: 3,
      elements: [
        {
          elementId: `linked-list-pointer-${newNodeId}`,
          state: 'modified' as ElementVisualState,
          motionProps: {
            animate: { opacity: 1 },
            transition: { duration: 0.5 },
          },
        },
      ],
      baseDuration: baseDurations.slow,
      isPausePoint: true,
    });
  }

  // Step 4: Update head to point to new node
  steps.push({
    id: `insert-head-update-${Date.now()}`,
    index: steps.length,
    type: 'move',
    description: `Updating HEAD to point to new node`,
    codeLine: 4,
    elements: [
      {
        elementId: `linked-list-head-pointer`,
        state: 'modified' as ElementVisualState,
        motionProps: {
          animate: { x: 0 },
          transition: { duration: 0.3 },
        },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 5: Complete
  steps.push({
    id: `insert-head-complete-${Date.now()}`,
    index: steps.length,
    type: 'complete',
    description: `Successfully inserted ${value} at head`,
    codeLine: 5,
    elements: [],
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  // Create new state
  const newNode: LinkedListNode = {
    id: newNodeId,
    value,
    next: state.head,
  };

  const newState: SinglyLinkedListState = {
    nodes: [newNode, ...state.nodes],
    head: newNodeId,
  };

  return { newState, steps };
}

export function createInsertAtTailAnimation(
  state: SinglyLinkedListState,
  value: number
): { newState: SinglyLinkedListState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const newNodeId = `node-${Date.now()}`;
  const orderedNodes = singlyLinkedListConfig.getOrderedNodes(state);

  // Step 1: Start traversal
  steps.push({
    id: `insert-tail-start-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Traversing to find the tail node`,
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 2-N: Traverse to tail, highlighting each node
  orderedNodes.forEach((node, index) => {
    const isLast = index === orderedNodes.length - 1;
    steps.push({
      id: `insert-tail-traverse-${index}-${Date.now()}`,
      index: steps.length,
      type: 'traverse',
      description: isLast
        ? `Found tail node with value ${node.value}`
        : `Visiting node ${node.value}, moving to next`,
      codeLine: 2,
      elements: [
        {
          elementId: `linked-list-node-${node.id}`,
          state: (isLast ? 'found' : 'comparing') as ElementVisualState,
          motionProps: {
            animate: { scale: isLast ? 1.1 : 1.05 },
          },
        },
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: isLast,
    });
  });

  // Create new node
  steps.push({
    id: `insert-tail-create-${Date.now()}`,
    index: steps.length,
    type: 'insert',
    description: `Creating new node with value ${value}`,
    codeLine: 3,
    elements: [
      {
        elementId: `linked-list-node-${newNodeId}`,
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

  // Rewire tail's next pointer
  if (orderedNodes.length > 0) {
    const tailNode = orderedNodes[orderedNodes.length - 1];
    if (tailNode) {
      steps.push({
        id: `insert-tail-rewire-${Date.now()}`,
        index: steps.length,
        type: 'move',
        description: `Setting tail's next pointer to new node`,
        codeLine: 4,
        elements: [
          {
            elementId: `linked-list-pointer-${tailNode.id}`,
            state: 'modified' as ElementVisualState,
            motionProps: {
              animate: { opacity: 1 },
              transition: { duration: 0.5 },
            },
          },
        ],
        baseDuration: baseDurations.slow,
        isPausePoint: true,
      });
    }
  }

  // Complete
  steps.push({
    id: `insert-tail-complete-${Date.now()}`,
    index: steps.length,
    type: 'complete',
    description: `Successfully inserted ${value} at tail`,
    codeLine: 5,
    elements: orderedNodes.map((node) => ({
      elementId: `linked-list-node-${node.id}`,
      state: 'default' as ElementVisualState,
      motionProps: { animate: { scale: 1 } },
    })),
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  // Create new state
  const newNode: LinkedListNode = {
    id: newNodeId,
    value,
    next: null,
  };

  const lastNode = orderedNodes.length > 0 ? orderedNodes[orderedNodes.length - 1] : undefined;
  const updatedNodes = state.nodes.map((node) => {
    if (lastNode && node.id === lastNode.id) {
      return { ...node, next: newNodeId };
    }
    return node;
  });

  const newState: SinglyLinkedListState = {
    nodes: [...updatedNodes, newNode],
    head: state.head || newNodeId,
  };

  return { newState, steps };
}

export function createInsertAtPositionAnimation(
  state: SinglyLinkedListState,
  value: number,
  position: number
): { newState: SinglyLinkedListState; steps: IAnimationStep[] } {
  // Handle edge cases
  if (position === 0) {
    return createInsertAtHeadAnimation(state, value);
  }

  const orderedNodes = singlyLinkedListConfig.getOrderedNodes(state);
  if (position >= orderedNodes.length) {
    return createInsertAtTailAnimation(state, value);
  }

  const steps: IAnimationStep[] = [];
  const newNodeId = `node-${Date.now()}`;

  // Step 1: Start traversal
  steps.push({
    id: `insert-pos-start-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Traversing to position ${position}`,
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Traverse to position - 1
  for (let i = 0; i < position; i++) {
    const node = orderedNodes[i];
    if (!node) continue;
    const isTarget = i === position - 1;
    steps.push({
      id: `insert-pos-traverse-${i}-${Date.now()}`,
      index: steps.length,
      type: 'traverse',
      description: isTarget
        ? `Found insertion point after node ${node.value}`
        : `Visiting node ${node.value}`,
      codeLine: 2,
      elements: [
        {
          elementId: `linked-list-node-${node.id}`,
          state: (isTarget ? 'found' : 'visited') as ElementVisualState,
          motionProps: {
            animate: { scale: isTarget ? 1.1 : 1 },
          },
        },
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: isTarget,
    });
  }

  // Create new node
  steps.push({
    id: `insert-pos-create-${Date.now()}`,
    index: steps.length,
    type: 'insert',
    description: `Creating new node with value ${value}`,
    codeLine: 3,
    elements: [
      {
        elementId: `linked-list-node-${newNodeId}`,
        state: 'found' as ElementVisualState,
        motionProps: {
          initial: { scale: 0, opacity: 0, y: -30 },
          animate: { scale: 1, opacity: 1, y: 0 },
          transition: { type: 'spring', stiffness: 300, damping: 25 },
        },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Rewire pointers
  const prevNode = orderedNodes[position - 1];
  const nextNode = orderedNodes[position];

  if (prevNode && nextNode) {
    steps.push({
      id: `insert-pos-rewire-new-${Date.now()}`,
      index: steps.length,
      type: 'move',
      description: `Setting new node's next to ${nextNode.value}`,
      codeLine: 4,
      elements: [
        {
          elementId: `linked-list-pointer-${newNodeId}`,
          state: 'modified' as ElementVisualState,
          motionProps: {
            animate: { opacity: 1 },
            transition: { duration: 0.5 },
          },
        },
      ],
      baseDuration: baseDurations.slow,
      isPausePoint: true,
    });

    steps.push({
      id: `insert-pos-rewire-prev-${Date.now()}`,
      index: steps.length,
      type: 'move',
      description: `Updating ${prevNode.value}'s next to point to new node`,
      codeLine: 5,
      elements: [
        {
          elementId: `linked-list-pointer-${prevNode.id}`,
          state: 'modified' as ElementVisualState,
          motionProps: {
            animate: { opacity: 1 },
            transition: { duration: 0.5 },
          },
        },
      ],
      baseDuration: baseDurations.slow,
      isPausePoint: true,
    });
  }

  // Complete
  steps.push({
    id: `insert-pos-complete-${Date.now()}`,
    index: steps.length,
    type: 'complete',
    description: `Successfully inserted ${value} at position ${position}`,
    codeLine: 6,
    elements: [],
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  // Create new state
  const newNode: LinkedListNode = {
    id: newNodeId,
    value,
    next: nextNode?.id ?? null,
  };

  const updatedNodes = state.nodes.map((node) => {
    if (prevNode && node.id === prevNode.id) {
      return { ...node, next: newNodeId };
    }
    return node;
  });

  // Insert new node at correct position in array
  if (nextNode) {
    const insertIndex = state.nodes.findIndex((n) => n.id === nextNode.id);
    updatedNodes.splice(insertIndex, 0, newNode);
  } else {
    updatedNodes.push(newNode);
  }

  const newState: SinglyLinkedListState = {
    nodes: updatedNodes,
    head: state.head,
  };

  return { newState, steps };
}

export function createDeleteNodeAnimation(
  state: SinglyLinkedListState,
  value: number
): { newState: SinglyLinkedListState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const orderedNodes = singlyLinkedListConfig.getOrderedNodes(state);

  // Find the node to delete
  let targetIndex = -1;
  for (let i = 0; i < orderedNodes.length; i++) {
    const node = orderedNodes[i];
    if (node && node.value === value) {
      targetIndex = i;
      break;
    }
  }

  // Step 1: Start search
  steps.push({
    id: `delete-start-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Searching for node with value ${value}`,
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Traverse to find node
  const searchEnd = Math.min(targetIndex >= 0 ? targetIndex : orderedNodes.length - 1, orderedNodes.length - 1);
  for (let i = 0; i <= searchEnd; i++) {
    const node = orderedNodes[i];
    if (!node) continue;
    const isTarget = node.value === value;

    steps.push({
      id: `delete-search-${i}-${Date.now()}`,
      index: steps.length,
      type: 'compare',
      description: isTarget
        ? `Found node with value ${value}!`
        : `Checking node ${node.value} - not a match`,
      codeLine: 2,
      elements: [
        {
          elementId: `linked-list-node-${node.id}`,
          state: (isTarget ? 'deleting' : 'comparing') as ElementVisualState,
          motionProps: {
            animate: { scale: isTarget ? 1.1 : 1.05 },
          },
        },
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: isTarget,
    });

    if (isTarget) break;

    // Mark as visited
    steps.push({
      id: `delete-visited-${i}-${Date.now()}`,
      index: steps.length,
      type: 'traverse',
      description: `Moving to next node`,
      codeLine: 3,
      elements: [
        {
          elementId: `linked-list-node-${node.id}`,
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

  if (targetIndex === -1) {
    // Node not found
    steps.push({
      id: `delete-notfound-${Date.now()}`,
      index: steps.length,
      type: 'not-found',
      description: `Node with value ${value} not found`,
      codeLine: 4,
      elements: [],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });

    return { newState: state, steps };
  }

  const targetNode = orderedNodes[targetIndex];
  if (!targetNode) {
    return { newState: state, steps };
  }

  const prevNode = targetIndex > 0 ? orderedNodes[targetIndex - 1] : null;
  const nextNode = targetIndex < orderedNodes.length - 1 ? orderedNodes[targetIndex + 1] : null;

  // Highlight previous node if exists
  if (prevNode) {
    steps.push({
      id: `delete-highlight-prev-${Date.now()}`,
      index: steps.length,
      type: 'highlight',
      description: `Identifying previous node (${prevNode.value})`,
      codeLine: 4,
      elements: [
        {
          elementId: `linked-list-node-${prevNode.id}`,
          state: 'found' as ElementVisualState,
          motionProps: {
            animate: { scale: 1.05 },
          },
        },
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });
  }

  // Rewire pointer (or update head)
  if (prevNode) {
    steps.push({
      id: `delete-rewire-${Date.now()}`,
      index: steps.length,
      type: 'move',
      description: nextNode
        ? `Rewiring ${prevNode.value}'s next to ${nextNode.value}`
        : `Setting ${prevNode.value}'s next to null`,
      codeLine: 5,
      elements: [
        {
          elementId: `linked-list-pointer-${prevNode.id}`,
          state: 'modified' as ElementVisualState,
          motionProps: {
            animate: { opacity: 1 },
            transition: { duration: 0.5 },
          },
        },
      ],
      baseDuration: baseDurations.slow,
      isPausePoint: true,
    });
  } else {
    steps.push({
      id: `delete-update-head-${Date.now()}`,
      index: steps.length,
      type: 'move',
      description: nextNode
        ? `Updating HEAD to point to ${nextNode.value}`
        : `Setting HEAD to null (list now empty)`,
      codeLine: 5,
      elements: [
        {
          elementId: `linked-list-head-pointer`,
          state: 'modified' as ElementVisualState,
          motionProps: {
            animate: { x: nextNode ? 1 : 0 },
            transition: { duration: 0.3 },
          },
        },
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });
  }

  // Fade out target node
  steps.push({
    id: `delete-remove-${Date.now()}`,
    index: steps.length,
    type: 'delete',
    description: `Removing node ${value} from memory`,
    codeLine: 6,
    elements: [
      {
        elementId: `linked-list-node-${targetNode.id}`,
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

  // Complete
  steps.push({
    id: `delete-complete-${Date.now()}`,
    index: steps.length,
    type: 'complete',
    description: `Successfully deleted node with value ${value}`,
    codeLine: 7,
    elements: orderedNodes
      .filter((n) => n.id !== targetNode.id)
      .map((node) => ({
        elementId: `linked-list-node-${node.id}`,
        state: 'default' as ElementVisualState,
        motionProps: { animate: { scale: 1, opacity: 1 } },
      })),
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  // Create new state
  const updatedNodes = state.nodes
    .filter((node) => node.id !== targetNode.id)
    .map((node) => {
      if (prevNode && node.id === prevNode.id) {
        return { ...node, next: nextNode?.id ?? null };
      }
      return node;
    });

  const newState: SinglyLinkedListState = {
    nodes: updatedNodes,
    head: targetIndex === 0 ? (nextNode?.id ?? null) : state.head,
  };

  return { newState, steps };
}

export function createSearchAnimation(
  state: SinglyLinkedListState,
  value: number
): { newState: SinglyLinkedListState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const orderedNodes = singlyLinkedListConfig.getOrderedNodes(state);
  let foundIndex = -1;

  // Step 1: Start search
  steps.push({
    id: `search-start-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Starting search for value ${value}`,
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Traverse and compare
  for (let i = 0; i < orderedNodes.length; i++) {
    const node = orderedNodes[i];
    if (!node) continue;
    const isMatch = node.value === value;

    steps.push({
      id: `search-compare-${i}-${Date.now()}`,
      index: steps.length,
      type: 'compare',
      description: `Comparing node value ${node.value} with ${value}${isMatch ? ' - Match!' : ''}`,
      codeLine: 2,
      elements: [
        {
          elementId: `linked-list-node-${node.id}`,
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
        description: `Found ${value} at position ${i}!`,
        codeLine: 3,
        elements: [
          {
            elementId: `linked-list-node-${node.id}`,
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

    // Mark as visited and move to next
    steps.push({
      id: `search-visited-${i}-${Date.now()}`,
      index: steps.length,
      type: 'traverse',
      description: `${node.value} != ${value}, following next pointer`,
      codeLine: 4,
      elements: [
        {
          elementId: `linked-list-node-${node.id}`,
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

  if (foundIndex === -1) {
    steps.push({
      id: `search-notfound-${Date.now()}`,
      index: steps.length,
      type: 'not-found',
      description: `Value ${value} not found in linked list`,
      codeLine: 5,
      elements: [],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });
  }

  // Complete
  steps.push({
    id: `search-complete-${Date.now()}`,
    index: steps.length,
    type: 'complete',
    description: foundIndex >= 0
      ? `Search complete: found at position ${foundIndex}`
      : `Search complete: value not found`,
    codeLine: 6,
    elements: orderedNodes.map((node) => ({
      elementId: `linked-list-node-${node.id}`,
      state: 'default' as ElementVisualState,
      motionProps: { animate: { scale: 1, opacity: 1 } },
    })),
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  return { newState: state, steps };
}

export function createTraverseAnimation(
  state: SinglyLinkedListState
): { newState: SinglyLinkedListState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const orderedNodes = singlyLinkedListConfig.getOrderedNodes(state);

  // Step 1: Start traversal
  steps.push({
    id: `traverse-start-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Starting traversal from HEAD`,
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Visit each node
  orderedNodes.forEach((node, index) => {
    if (!node) return;

    steps.push({
      id: `traverse-visit-${index}-${Date.now()}`,
      index: steps.length,
      type: 'traverse',
      description: `Visiting node ${index}: value = ${node.value}`,
      codeLine: 2,
      elements: [
        {
          elementId: `linked-list-node-${node.id}`,
          state: 'comparing' as ElementVisualState,
          motionProps: {
            animate: { scale: 1.1 },
            transition: { type: 'spring', stiffness: 300 },
          },
        },
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });

    // Follow pointer to next
    if (node.next) {
      steps.push({
        id: `traverse-follow-${index}-${Date.now()}`,
        index: steps.length,
        type: 'move',
        description: `Following next pointer`,
        codeLine: 3,
        elements: [
          {
            elementId: `linked-list-pointer-${node.id}`,
            state: 'found' as ElementVisualState,
            motionProps: {
              animate: { opacity: 1 },
            },
          },
          {
            elementId: `linked-list-node-${node.id}`,
            state: 'visited' as ElementVisualState,
            motionProps: {
              animate: { scale: 1, opacity: 0.7 },
            },
          },
        ],
        baseDuration: baseDurations.fast,
        isPausePoint: false,
      });
    } else {
      // Reached null
      steps.push({
        id: `traverse-null-${Date.now()}`,
        index: steps.length,
        type: 'highlight',
        description: `Reached null - end of list`,
        codeLine: 4,
        elements: [
          {
            elementId: `linked-list-null`,
            state: 'found' as ElementVisualState,
            motionProps: {
              animate: { scale: 1.1 },
            },
          },
        ],
        baseDuration: baseDurations.normal,
        isPausePoint: true,
      });
    }
  });

  // Complete
  steps.push({
    id: `traverse-complete-${Date.now()}`,
    index: steps.length,
    type: 'complete',
    description: `Traversal complete: visited ${orderedNodes.length} nodes`,
    codeLine: 5,
    elements: orderedNodes.map((node) => ({
      elementId: `linked-list-node-${node.id}`,
      state: 'default' as ElementVisualState,
      motionProps: { animate: { scale: 1, opacity: 1 } },
    })),
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  return { newState: state, steps };
}
