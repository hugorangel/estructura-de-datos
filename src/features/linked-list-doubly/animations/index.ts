import type { IAnimationStep, ElementVisualState } from '@/core/interfaces';
import type { DoublyLinkedListState, DoublyLinkedListNode } from '../config';
import { baseDurations } from '@/constants/animations';

let nodeCounter = 100;

function generateNodeId(): string {
  return `node-${nodeCounter++}`;
}

export function createInsertAtHeadAnimation(
  state: DoublyLinkedListState,
  value: number
): { newState: DoublyLinkedListState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const newNodeId = generateNodeId();
  const currentHead = state.nodes.find((n) => n.id === state.head);

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

  // Step 2: Set new node's next to current head
  steps.push({
    id: `insert-head-next-${Date.now()}`,
    index: 1,
    type: 'move',
    description: `Setting new node's next pointer to current head${currentHead ? ` (${currentHead.value})` : ' (null)'}`,
    codeLine: 2,
    elements: [
      {
        elementId: `pointer-${newNodeId}-next`,
        state: 'modified' as ElementVisualState,
        motionProps: {
          animate: { opacity: 1 },
          transition: { duration: 0.3 },
        },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 3: Update old head's prev to new node
  if (state.head) {
    steps.push({
      id: `insert-head-prev-${Date.now()}`,
      index: 2,
      type: 'move',
      description: `Setting old head's prev pointer to new node`,
      codeLine: 3,
      elements: [
        {
          elementId: `pointer-${state.head}-prev`,
          state: 'modified' as ElementVisualState,
          motionProps: {
            animate: { opacity: 1 },
            transition: { duration: 0.3 },
          },
        },
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });
  }

  // Step 4: Update head pointer
  steps.push({
    id: `insert-head-update-${Date.now()}`,
    index: steps.length,
    type: 'insert',
    description: `Updating HEAD pointer to new node`,
    codeLine: 4,
    elements: [
      {
        elementId: `node-${newNodeId}`,
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
  const newNode: DoublyLinkedListNode = {
    id: newNodeId,
    value,
    prev: null,
    next: state.head,
  };

  const updatedNodes = state.nodes.map((node) =>
    node.id === state.head ? { ...node, prev: newNodeId } : node
  );

  return {
    newState: {
      nodes: [newNode, ...updatedNodes],
      head: newNodeId,
      tail: state.tail ?? newNodeId,
    },
    steps,
  };
}

export function createInsertAtTailAnimation(
  state: DoublyLinkedListState,
  value: number
): { newState: DoublyLinkedListState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const newNodeId = generateNodeId();
  const currentTail = state.nodes.find((n) => n.id === state.tail);

  // Step 1: Create new node
  steps.push({
    id: `insert-tail-create-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Creating new node with value ${value}`,
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 2: Set new node's prev to current tail
  steps.push({
    id: `insert-tail-prev-${Date.now()}`,
    index: 1,
    type: 'move',
    description: `Setting new node's prev pointer to current tail${currentTail ? ` (${currentTail.value})` : ' (null)'}`,
    codeLine: 2,
    elements: [
      {
        elementId: `pointer-${newNodeId}-prev`,
        state: 'modified' as ElementVisualState,
        motionProps: {
          animate: { opacity: 1 },
          transition: { duration: 0.3 },
        },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 3: Update old tail's next to new node
  if (state.tail) {
    steps.push({
      id: `insert-tail-next-${Date.now()}`,
      index: 2,
      type: 'move',
      description: `Setting old tail's next pointer to new node`,
      codeLine: 3,
      elements: [
        {
          elementId: `pointer-${state.tail}-next`,
          state: 'modified' as ElementVisualState,
          motionProps: {
            animate: { opacity: 1 },
            transition: { duration: 0.3 },
          },
        },
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });
  }

  // Step 4: Update tail pointer
  steps.push({
    id: `insert-tail-update-${Date.now()}`,
    index: steps.length,
    type: 'insert',
    description: `Updating TAIL pointer to new node`,
    codeLine: 4,
    elements: [
      {
        elementId: `node-${newNodeId}`,
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

  // Step 5: Complete
  steps.push({
    id: `insert-tail-complete-${Date.now()}`,
    index: steps.length,
    type: 'complete',
    description: `Successfully inserted ${value} at tail`,
    codeLine: 5,
    elements: [],
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  // Create new state
  const newNode: DoublyLinkedListNode = {
    id: newNodeId,
    value,
    prev: state.tail,
    next: null,
  };

  const updatedNodes = state.nodes.map((node) =>
    node.id === state.tail ? { ...node, next: newNodeId } : node
  );

  return {
    newState: {
      nodes: [...updatedNodes, newNode],
      head: state.head ?? newNodeId,
      tail: newNodeId,
    },
    steps,
  };
}

export function createInsertAtPositionAnimation(
  state: DoublyLinkedListState,
  value: number,
  position: number
): { newState: DoublyLinkedListState; steps: IAnimationStep[] } {
  // Handle edge cases
  if (position === 0) {
    return createInsertAtHeadAnimation(state, value);
  }
  if (position >= state.nodes.length) {
    return createInsertAtTailAnimation(state, value);
  }

  const steps: IAnimationStep[] = [];
  const newNodeId = generateNodeId();

  // Step 1: Traverse to position
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

  // Traverse forward to the position
  for (let i = 0; i < position; i++) {
    const currentNode = state.nodes[i];
    if (currentNode) {
      steps.push({
        id: `insert-pos-traverse-${i}-${Date.now()}`,
        index: steps.length,
        type: 'traverse',
        description: `At node ${currentNode.value} (position ${i})`,
        codeLine: 2,
        elements: [
          {
            elementId: `node-${currentNode.id}`,
            state: 'comparing' as ElementVisualState,
            motionProps: {
              animate: { scale: 1.05 },
            },
          },
        ],
        baseDuration: baseDurations.fast,
        isPausePoint: false,
      });
    }
  }

  const prevNode = state.nodes[position - 1];
  const nextNode = state.nodes[position];

  if (!prevNode || !nextNode) {
    return { newState: state, steps };
  }

  // Step 2: Found position, create new node
  steps.push({
    id: `insert-pos-create-${Date.now()}`,
    index: steps.length,
    type: 'highlight',
    description: `Creating new node with value ${value} between ${prevNode.value} and ${nextNode.value}`,
    codeLine: 3,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 3: Update new node's prev pointer
  steps.push({
    id: `insert-pos-prev-${Date.now()}`,
    index: steps.length,
    type: 'move',
    description: `Setting new node's prev to ${prevNode.value}`,
    codeLine: 4,
    elements: [
      {
        elementId: `pointer-${newNodeId}-prev`,
        state: 'modified' as ElementVisualState,
        motionProps: {},
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 4: Update new node's next pointer
  steps.push({
    id: `insert-pos-next-${Date.now()}`,
    index: steps.length,
    type: 'move',
    description: `Setting new node's next to ${nextNode.value}`,
    codeLine: 5,
    elements: [
      {
        elementId: `pointer-${newNodeId}-next`,
        state: 'modified' as ElementVisualState,
        motionProps: {},
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 5: Update prev node's next pointer
  steps.push({
    id: `insert-pos-prev-next-${Date.now()}`,
    index: steps.length,
    type: 'move',
    description: `Updating ${prevNode.value}'s next pointer to new node`,
    codeLine: 6,
    elements: [
      {
        elementId: `pointer-${prevNode.id}-next`,
        state: 'modified' as ElementVisualState,
        motionProps: {},
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 6: Update next node's prev pointer
  steps.push({
    id: `insert-pos-next-prev-${Date.now()}`,
    index: steps.length,
    type: 'move',
    description: `Updating ${nextNode.value}'s prev pointer to new node`,
    codeLine: 7,
    elements: [
      {
        elementId: `pointer-${nextNode.id}-prev`,
        state: 'modified' as ElementVisualState,
        motionProps: {},
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 7: Insert complete
  steps.push({
    id: `insert-pos-complete-${Date.now()}`,
    index: steps.length,
    type: 'complete',
    description: `Successfully inserted ${value} at position ${position}`,
    codeLine: 8,
    elements: [],
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  // Create new state
  const newNode: DoublyLinkedListNode = {
    id: newNodeId,
    value,
    prev: prevNode.id,
    next: nextNode.id,
  };

  const updatedNodes = state.nodes.map((node) => {
    if (node.id === prevNode.id) {
      return { ...node, next: newNodeId };
    }
    if (node.id === nextNode.id) {
      return { ...node, prev: newNodeId };
    }
    return node;
  });

  const newNodes = [
    ...updatedNodes.slice(0, position),
    newNode,
    ...updatedNodes.slice(position),
  ];

  return {
    newState: {
      nodes: newNodes,
      head: state.head,
      tail: state.tail,
    },
    steps,
  };
}

export function createDeleteNodeAnimation(
  state: DoublyLinkedListState,
  position: number
): { newState: DoublyLinkedListState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const nodeToDelete = state.nodes[position];

  if (!nodeToDelete) {
    return { newState: state, steps };
  }

  const prevNode = position > 0 ? state.nodes[position - 1] : null;
  const nextNode = position < state.nodes.length - 1 ? state.nodes[position + 1] : null;

  // Step 1: Highlight node to delete
  steps.push({
    id: `delete-highlight-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Deleting node with value ${nodeToDelete.value} at position ${position}`,
    codeLine: 1,
    elements: [
      {
        elementId: `node-${nodeToDelete.id}`,
        state: 'deleting' as ElementVisualState,
        motionProps: {
          animate: { scale: 0.9, opacity: 0.5 },
        },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 2: Update prev node's next pointer (skip deleted node)
  if (prevNode) {
    steps.push({
      id: `delete-prev-next-${Date.now()}`,
      index: steps.length,
      type: 'move',
      description: `Updating ${prevNode.value}'s next pointer to ${nextNode ? nextNode.value : 'null'}`,
      codeLine: 2,
      elements: [
        {
          elementId: `pointer-${prevNode.id}-next`,
          state: 'modified' as ElementVisualState,
          motionProps: {},
        },
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });
  } else {
    steps.push({
      id: `delete-update-head-${Date.now()}`,
      index: steps.length,
      type: 'move',
      description: `Updating HEAD pointer to ${nextNode ? nextNode.value : 'null'}`,
      codeLine: 2,
      elements: [],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });
  }

  // Step 3: Update next node's prev pointer (skip deleted node)
  if (nextNode) {
    steps.push({
      id: `delete-next-prev-${Date.now()}`,
      index: steps.length,
      type: 'move',
      description: `Updating ${nextNode.value}'s prev pointer to ${prevNode ? prevNode.value : 'null'}`,
      codeLine: 3,
      elements: [
        {
          elementId: `pointer-${nextNode.id}-prev`,
          state: 'modified' as ElementVisualState,
          motionProps: {},
        },
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });
  } else {
    steps.push({
      id: `delete-update-tail-${Date.now()}`,
      index: steps.length,
      type: 'move',
      description: `Updating TAIL pointer to ${prevNode ? prevNode.value : 'null'}`,
      codeLine: 3,
      elements: [],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });
  }

  // Step 4: Remove node
  steps.push({
    id: `delete-remove-${Date.now()}`,
    index: steps.length,
    type: 'delete',
    description: `Removing node ${nodeToDelete.value}`,
    codeLine: 4,
    elements: [
      {
        elementId: `node-${nodeToDelete.id}`,
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

  // Step 5: Complete
  steps.push({
    id: `delete-complete-${Date.now()}`,
    index: steps.length,
    type: 'complete',
    description: `Successfully deleted node at position ${position}`,
    codeLine: 5,
    elements: [],
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  // Create new state
  const newNodes = state.nodes
    .filter((node) => node.id !== nodeToDelete.id)
    .map((node) => {
      if (prevNode && node.id === prevNode.id) {
        return { ...node, next: nextNode?.id ?? null };
      }
      if (nextNode && node.id === nextNode.id) {
        return { ...node, prev: prevNode?.id ?? null };
      }
      return node;
    });

  return {
    newState: {
      nodes: newNodes,
      head: prevNode ? state.head : nextNode?.id ?? null,
      tail: nextNode ? state.tail : prevNode?.id ?? null,
    },
    steps,
  };
}

export function createTraverseForwardAnimation(
  state: DoublyLinkedListState
): { newState: DoublyLinkedListState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];

  // Step 1: Start at head
  steps.push({
    id: `traverse-forward-start-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Starting forward traversal from HEAD`,
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Traverse each node left to right
  for (let i = 0; i < state.nodes.length; i++) {
    const node = state.nodes[i];
    if (!node) continue;

    steps.push({
      id: `traverse-forward-${i}-${Date.now()}`,
      index: steps.length,
      type: 'traverse',
      description: `Visiting node ${node.value}${i < state.nodes.length - 1 ? ', following next pointer' : ''}`,
      codeLine: 2,
      elements: [
        {
          elementId: `node-${node.id}`,
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

    // Show following next pointer (except for last node)
    if (i < state.nodes.length - 1) {
      const nextNode = state.nodes[i + 1];
      steps.push({
        id: `traverse-forward-arrow-${i}-${Date.now()}`,
        index: steps.length,
        type: 'move',
        description: `Following next pointer to ${nextNode?.value ?? 'null'}`,
        codeLine: 3,
        elements: [
          {
            elementId: `pointer-${node.id}-next`,
            state: 'found' as ElementVisualState,
            motionProps: {},
          },
        ],
        baseDuration: baseDurations.fast,
        isPausePoint: false,
      });
    }
  }

  // Step: Reached tail
  steps.push({
    id: `traverse-forward-complete-${Date.now()}`,
    index: steps.length,
    type: 'complete',
    description: `Forward traversal complete - reached TAIL (null)`,
    codeLine: 4,
    elements: [],
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  return { newState: state, steps };
}

export function createTraverseBackwardAnimation(
  state: DoublyLinkedListState
): { newState: DoublyLinkedListState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];

  // Step 1: Start at tail
  steps.push({
    id: `traverse-backward-start-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Starting backward traversal from TAIL`,
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Traverse each node right to left
  for (let i = state.nodes.length - 1; i >= 0; i--) {
    const node = state.nodes[i];
    if (!node) continue;

    steps.push({
      id: `traverse-backward-${i}-${Date.now()}`,
      index: steps.length,
      type: 'traverse',
      description: `Visiting node ${node.value}${i > 0 ? ', following prev pointer' : ''}`,
      codeLine: 2,
      elements: [
        {
          elementId: `node-${node.id}`,
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

    // Show following prev pointer (except for first node)
    if (i > 0) {
      const prevNode = state.nodes[i - 1];
      steps.push({
        id: `traverse-backward-arrow-${i}-${Date.now()}`,
        index: steps.length,
        type: 'move',
        description: `Following prev pointer to ${prevNode?.value ?? 'null'}`,
        codeLine: 3,
        elements: [
          {
            elementId: `pointer-${node.id}-prev`,
            state: 'found' as ElementVisualState,
            motionProps: {},
          },
        ],
        baseDuration: baseDurations.fast,
        isPausePoint: false,
      });
    }
  }

  // Step: Reached head
  steps.push({
    id: `traverse-backward-complete-${Date.now()}`,
    index: steps.length,
    type: 'complete',
    description: `Backward traversal complete - reached HEAD (null)`,
    codeLine: 4,
    elements: [],
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  return { newState: state, steps };
}
