import type { ICodeSnippets } from '@/core/interfaces';

export const heapCodeSnippets: ICodeSnippets = {
  insert: {
    typescript: {
      language: 'typescript',
      code: `function insert(heap: number[], value: number, isMaxHeap = true): void {
  // Add element at the end
  heap.push(value);

  // Bubble up to maintain heap property
  let index = heap.length - 1;
  while (index > 0) {
    const parentIndex = Math.floor((index - 1) / 2);
    const shouldSwap = isMaxHeap
      ? heap[index] > heap[parentIndex]
      : heap[index] < heap[parentIndex];

    if (!shouldSwap) break;

    // Swap with parent
    [heap[index], heap[parentIndex]] = [heap[parentIndex], heap[index]];
    index = parentIndex;
  }
}`,
      lineMap: { 0: 1, 1: 3, 2: 3, 3: 6, 4: 8, 5: 14, 6: 14, 7: 16 },
    },
    javascript: {
      language: 'javascript',
      code: `function insert(heap, value, isMaxHeap = true) {
  // Add element at the end
  heap.push(value);

  // Bubble up to maintain heap property
  let index = heap.length - 1;
  while (index > 0) {
    const parentIndex = Math.floor((index - 1) / 2);
    const shouldSwap = isMaxHeap
      ? heap[index] > heap[parentIndex]
      : heap[index] < heap[parentIndex];

    if (!shouldSwap) break;

    // Swap with parent
    [heap[index], heap[parentIndex]] = [heap[parentIndex], heap[index]];
    index = parentIndex;
  }
}`,
      lineMap: { 0: 1, 1: 3, 2: 3, 3: 6, 4: 8, 5: 14, 6: 14, 7: 16 },
    },
    csharp: {
      language: 'csharp',
      code: `public void Insert(List<int> heap, int value, bool isMaxHeap = true) {
    // Add element at the end
    heap.Add(value);

    // Bubble up to maintain heap property
    int index = heap.Count - 1;
    while (index > 0) {
        int parentIndex = (index - 1) / 2;
        bool shouldSwap = isMaxHeap
            ? heap[index] > heap[parentIndex]
            : heap[index] < heap[parentIndex];

        if (!shouldSwap) break;

        // Swap with parent
        (heap[index], heap[parentIndex]) = (heap[parentIndex], heap[index]);
        index = parentIndex;
    }
}`,
      lineMap: { 0: 1, 1: 3, 2: 3, 3: 6, 4: 8, 5: 14, 6: 14, 7: 16 },
    },
  },
  extract: {
    typescript: {
      language: 'typescript',
      code: `function extractRoot(heap: number[], isMaxHeap = true): number | undefined {
  if (heap.length === 0) return undefined;

  const root = heap[0];
  const last = heap.pop()!;

  if (heap.length > 0) {
    heap[0] = last;
    bubbleDown(heap, 0, isMaxHeap);
  }

  return root;
}

function bubbleDown(heap: number[], index: number, isMaxHeap: boolean): void {
  const size = heap.length;
  while (true) {
    let target = index;
    const left = 2 * index + 1;
    const right = 2 * index + 2;

    const compare = (a: number, b: number) => isMaxHeap ? a > b : a < b;

    if (left < size && compare(heap[left], heap[target])) target = left;
    if (right < size && compare(heap[right], heap[target])) target = right;

    if (target === index) break;

    [heap[index], heap[target]] = [heap[target], heap[index]];
    index = target;
  }
}`,
      lineMap: { 0: 1, 1: 2, 2: 5, 3: 5, 4: 17, 5: 21, 6: 25, 7: 27, 8: 29 },
    },
    javascript: {
      language: 'javascript',
      code: `function extractRoot(heap, isMaxHeap = true) {
  if (heap.length === 0) return undefined;

  const root = heap[0];
  const last = heap.pop();

  if (heap.length > 0) {
    heap[0] = last;
    bubbleDown(heap, 0, isMaxHeap);
  }

  return root;
}

function bubbleDown(heap, index, isMaxHeap) {
  const size = heap.length;
  while (true) {
    let target = index;
    const left = 2 * index + 1;
    const right = 2 * index + 2;

    const compare = (a, b) => isMaxHeap ? a > b : a < b;

    if (left < size && compare(heap[left], heap[target])) target = left;
    if (right < size && compare(heap[right], heap[target])) target = right;

    if (target === index) break;

    [heap[index], heap[target]] = [heap[target], heap[index]];
    index = target;
  }
}`,
      lineMap: { 0: 1, 1: 2, 2: 5, 3: 5, 4: 17, 5: 21, 6: 25, 7: 27, 8: 29 },
    },
    csharp: {
      language: 'csharp',
      code: `public int? ExtractRoot(List<int> heap, bool isMaxHeap = true) {
    if (heap.Count == 0) return null;

    int root = heap[0];
    int last = heap[^1];
    heap.RemoveAt(heap.Count - 1);

    if (heap.Count > 0) {
        heap[0] = last;
        BubbleDown(heap, 0, isMaxHeap);
    }

    return root;
}

private void BubbleDown(List<int> heap, int index, bool isMaxHeap) {
    int size = heap.Count;
    while (true) {
        int target = index;
        int left = 2 * index + 1;
        int right = 2 * index + 2;

        if (left < size && Compare(heap[left], heap[target], isMaxHeap))
            target = left;
        if (right < size && Compare(heap[right], heap[target], isMaxHeap))
            target = right;

        if (target == index) break;

        (heap[index], heap[target]) = (heap[target], heap[index]);
        index = target;
    }
}`,
      lineMap: { 0: 1, 1: 2, 2: 5, 3: 6, 4: 17, 5: 22, 6: 27, 7: 29, 8: 31 },
    },
  },
  peek: {
    typescript: {
      language: 'typescript',
      code: `function peek(heap: number[]): number | undefined {
  // O(1) - Direct access to root element
  return heap.length > 0 ? heap[0] : undefined;
}`,
      lineMap: { 0: 1, 1: 2, 2: 3, 3: 3 },
    },
    javascript: {
      language: 'javascript',
      code: `function peek(heap) {
  // O(1) - Direct access to root element
  return heap.length > 0 ? heap[0] : undefined;
}`,
      lineMap: { 0: 1, 1: 2, 2: 3, 3: 3 },
    },
    csharp: {
      language: 'csharp',
      code: `public int? Peek(List<int> heap) {
    // O(1) - Direct access to root element
    return heap.Count > 0 ? heap[0] : null;
}`,
      lineMap: { 0: 1, 1: 2, 2: 3, 3: 3 },
    },
  },
  heapify: {
    typescript: {
      language: 'typescript',
      code: `function buildHeap(arr: number[], isMaxHeap = true): void {
  // Start from last non-leaf node and heapify each subtree
  // This is O(n), more efficient than n insertions O(n log n)
  const n = arr.length;
  const startIdx = Math.floor(n / 2) - 1;

  for (let i = startIdx; i >= 0; i--) {
    heapifyDown(arr, i, n, isMaxHeap);
  }
}

function heapifyDown(arr: number[], i: number, n: number, isMax: boolean): void {
  let target = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  const cmp = (a: number, b: number) => isMax ? a > b : a < b;

  if (left < n && cmp(arr[left], arr[target])) target = left;
  if (right < n && cmp(arr[right], arr[target])) target = right;

  if (target !== i) {
    [arr[i], arr[target]] = [arr[target], arr[i]];
    heapifyDown(arr, target, n, isMax);
  }
}`,
      lineMap: { 0: 1, 1: 2, 2: 5, 3: 5, 4: 12, 5: 17, 6: 17, 7: 21, 8: 23 },
    },
    javascript: {
      language: 'javascript',
      code: `function buildHeap(arr, isMaxHeap = true) {
  // Start from last non-leaf node and heapify each subtree
  // This is O(n), more efficient than n insertions O(n log n)
  const n = arr.length;
  const startIdx = Math.floor(n / 2) - 1;

  for (let i = startIdx; i >= 0; i--) {
    heapifyDown(arr, i, n, isMaxHeap);
  }
}

function heapifyDown(arr, i, n, isMax) {
  let target = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  const cmp = (a, b) => isMax ? a > b : a < b;

  if (left < n && cmp(arr[left], arr[target])) target = left;
  if (right < n && cmp(arr[right], arr[target])) target = right;

  if (target !== i) {
    [arr[i], arr[target]] = [arr[target], arr[i]];
    heapifyDown(arr, target, n, isMax);
  }
}`,
      lineMap: { 0: 1, 1: 2, 2: 5, 3: 5, 4: 12, 5: 17, 6: 17, 7: 21, 8: 23 },
    },
    csharp: {
      language: 'csharp',
      code: `public void BuildHeap(int[] arr, bool isMaxHeap = true) {
    // Start from last non-leaf node and heapify each subtree
    // This is O(n), more efficient than n insertions O(n log n)
    int n = arr.Length;
    int startIdx = n / 2 - 1;

    for (int i = startIdx; i >= 0; i--) {
        HeapifyDown(arr, i, n, isMaxHeap);
    }
}

private void HeapifyDown(int[] arr, int i, int n, bool isMax) {
    int target = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && Compare(arr[left], arr[target], isMax))
        target = left;
    if (right < n && Compare(arr[right], arr[target], isMax))
        target = right;

    if (target != i) {
        (arr[i], arr[target]) = (arr[target], arr[i]);
        HeapifyDown(arr, target, n, isMax);
    }
}`,
      lineMap: { 0: 1, 1: 2, 2: 5, 3: 5, 4: 12, 5: 17, 6: 17, 7: 22, 8: 24 },
    },
  },
};
