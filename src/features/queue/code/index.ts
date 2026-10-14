import type { ICodeSnippets } from '@/core/interfaces';

export const queueCodeSnippets: ICodeSnippets = {
  enqueue: {
    typescript: {
      language: 'typescript',
      code: `class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    // Add element at the rear (end) of the queue
    this.items.push(item);
  }

  get size(): number {
    return this.items.length;
  }
}`,
      lineMap: { 0: 1, 1: 4, 2: 6, 3: 6, 4: 9 },
    },
    javascript: {
      language: 'javascript',
      code: `class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    // Add element at the rear (end) of the queue
    this.items.push(item);
  }

  get size() {
    return this.items.length;
  }
}`,
      lineMap: { 0: 1, 1: 6, 2: 8, 3: 8, 4: 11 },
    },
    csharp: {
      language: 'csharp',
      code: `public class Queue<T> {
    private List<T> items = new List<T>();

    public void Enqueue(T item) {
        // Add element at the rear (end) of the queue
        items.Add(item);
    }

    public int Count => items.Count;
}`,
      lineMap: { 0: 1, 1: 4, 2: 6, 3: 6, 4: 9 },
    },
  },
  dequeue: {
    typescript: {
      language: 'typescript',
      code: `class Queue<T> {
  private items: T[] = [];

  dequeue(): T | undefined {
    // Check if queue is empty
    if (this.isEmpty()) {
      return undefined;
    }
    // Remove and return element from the front
    return this.items.shift();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}`,
      lineMap: { 0: 1, 1: 4, 2: 6, 3: 6, 4: 10, 5: 10 },
    },
    javascript: {
      language: 'javascript',
      code: `class Queue {
  constructor() {
    this.items = [];
  }

  dequeue() {
    // Check if queue is empty
    if (this.isEmpty()) {
      return undefined;
    }
    // Remove and return element from the front
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}`,
      lineMap: { 0: 1, 1: 6, 2: 8, 3: 8, 4: 12, 5: 12 },
    },
    csharp: {
      language: 'csharp',
      code: `public class Queue<T> {
    private List<T> items = new List<T>();

    public T Dequeue() {
        // Check if queue is empty
        if (IsEmpty()) {
            throw new InvalidOperationException("Queue is empty");
        }
        // Remove and return element from the front
        T item = items[0];
        items.RemoveAt(0);
        return item;
    }

    public bool IsEmpty() => items.Count == 0;
}`,
      lineMap: { 0: 1, 1: 4, 2: 6, 3: 7, 4: 10, 5: 12 },
    },
  },
  peek: {
    typescript: {
      language: 'typescript',
      code: `class Queue<T> {
  private items: T[] = [];

  peek(): T | undefined {
    // Return front element without removing it
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}`,
      lineMap: { 0: 1, 1: 4, 2: 6, 3: 9, 4: 9 },
    },
    javascript: {
      language: 'javascript',
      code: `class Queue {
  constructor() {
    this.items = [];
  }

  peek() {
    // Return front element without removing it
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}`,
      lineMap: { 0: 1, 1: 6, 2: 8, 3: 11, 4: 11 },
    },
    csharp: {
      language: 'csharp',
      code: `public class Queue<T> {
    private List<T> items = new List<T>();

    public T Peek() {
        // Return front element without removing it
        if (IsEmpty()) {
            throw new InvalidOperationException("Queue is empty");
        }
        return items[0];
    }

    public bool IsEmpty() => items.Count == 0;
}`,
      lineMap: { 0: 1, 1: 4, 2: 6, 3: 9, 4: 9 },
    },
  },
};
