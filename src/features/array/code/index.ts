import type { ICodeSnippets } from '@/core/interfaces';

export const arrayCodeSnippets: ICodeSnippets = {
  insert: {
    typescript: {
      language: 'typescript',
      code: `function insert(arr: number[], value: number, index: number): number[] {
  // Create new array with space for new element
  const result = [...arr];

  // Shift elements to the right
  for (let i = result.length; i > index; i--) {
    result[i] = result[i - 1];
  }

  // Insert the new value
  result[index] = value;

  return result;
}`,
      lineMap: { 0: 1, 1: 2, 2: 5, 3: 6, 4: 9, 5: 9, 6: 11 },
    },
    javascript: {
      language: 'javascript',
      code: `function insert(arr, value, index) {
  // Create new array with space for new element
  const result = [...arr];

  // Shift elements to the right
  for (let i = result.length; i > index; i--) {
    result[i] = result[i - 1];
  }

  // Insert the new value
  result[index] = value;

  return result;
}`,
      lineMap: { 0: 1, 1: 2, 2: 5, 3: 6, 4: 9, 5: 9, 6: 11 },
    },
    csharp: {
      language: 'csharp',
      code: `public static int[] Insert(int[] arr, int value, int index) {
    // Create new array with space for new element
    int[] result = new int[arr.Length + 1];

    // Copy elements before index
    Array.Copy(arr, 0, result, 0, index);

    // Insert the new value
    result[index] = value;

    // Copy remaining elements
    Array.Copy(arr, index, result, index + 1, arr.Length - index);

    return result;
}`,
      lineMap: { 0: 1, 1: 3, 2: 6, 3: 6, 4: 9, 5: 9, 6: 12 },
    },
  },
  delete: {
    typescript: {
      language: 'typescript',
      code: `function deleteAt(arr: number[], index: number): number[] {
  // Validate index
  if (index < 0 || index >= arr.length) {
    throw new Error('Index out of bounds');
  }

  // Shift elements to the left
  const result = [...arr];
  for (let i = index; i < result.length - 1; i++) {
    result[i] = result[i + 1];
  }

  // Remove last element
  result.pop();

  return result;
}`,
      lineMap: { 0: 1, 1: 2, 2: 8, 3: 9, 4: 9, 5: 14, 6: 16 },
    },
    javascript: {
      language: 'javascript',
      code: `function deleteAt(arr, index) {
  // Validate index
  if (index < 0 || index >= arr.length) {
    throw new Error('Index out of bounds');
  }

  // Shift elements to the left
  const result = [...arr];
  for (let i = index; i < result.length - 1; i++) {
    result[i] = result[i + 1];
  }

  // Remove last element
  result.pop();

  return result;
}`,
      lineMap: { 0: 1, 1: 2, 2: 8, 3: 9, 4: 9, 5: 14, 6: 16 },
    },
    csharp: {
      language: 'csharp',
      code: `public static int[] DeleteAt(int[] arr, int index) {
    // Validate index
    if (index < 0 || index >= arr.Length) {
        throw new IndexOutOfRangeException();
    }

    // Create new array without deleted element
    int[] result = new int[arr.Length - 1];

    // Copy elements before index
    Array.Copy(arr, 0, result, 0, index);

    // Copy elements after index
    Array.Copy(arr, index + 1, result, index, arr.Length - index - 1);

    return result;
}`,
      lineMap: { 0: 1, 1: 2, 2: 11, 3: 11, 4: 14, 5: 14, 6: 16 },
    },
  },
  access: {
    typescript: {
      language: 'typescript',
      code: `function access(arr: number[], index: number): number {
  // O(1) - Direct memory access via index calculation
  // address = baseAddress + (index * elementSize)
  return arr[index];
}`,
      lineMap: { 0: 1, 1: 2, 2: 4, 3: 4 },
    },
    javascript: {
      language: 'javascript',
      code: `function access(arr, index) {
  // O(1) - Direct memory access via index calculation
  // address = baseAddress + (index * elementSize)
  return arr[index];
}`,
      lineMap: { 0: 1, 1: 2, 2: 4, 3: 4 },
    },
    csharp: {
      language: 'csharp',
      code: `public static int Access(int[] arr, int index) {
    // O(1) - Direct memory access via index calculation
    // address = baseAddress + (index * elementSize)
    return arr[index];
}`,
      lineMap: { 0: 1, 1: 2, 2: 4, 3: 4 },
    },
  },
  search: {
    typescript: {
      language: 'typescript',
      code: `function linearSearch(arr: number[], target: number): number {
  // Iterate through each element
  for (let i = 0; i < arr.length; i++) {
    // Compare current element with target
    if (arr[i] === target) {
      return i; // Found! Return index
    }
  }
  return -1; // Not found
}`,
      lineMap: { 0: 1, 1: 1, 2: 3, 3: 3, 4: 5, 5: 6, 6: 6, 7: 9, 8: 9 },
    },
    javascript: {
      language: 'javascript',
      code: `function linearSearch(arr, target) {
  // Iterate through each element
  for (let i = 0; i < arr.length; i++) {
    // Compare current element with target
    if (arr[i] === target) {
      return i; // Found! Return index
    }
  }
  return -1; // Not found
}`,
      lineMap: { 0: 1, 1: 1, 2: 3, 3: 3, 4: 5, 5: 6, 6: 6, 7: 9, 8: 9 },
    },
    csharp: {
      language: 'csharp',
      code: `public static int LinearSearch(int[] arr, int target) {
    // Iterate through each element
    for (int i = 0; i < arr.Length; i++) {
        // Compare current element with target
        if (arr[i] == target) {
            return i; // Found! Return index
        }
    }
    return -1; // Not found
}`,
      lineMap: { 0: 1, 1: 1, 2: 3, 3: 3, 4: 5, 5: 6, 6: 6, 7: 9, 8: 9 },
    },
  },
};
