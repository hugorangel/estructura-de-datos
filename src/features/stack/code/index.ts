import type { ICodeSnippets } from '@/core/interfaces';

export const stackCodeSnippets: ICodeSnippets = {
  push: {
    typescript: {
      language: 'typescript',
      code: `function push(stack: number[], value: number): void {
  // Add element to top of stack
  // O(1) - Direct insertion at end
  stack.push(value);
}`,
      lineMap: { 0: 1, 1: 2, 2: 4, 3: 4 },
    },
    javascript: {
      language: 'javascript',
      code: `function push(stack, value) {
  // Add element to top of stack
  // O(1) - Direct insertion at end
  stack.push(value);
}`,
      lineMap: { 0: 1, 1: 2, 2: 4, 3: 4 },
    },
    csharp: {
      language: 'csharp',
      code: `public void Push(int value) {
    // Add element to top of stack
    // O(1) - Direct insertion at end
    _stack.Push(value);
}`,
      lineMap: { 0: 1, 1: 2, 2: 4, 3: 4 },
    },
  },
  pop: {
    typescript: {
      language: 'typescript',
      code: `function pop(stack: number[]): number | undefined {
  // Check if stack is empty
  if (stack.length === 0) {
    throw new Error('Stack underflow');
  }

  // Remove and return top element
  // O(1) - Direct removal from end
  return stack.pop();
}`,
      lineMap: { 0: 1, 1: 2, 2: 8, 3: 8 },
    },
    javascript: {
      language: 'javascript',
      code: `function pop(stack) {
  // Check if stack is empty
  if (stack.length === 0) {
    throw new Error('Stack underflow');
  }

  // Remove and return top element
  // O(1) - Direct removal from end
  return stack.pop();
}`,
      lineMap: { 0: 1, 1: 2, 2: 8, 3: 8 },
    },
    csharp: {
      language: 'csharp',
      code: `public int Pop() {
    // Check if stack is empty
    if (_stack.Count == 0) {
        throw new InvalidOperationException("Stack underflow");
    }

    // Remove and return top element
    // O(1) - Direct removal from end
    return _stack.Pop();
}`,
      lineMap: { 0: 1, 1: 2, 2: 9, 3: 9 },
    },
  },
  peek: {
    typescript: {
      language: 'typescript',
      code: `function peek(stack: number[]): number {
  // Check if stack is empty
  if (stack.length === 0) {
    throw new Error('Stack is empty');
  }

  // Return top element without removing
  // O(1) - Direct access to last element
  return stack[stack.length - 1];
}`,
      lineMap: { 0: 1, 1: 2, 2: 8, 3: 8 },
    },
    javascript: {
      language: 'javascript',
      code: `function peek(stack) {
  // Check if stack is empty
  if (stack.length === 0) {
    throw new Error('Stack is empty');
  }

  // Return top element without removing
  // O(1) - Direct access to last element
  return stack[stack.length - 1];
}`,
      lineMap: { 0: 1, 1: 2, 2: 8, 3: 8 },
    },
    csharp: {
      language: 'csharp',
      code: `public int Peek() {
    // Check if stack is empty
    if (_stack.Count == 0) {
        throw new InvalidOperationException("Stack is empty");
    }

    // Return top element without removing
    // O(1) - Direct access to top element
    return _stack.Peek();
}`,
      lineMap: { 0: 1, 1: 2, 2: 8, 3: 8 },
    },
  },
  search: {
    typescript: {
      language: 'typescript',
      code: `function search(stack: number[], target: number): number {
  // Search from top to bottom
  for (let i = stack.length - 1; i >= 0; i--) {
    // Compare current element
    if (stack[i] === target) {
      return stack.length - 1 - i; // Distance from top
    }
  }
  return -1; // Not found
}`,
      lineMap: { 0: 1, 1: 1, 2: 3, 3: 3, 4: 5, 5: 6, 6: 6, 7: 9, 8: 9 },
    },
    javascript: {
      language: 'javascript',
      code: `function search(stack, target) {
  // Search from top to bottom
  for (let i = stack.length - 1; i >= 0; i--) {
    // Compare current element
    if (stack[i] === target) {
      return stack.length - 1 - i; // Distance from top
    }
  }
  return -1; // Not found
}`,
      lineMap: { 0: 1, 1: 1, 2: 3, 3: 3, 4: 5, 5: 6, 6: 6, 7: 9, 8: 9 },
    },
    csharp: {
      language: 'csharp',
      code: `public int Search(int target) {
    // Search from top to bottom
    int distance = 0;
    foreach (var item in _stack) {
        // Compare current element
        if (item == target) {
            return distance; // Distance from top
        }
        distance++;
    }
    return -1; // Not found
}`,
      lineMap: { 0: 1, 1: 1, 2: 4, 3: 4, 4: 6, 5: 7, 6: 7, 7: 11, 8: 11 },
    },
  },
};
