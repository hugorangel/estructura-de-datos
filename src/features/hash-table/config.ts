import type { IComplexityInfo } from '@/core/interfaces';

export type CollisionStrategy = 'chaining' | 'linear-probing';

export interface HashTableEntry {
  key: string;
  value: number;
}

export interface Bucket {
  entries: HashTableEntry[];
}

export interface HashTableState {
  buckets: Bucket[];
  size: number;
  collisionStrategy: CollisionStrategy;
  collisionCount: number;
}

export const hashTableConfig = {
  id: 'hash-table',
  name: 'Hash Table',
  description: 'A data structure that maps keys to values using a hash function for O(1) average access',
  slug: 'hash-table',
  icon: 'hash',
  category: 'hash' as const,

  complexity: {
    average: {
      access: { time: 'O(1)', explanation: 'Direct bucket access via hash function' },
      search: { time: 'O(1)', explanation: 'Hash to bucket, then check entries' },
      insert: { time: 'O(1)', explanation: 'Hash to bucket, add to chain' },
      delete: { time: 'O(1)', explanation: 'Hash to bucket, remove from chain' },
    },
    worst: {
      access: { time: 'O(n)', explanation: 'All keys collide to same bucket' },
      search: { time: 'O(n)', explanation: 'All keys in one chain' },
      insert: { time: 'O(n)', explanation: 'All keys collide, traverse entire chain' },
      delete: { time: 'O(n)', explanation: 'All keys collide, search entire chain' },
    },
    best: {
      access: { time: 'O(1)', explanation: 'No collisions' },
      search: { time: 'O(1)', explanation: 'Key at first position in bucket' },
      insert: { time: 'O(1)', explanation: 'Empty bucket' },
      delete: { time: 'O(1)', explanation: 'Key at first position' },
    },
    space: 'O(n)',
  } as IComplexityInfo,

  bucketCount: 8,

  // Simple hash function for demonstration
  hashFunction: (key: string, bucketCount: number): number => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) % bucketCount;
    }
    return Math.abs(hash);
  },

  getInitialState: (): HashTableState => {
    const buckets: Bucket[] = Array.from({ length: 8 }, () => ({ entries: [] }));

    // Pre-populate with some entries including collisions to demonstrate chaining
    const initialEntries: HashTableEntry[] = [
      { key: 'apple', value: 5 },
      { key: 'banana', value: 12 },
      { key: 'cherry', value: 8 },
      { key: 'date', value: 3 },
      { key: 'grape', value: 15 },  // Designed to collide with some keys
    ];

    let collisionCount = 0;
    initialEntries.forEach(entry => {
      const bucketIndex = hashTableConfig.hashFunction(entry.key, 8);
      if (buckets[bucketIndex]!.entries.length > 0) {
        collisionCount++;
      }
      buckets[bucketIndex]!.entries.push(entry);
    });

    return {
      buckets,
      size: initialEntries.length,
      collisionStrategy: 'chaining',
      collisionCount,
    };
  },

  generateRandomData: (size = 5): HashTableEntry[] => {
    const words = ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa'];
    const shuffled = words.sort(() => Math.random() - 0.5).slice(0, size);
    return shuffled.map(word => ({
      key: word,
      value: Math.floor(Math.random() * 100),
    }));
  },

  validate: (
    params: { key?: string; value?: number },
    operation: string,
    _state: HashTableState
  ) => {
    if (operation === 'insert') {
      if (!params.key || params.key.trim() === '') {
        return { valid: false, error: 'Key is required' };
      }
      if (params.value === undefined) {
        return { valid: false, error: 'Value is required' };
      }
    }
    if (operation === 'search' || operation === 'delete' || operation === 'hash') {
      if (!params.key || params.key.trim() === '') {
        return { valid: false, error: 'Key is required' };
      }
    }
    return { valid: true };
  },

  getLoadFactor: (state: HashTableState): number => {
    return state.size / state.buckets.length;
  },
};
