import type { ICodeSnippets } from '@/core/interfaces';

export const hashTableCodeSnippets: ICodeSnippets = {
  hash: {
    typescript: {
      language: 'typescript',
      code: `function hash(key: string, bucketCount: number): number {
  let hash = 0;
  // Iterate through each character
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) % bucketCount;
  }
  return Math.abs(hash);
}`,
      lineMap: { 0: 1, 1: 1, 2: 3, 3: 4, 4: 4, 5: 6, 6: 6 },
    },
    javascript: {
      language: 'javascript',
      code: `function hash(key, bucketCount) {
  let hash = 0;
  // Iterate through each character
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) % bucketCount;
  }
  return Math.abs(hash);
}`,
      lineMap: { 0: 1, 1: 1, 2: 3, 3: 4, 4: 4, 5: 6, 6: 6 },
    },
    csharp: {
      language: 'csharp',
      code: `public static int Hash(string key, int bucketCount) {
    int hash = 0;
    // Iterate through each character
    foreach (char c in key) {
        hash = (hash * 31 + c) % bucketCount;
    }
    return Math.Abs(hash);
}`,
      lineMap: { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 7, 6: 7 },
    },
  },
  insert: {
    typescript: {
      language: 'typescript',
      code: `function insert(table: Map<string, number>[], key: string, value: number): void {
  // Calculate bucket index
  const index = hash(key, table.length);

  // Go to bucket
  const bucket = table[index];

  // Check for existing key (update) or add new
  const existing = bucket.find(e => e.key === key);
  if (existing) {
    existing.value = value; // Update
  } else {
    bucket.push({ key, value }); // Insert (handles collision via chaining)
  }
}`,
      lineMap: { 0: 1, 1: 2, 2: 2, 3: 3, 4: 3, 5: 4, 6: 4, 7: 7 },
    },
    javascript: {
      language: 'javascript',
      code: `function insert(table, key, value) {
  // Calculate bucket index
  const index = hash(key, table.length);

  // Go to bucket
  const bucket = table[index];

  // Check for existing key (update) or add new
  const existing = bucket.find(e => e.key === key);
  if (existing) {
    existing.value = value; // Update
  } else {
    bucket.push({ key, value }); // Insert (handles collision via chaining)
  }
}`,
      lineMap: { 0: 1, 1: 2, 2: 2, 3: 3, 4: 3, 5: 4, 6: 4, 7: 7 },
    },
    csharp: {
      language: 'csharp',
      code: `public void Insert(string key, int value) {
    // Calculate bucket index
    int index = Hash(key, _buckets.Length);

    // Go to bucket
    var bucket = _buckets[index];

    // Check for existing key (update) or add new
    var existing = bucket.FirstOrDefault(e => e.Key == key);
    if (existing != null) {
        existing.Value = value; // Update
    } else {
        bucket.Add(new Entry(key, value)); // Insert (chaining)
    }
}`,
      lineMap: { 0: 1, 1: 2, 2: 2, 3: 3, 4: 3, 5: 4, 6: 4, 7: 7 },
    },
  },
  search: {
    typescript: {
      language: 'typescript',
      code: `function search(table: Map<string, number>[], key: string): number | null {
  // Calculate bucket index
  const index = hash(key, table.length);

  // Go to bucket
  const bucket = table[index];

  // Search through chain
  for (const entry of bucket) {
    if (entry.key === key) {
      return entry.value; // Found!
    }
  }
  return null; // Not found
}`,
      lineMap: { 0: 1, 1: 2, 2: 2, 3: 3, 4: 3, 5: 4, 6: 4, 7: 6, 8: 8 },
    },
    javascript: {
      language: 'javascript',
      code: `function search(table, key) {
  // Calculate bucket index
  const index = hash(key, table.length);

  // Go to bucket
  const bucket = table[index];

  // Search through chain
  for (const entry of bucket) {
    if (entry.key === key) {
      return entry.value; // Found!
    }
  }
  return null; // Not found
}`,
      lineMap: { 0: 1, 1: 2, 2: 2, 3: 3, 4: 3, 5: 4, 6: 4, 7: 6, 8: 8 },
    },
    csharp: {
      language: 'csharp',
      code: `public int? Search(string key) {
    // Calculate bucket index
    int index = Hash(key, _buckets.Length);

    // Go to bucket
    var bucket = _buckets[index];

    // Search through chain
    foreach (var entry in bucket) {
        if (entry.Key == key) {
            return entry.Value; // Found!
        }
    }
    return null; // Not found
}`,
      lineMap: { 0: 1, 1: 2, 2: 2, 3: 3, 4: 3, 5: 4, 6: 4, 7: 6, 8: 8 },
    },
  },
  delete: {
    typescript: {
      language: 'typescript',
      code: `function remove(table: Map<string, number>[], key: string): boolean {
  // Calculate bucket index
  const index = hash(key, table.length);

  // Go to bucket
  const bucket = table[index];

  // Find and remove from chain
  const entryIndex = bucket.findIndex(e => e.key === key);
  if (entryIndex >= 0) {
    bucket.splice(entryIndex, 1);
    return true; // Deleted
  }
  return false; // Not found
}`,
      lineMap: { 0: 1, 1: 2, 2: 2, 3: 3, 4: 3, 5: 4, 6: 4, 7: 7 },
    },
    javascript: {
      language: 'javascript',
      code: `function remove(table, key) {
  // Calculate bucket index
  const index = hash(key, table.length);

  // Go to bucket
  const bucket = table[index];

  // Find and remove from chain
  const entryIndex = bucket.findIndex(e => e.key === key);
  if (entryIndex >= 0) {
    bucket.splice(entryIndex, 1);
    return true; // Deleted
  }
  return false; // Not found
}`,
      lineMap: { 0: 1, 1: 2, 2: 2, 3: 3, 4: 3, 5: 4, 6: 4, 7: 7 },
    },
    csharp: {
      language: 'csharp',
      code: `public bool Remove(string key) {
    // Calculate bucket index
    int index = Hash(key, _buckets.Length);

    // Go to bucket
    var bucket = _buckets[index];

    // Find and remove from chain
    var entry = bucket.FirstOrDefault(e => e.Key == key);
    if (entry != null) {
        bucket.Remove(entry);
        return true; // Deleted
    }
    return false; // Not found
}`,
      lineMap: { 0: 1, 1: 2, 2: 2, 3: 3, 4: 3, 5: 4, 6: 4, 7: 7 },
    },
  },
};
