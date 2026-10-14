import type { IAnimationStep, ElementVisualState } from '@/core/interfaces';
import type { HashTableState, HashTableEntry } from '../config';
import { hashTableConfig } from '../config';
import { baseDurations } from '@/constants/animations';

export function createHashAnimation(
  state: HashTableState,
  key: string
): { newState: HashTableState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const bucketCount = state.buckets.length;

  // Step 1: Show the key
  steps.push({
    id: `hash-start-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Calculating hash for key "${key}"`,
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 2: Show hash calculation step by step
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    const charCode = key.charCodeAt(i);
    const prevHash = hash;
    hash = (hash * 31 + charCode) % bucketCount;

    steps.push({
      id: `hash-char-${i}-${Date.now()}`,
      index: steps.length,
      type: 'compare',
      description: `'${key[i]}' (${charCode}): hash = (${prevHash} × 31 + ${charCode}) % ${bucketCount} = ${Math.abs(hash)}`,
      codeLine: 3,
      elements: [],
      baseDuration: baseDurations.slow,
      isPausePoint: true,
    });
  }

  const finalBucket = Math.abs(hash);

  // Step 3: Show final bucket index
  steps.push({
    id: `hash-result-${Date.now()}`,
    index: steps.length,
    type: 'found',
    description: `Hash("${key}") = ${finalBucket} → Bucket[${finalBucket}]`,
    codeLine: 5,
    elements: [
      {
        elementId: `bucket-${finalBucket}`,
        state: 'found' as ElementVisualState,
        motionProps: {
          animate: { scale: 1.05 },
          transition: { type: 'spring', stiffness: 300 },
        },
      },
    ],
    baseDuration: baseDurations.slow,
    isPausePoint: true,
  });

  // Step 4: Complete
  steps.push({
    id: `hash-complete-${Date.now()}`,
    index: steps.length,
    type: 'complete',
    description: `Hash calculation complete: "${key}" → Bucket ${finalBucket}`,
    codeLine: 6,
    elements: [
      {
        elementId: `bucket-${finalBucket}`,
        state: 'default' as ElementVisualState,
        motionProps: {},
      },
    ],
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  return { newState: state, steps };
}

export function createInsertAnimation(
  state: HashTableState,
  key: string,
  value: number
): { newState: HashTableState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const buckets = state.buckets.map(b => ({ entries: [...b.entries] }));
  const bucketCount = buckets.length;

  // Step 1: Start insert
  steps.push({
    id: `insert-start-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Inserting key "${key}" with value ${value}`,
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 2: Calculate hash
  const bucketIndex = hashTableConfig.hashFunction(key, bucketCount);
  steps.push({
    id: `insert-hash-${Date.now()}`,
    index: steps.length,
    type: 'compare',
    description: `Hash("${key}") = ${bucketIndex}`,
    codeLine: 2,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 3: Go to bucket
  steps.push({
    id: `insert-bucket-${Date.now()}`,
    index: steps.length,
    type: 'traverse',
    description: `Going to Bucket[${bucketIndex}]`,
    codeLine: 3,
    elements: [
      {
        elementId: `bucket-${bucketIndex}`,
        state: 'current' as ElementVisualState,
        motionProps: {
          animate: { scale: 1.05 },
        },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Check for existing key or collision
  const existingBucket = buckets[bucketIndex]!;
  const existingIndex = existingBucket.entries.findIndex(e => e.key === key);
  const hasCollision = existingBucket.entries.length > 0 && existingIndex === -1;

  if (hasCollision) {
    // Step 4a: Show collision
    steps.push({
      id: `insert-collision-${Date.now()}`,
      index: steps.length,
      type: 'compare',
      description: `Collision detected! Bucket already has ${existingBucket.entries.length} entry(s)`,
      codeLine: 4,
      elements: existingBucket.entries.map((_, i) => ({
        elementId: `entry-${bucketIndex}-${i}`,
        state: 'comparing' as ElementVisualState,
        motionProps: {
          animate: { scale: 1.05 },
        },
      })),
      baseDuration: baseDurations.slow,
      isPausePoint: true,
    });

    // Step 4b: Add to chain
    steps.push({
      id: `insert-chain-${Date.now()}`,
      index: steps.length,
      type: 'insert',
      description: `Adding to chain (chaining collision resolution)`,
      codeLine: 5,
      elements: [
        {
          elementId: `entry-${bucketIndex}-${existingBucket.entries.length}`,
          state: 'modified' as ElementVisualState,
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
  } else if (existingIndex >= 0) {
    // Step 4c: Update existing key
    steps.push({
      id: `insert-update-${Date.now()}`,
      index: steps.length,
      type: 'found',
      description: `Key "${key}" already exists. Updating value from ${existingBucket.entries[existingIndex]!.value} to ${value}`,
      codeLine: 4,
      elements: [
        {
          elementId: `entry-${bucketIndex}-${existingIndex}`,
          state: 'modified' as ElementVisualState,
          motionProps: {
            animate: { scale: 1.1 },
          },
        },
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });
  } else {
    // Step 4d: Insert into empty bucket
    steps.push({
      id: `insert-empty-${Date.now()}`,
      index: steps.length,
      type: 'insert',
      description: `Bucket is empty. Inserting directly.`,
      codeLine: 4,
      elements: [
        {
          elementId: `entry-${bucketIndex}-0`,
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
  }

  // Step 5: Complete
  steps.push({
    id: `insert-complete-${Date.now()}`,
    index: steps.length,
    type: 'complete',
    description: `Successfully inserted "${key}": ${value}`,
    codeLine: 7,
    elements: [
      {
        elementId: `bucket-${bucketIndex}`,
        state: 'default' as ElementVisualState,
        motionProps: {},
      },
    ],
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  // Update state
  let newCollisionCount = state.collisionCount;
  let newSize = state.size;

  if (existingIndex >= 0) {
    buckets[bucketIndex]!.entries[existingIndex]!.value = value;
  } else {
    if (hasCollision) {
      newCollisionCount++;
    }
    buckets[bucketIndex]!.entries.push({ key, value });
    newSize++;
  }

  return {
    newState: {
      ...state,
      buckets,
      size: newSize,
      collisionCount: newCollisionCount,
    },
    steps,
  };
}

export function createSearchAnimation(
  state: HashTableState,
  key: string
): { newState: HashTableState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const bucketCount = state.buckets.length;

  // Step 1: Start search
  steps.push({
    id: `search-start-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Searching for key "${key}"`,
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 2: Calculate hash
  const bucketIndex = hashTableConfig.hashFunction(key, bucketCount);
  steps.push({
    id: `search-hash-${Date.now()}`,
    index: steps.length,
    type: 'compare',
    description: `Hash("${key}") = ${bucketIndex}`,
    codeLine: 2,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 3: Go to bucket
  steps.push({
    id: `search-bucket-${Date.now()}`,
    index: steps.length,
    type: 'traverse',
    description: `Looking in Bucket[${bucketIndex}]`,
    codeLine: 3,
    elements: [
      {
        elementId: `bucket-${bucketIndex}`,
        state: 'current' as ElementVisualState,
        motionProps: {
          animate: { scale: 1.05 },
        },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 4: Search through chain
  const bucket = state.buckets[bucketIndex]!;
  let foundEntry: HashTableEntry | null = null;
  let foundIndex = -1;

  for (let i = 0; i < bucket.entries.length; i++) {
    const entry = bucket.entries[i]!;
    const isMatch = entry.key === key;

    steps.push({
      id: `search-compare-${i}-${Date.now()}`,
      index: steps.length,
      type: 'compare',
      description: `Comparing "${entry.key}" with "${key}"${isMatch ? ' - Match!' : ' - No match'}`,
      codeLine: 4,
      elements: [
        {
          elementId: `entry-${bucketIndex}-${i}`,
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
      foundEntry = entry;
      foundIndex = i;
      break;
    }

    // Mark as visited
    steps.push({
      id: `search-visited-${i}-${Date.now()}`,
      index: steps.length,
      type: 'traverse',
      description: `"${entry.key}" ≠ "${key}", checking next in chain`,
      codeLine: 5,
      elements: [
        {
          elementId: `entry-${bucketIndex}-${i}`,
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

  // Step 5: Result
  if (foundEntry) {
    steps.push({
      id: `search-found-${Date.now()}`,
      index: steps.length,
      type: 'found',
      description: `Found! "${key}": ${foundEntry.value}`,
      codeLine: 6,
      elements: [
        {
          elementId: `entry-${bucketIndex}-${foundIndex}`,
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
  } else {
    steps.push({
      id: `search-notfound-${Date.now()}`,
      index: steps.length,
      type: 'not-found',
      description: `Key "${key}" not found in hash table`,
      codeLine: 7,
      elements: [
        {
          elementId: `bucket-${bucketIndex}`,
          state: 'deleting' as ElementVisualState,
          motionProps: {},
        },
      ],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });
  }

  // Step 6: Complete
  steps.push({
    id: `search-complete-${Date.now()}`,
    index: steps.length,
    type: 'complete',
    description: foundEntry
      ? `Search complete: "${key}" = ${foundEntry.value}`
      : `Search complete: key not found`,
    codeLine: 8,
    elements: [],
    baseDuration: baseDurations.fast,
    isPausePoint: false,
  });

  return { newState: state, steps };
}

export function createDeleteAnimation(
  state: HashTableState,
  key: string
): { newState: HashTableState; steps: IAnimationStep[] } {
  const steps: IAnimationStep[] = [];
  const buckets = state.buckets.map(b => ({ entries: [...b.entries] }));
  const bucketCount = buckets.length;

  // Step 1: Start delete
  steps.push({
    id: `delete-start-${Date.now()}`,
    index: 0,
    type: 'highlight',
    description: `Deleting key "${key}"`,
    codeLine: 1,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 2: Calculate hash
  const bucketIndex = hashTableConfig.hashFunction(key, bucketCount);
  steps.push({
    id: `delete-hash-${Date.now()}`,
    index: steps.length,
    type: 'compare',
    description: `Hash("${key}") = ${bucketIndex}`,
    codeLine: 2,
    elements: [],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 3: Go to bucket
  steps.push({
    id: `delete-bucket-${Date.now()}`,
    index: steps.length,
    type: 'traverse',
    description: `Going to Bucket[${bucketIndex}]`,
    codeLine: 3,
    elements: [
      {
        elementId: `bucket-${bucketIndex}`,
        state: 'current' as ElementVisualState,
        motionProps: {
          animate: { scale: 1.05 },
        },
      },
    ],
    baseDuration: baseDurations.normal,
    isPausePoint: true,
  });

  // Step 4: Find in chain
  const bucket = buckets[bucketIndex]!;
  let foundIndex = -1;

  for (let i = 0; i < bucket.entries.length; i++) {
    const entry = bucket.entries[i]!;
    const isMatch = entry.key === key;

    steps.push({
      id: `delete-compare-${i}-${Date.now()}`,
      index: steps.length,
      type: 'compare',
      description: `Checking "${entry.key}"${isMatch ? ' - Found!' : ''}`,
      codeLine: 4,
      elements: [
        {
          elementId: `entry-${bucketIndex}-${i}`,
          state: isMatch ? 'found' : 'comparing' as ElementVisualState,
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
      break;
    }
  }

  let newState = state;

  if (foundIndex >= 0) {
    const deletedEntry = bucket.entries[foundIndex]!;

    // Step 5a: Mark for deletion
    steps.push({
      id: `delete-mark-${Date.now()}`,
      index: steps.length,
      type: 'delete',
      description: `Removing "${deletedEntry.key}": ${deletedEntry.value} from chain`,
      codeLine: 5,
      elements: [
        {
          elementId: `entry-${bucketIndex}-${foundIndex}`,
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

    // Remove from bucket
    bucket.entries.splice(foundIndex, 1);

    steps.push({
      id: `delete-complete-${Date.now()}`,
      index: steps.length,
      type: 'complete',
      description: `Successfully deleted "${key}"`,
      codeLine: 7,
      elements: [],
      baseDuration: baseDurations.fast,
      isPausePoint: false,
    });

    newState = {
      ...state,
      buckets,
      size: state.size - 1,
    };
  } else {
    // Step 5b: Not found
    steps.push({
      id: `delete-notfound-${Date.now()}`,
      index: steps.length,
      type: 'not-found',
      description: `Key "${key}" not found - nothing to delete`,
      codeLine: 6,
      elements: [],
      baseDuration: baseDurations.normal,
      isPausePoint: true,
    });

    steps.push({
      id: `delete-complete-${Date.now()}`,
      index: steps.length,
      type: 'complete',
      description: `Delete operation complete: key not found`,
      codeLine: 7,
      elements: [],
      baseDuration: baseDurations.fast,
      isPausePoint: false,
    });
  }

  return { newState, steps };
}
