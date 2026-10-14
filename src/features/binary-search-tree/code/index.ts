import type { ICodeSnippets } from '@/core/interfaces';

export const bstCodeSnippets: ICodeSnippets = {
  insert: {
    typescript: {
      language: 'typescript',
      code: `interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function insert(root: BSTNode | null, value: number): BSTNode {
  // Base case: create new node
  if (!root) {
    return { value, left: null, right: null };
  }

  // Compare and go left or right
  if (value < root.value) {
    root.left = insert(root.left, value);
  } else if (value > root.value) {
    root.right = insert(root.right, value);
  }
  // If equal, value already exists (no duplicates)

  return root;
}`,
      lineMap: { 0: 1, 1: 7, 2: 8, 3: 10, 4: 13, 5: 14, 6: 18, 7: 20, 8: 20 },
    },
    javascript: {
      language: 'javascript',
      code: `function insert(root, value) {
  // Base case: create new node
  if (!root) {
    return { value, left: null, right: null };
  }

  // Compare and go left or right
  if (value < root.value) {
    root.left = insert(root.left, value);
  } else if (value > root.value) {
    root.right = insert(root.right, value);
  }
  // If equal, value already exists (no duplicates)

  return root;
}`,
      lineMap: { 0: 1, 1: 1, 2: 2, 3: 4, 4: 7, 5: 8, 6: 13, 7: 15, 8: 15 },
    },
    csharp: {
      language: 'csharp',
      code: `public class BSTNode {
    public int Value;
    public BSTNode Left;
    public BSTNode Right;
}

public BSTNode Insert(BSTNode root, int value) {
    // Base case: create new node
    if (root == null) {
        return new BSTNode { Value = value };
    }

    // Compare and go left or right
    if (value < root.Value) {
        root.Left = Insert(root.Left, value);
    } else if (value > root.Value) {
        root.Right = Insert(root.Right, value);
    }
    // If equal, value already exists (no duplicates)

    return root;
}`,
      lineMap: { 0: 1, 1: 7, 2: 9, 3: 10, 4: 13, 5: 15, 6: 19, 7: 21, 8: 21 },
    },
  },
  search: {
    typescript: {
      language: 'typescript',
      code: `function search(root: BSTNode | null, value: number): BSTNode | null {
  // Base case: empty or found
  if (!root || root.value === value) {
    return root;
  }

  // BST property: go left if smaller, right if larger
  if (value < root.value) {
    return search(root.left, value);
  }
  return search(root.right, value);
}`,
      lineMap: { 0: 1, 1: 1, 2: 3, 3: 3, 4: 4, 5: 7, 6: 8, 7: 11, 8: 11 },
    },
    javascript: {
      language: 'javascript',
      code: `function search(root, value) {
  // Base case: empty or found
  if (!root || root.value === value) {
    return root;
  }

  // BST property: go left if smaller, right if larger
  if (value < root.value) {
    return search(root.left, value);
  }
  return search(root.right, value);
}`,
      lineMap: { 0: 1, 1: 1, 2: 3, 3: 3, 4: 4, 5: 7, 6: 8, 7: 11, 8: 11 },
    },
    csharp: {
      language: 'csharp',
      code: `public BSTNode Search(BSTNode root, int value) {
    // Base case: empty or found
    if (root == null || root.Value == value) {
        return root;
    }

    // BST property: go left if smaller, right if larger
    if (value < root.Value) {
        return Search(root.Left, value);
    }
    return Search(root.Right, value);
}`,
      lineMap: { 0: 1, 1: 1, 2: 3, 3: 3, 4: 4, 5: 7, 6: 8, 7: 11, 8: 11 },
    },
  },
  delete: {
    typescript: {
      language: 'typescript',
      code: `function deleteNode(root: BSTNode | null, value: number): BSTNode | null {
  if (!root) return null;

  // Find the node to delete
  if (value < root.value) {
    root.left = deleteNode(root.left, value);
  } else if (value > root.value) {
    root.right = deleteNode(root.right, value);
  } else {
    // Node found! Handle three cases:

    // Case 1: Leaf node (no children)
    if (!root.left && !root.right) return null;

    // Case 2: One child
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    // Case 3: Two children - find inorder successor
    const successor = findMin(root.right);
    root.value = successor.value;
    root.right = deleteNode(root.right, successor.value);
  }
  return root;
}

function findMin(node: BSTNode): BSTNode {
  while (node.left) node = node.left;
  return node;
}`,
      lineMap: { 0: 1, 1: 1, 2: 4, 3: 5, 4: 6, 5: 10, 6: 12, 7: 15, 8: 17, 9: 19, 10: 21, 11: 22, 12: 24 },
    },
    javascript: {
      language: 'javascript',
      code: `function deleteNode(root, value) {
  if (!root) return null;

  // Find the node to delete
  if (value < root.value) {
    root.left = deleteNode(root.left, value);
  } else if (value > root.value) {
    root.right = deleteNode(root.right, value);
  } else {
    // Node found! Handle three cases:

    // Case 1: Leaf node (no children)
    if (!root.left && !root.right) return null;

    // Case 2: One child
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    // Case 3: Two children - find inorder successor
    const successor = findMin(root.right);
    root.value = successor.value;
    root.right = deleteNode(root.right, successor.value);
  }
  return root;
}

function findMin(node) {
  while (node.left) node = node.left;
  return node;
}`,
      lineMap: { 0: 1, 1: 1, 2: 4, 3: 5, 4: 6, 5: 10, 6: 12, 7: 15, 8: 17, 9: 19, 10: 21, 11: 22, 12: 24 },
    },
    csharp: {
      language: 'csharp',
      code: `public BSTNode Delete(BSTNode root, int value) {
    if (root == null) return null;

    // Find the node to delete
    if (value < root.Value) {
        root.Left = Delete(root.Left, value);
    } else if (value > root.Value) {
        root.Right = Delete(root.Right, value);
    } else {
        // Node found! Handle three cases:

        // Case 1: Leaf node
        if (root.Left == null && root.Right == null) return null;

        // Case 2: One child
        if (root.Left == null) return root.Right;
        if (root.Right == null) return root.Left;

        // Case 3: Two children - find inorder successor
        BSTNode successor = FindMin(root.Right);
        root.Value = successor.Value;
        root.Right = Delete(root.Right, successor.Value);
    }
    return root;
}

private BSTNode FindMin(BSTNode node) {
    while (node.Left != null) node = node.Left;
    return node;
}`,
      lineMap: { 0: 1, 1: 1, 2: 4, 3: 5, 4: 6, 5: 10, 6: 12, 7: 15, 8: 17, 9: 19, 10: 21, 11: 22, 12: 24 },
    },
  },
  inorderTraversal: {
    typescript: {
      language: 'typescript',
      code: `function inorderTraversal(root: BSTNode | null): number[] {
  const result: number[] = [];

  function inorder(node: BSTNode | null) {
    if (!node) return;

    inorder(node.left);    // 1. Visit left subtree
    result.push(node.value); // 2. Visit root
    inorder(node.right);   // 3. Visit right subtree
  }

  inorder(root);
  return result; // Returns values in sorted order!
}`,
      lineMap: { 0: 1, 1: 1, 2: 7, 3: 8, 4: 9, 5: 9, 6: 13 },
    },
    javascript: {
      language: 'javascript',
      code: `function inorderTraversal(root) {
  const result = [];

  function inorder(node) {
    if (!node) return;

    inorder(node.left);      // 1. Visit left subtree
    result.push(node.value); // 2. Visit root
    inorder(node.right);     // 3. Visit right subtree
  }

  inorder(root);
  return result; // Returns values in sorted order!
}`,
      lineMap: { 0: 1, 1: 1, 2: 7, 3: 8, 4: 9, 5: 9, 6: 13 },
    },
    csharp: {
      language: 'csharp',
      code: `public List<int> InorderTraversal(BSTNode root) {
    var result = new List<int>();
    Inorder(root, result);
    return result; // Returns values in sorted order!
}

private void Inorder(BSTNode node, List<int> result) {
    if (node == null) return;

    Inorder(node.Left, result);   // 1. Visit left subtree
    result.Add(node.Value);        // 2. Visit root
    Inorder(node.Right, result);  // 3. Visit right subtree
}`,
      lineMap: { 0: 1, 1: 1, 2: 10, 3: 11, 4: 12, 5: 12, 6: 4 },
    },
  },
  preorderTraversal: {
    typescript: {
      language: 'typescript',
      code: `function preorderTraversal(root: BSTNode | null): number[] {
  const result: number[] = [];

  function preorder(node: BSTNode | null) {
    if (!node) return;

    result.push(node.value); // 1. Visit root first
    preorder(node.left);     // 2. Visit left subtree
    preorder(node.right);    // 3. Visit right subtree
  }

  preorder(root);
  return result;
}`,
      lineMap: { 0: 1, 1: 1, 2: 7, 3: 8, 4: 9, 5: 9, 6: 13 },
    },
    javascript: {
      language: 'javascript',
      code: `function preorderTraversal(root) {
  const result = [];

  function preorder(node) {
    if (!node) return;

    result.push(node.value); // 1. Visit root first
    preorder(node.left);     // 2. Visit left subtree
    preorder(node.right);    // 3. Visit right subtree
  }

  preorder(root);
  return result;
}`,
      lineMap: { 0: 1, 1: 1, 2: 7, 3: 8, 4: 9, 5: 9, 6: 13 },
    },
    csharp: {
      language: 'csharp',
      code: `public List<int> PreorderTraversal(BSTNode root) {
    var result = new List<int>();
    Preorder(root, result);
    return result;
}

private void Preorder(BSTNode node, List<int> result) {
    if (node == null) return;

    result.Add(node.Value);        // 1. Visit root first
    Preorder(node.Left, result);   // 2. Visit left subtree
    Preorder(node.Right, result);  // 3. Visit right subtree
}`,
      lineMap: { 0: 1, 1: 1, 2: 10, 3: 11, 4: 12, 5: 12, 6: 4 },
    },
  },
  postorderTraversal: {
    typescript: {
      language: 'typescript',
      code: `function postorderTraversal(root: BSTNode | null): number[] {
  const result: number[] = [];

  function postorder(node: BSTNode | null) {
    if (!node) return;

    postorder(node.left);    // 1. Visit left subtree
    postorder(node.right);   // 2. Visit right subtree
    result.push(node.value); // 3. Visit root last
  }

  postorder(root);
  return result;
}`,
      lineMap: { 0: 1, 1: 1, 2: 7, 3: 8, 4: 9, 5: 9, 6: 13 },
    },
    javascript: {
      language: 'javascript',
      code: `function postorderTraversal(root) {
  const result = [];

  function postorder(node) {
    if (!node) return;

    postorder(node.left);    // 1. Visit left subtree
    postorder(node.right);   // 2. Visit right subtree
    result.push(node.value); // 3. Visit root last
  }

  postorder(root);
  return result;
}`,
      lineMap: { 0: 1, 1: 1, 2: 7, 3: 8, 4: 9, 5: 9, 6: 13 },
    },
    csharp: {
      language: 'csharp',
      code: `public List<int> PostorderTraversal(BSTNode root) {
    var result = new List<int>();
    Postorder(root, result);
    return result;
}

private void Postorder(BSTNode node, List<int> result) {
    if (node == null) return;

    Postorder(node.Left, result);   // 1. Visit left subtree
    Postorder(node.Right, result);  // 2. Visit right subtree
    result.Add(node.Value);          // 3. Visit root last
}`,
      lineMap: { 0: 1, 1: 1, 2: 10, 3: 11, 4: 12, 5: 12, 6: 4 },
    },
  },
  bfsTraversal: {
    typescript: {
      language: 'typescript',
      code: `function bfsTraversal(root: BSTNode | null): number[] {
  if (!root) return [];

  const result: number[] = [];
  const queue: BSTNode[] = [root];

  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node.value);

    // Enqueue children
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return result;
}`,
      lineMap: { 0: 1, 1: 2, 2: 5, 3: 7, 4: 8, 5: 12, 6: 13, 7: 16 },
    },
    javascript: {
      language: 'javascript',
      code: `function bfsTraversal(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node.value);

    // Enqueue children
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return result;
}`,
      lineMap: { 0: 1, 1: 2, 2: 5, 3: 7, 4: 8, 5: 12, 6: 13, 7: 16 },
    },
    csharp: {
      language: 'csharp',
      code: `public List<int> BfsTraversal(BSTNode root) {
    var result = new List<int>();
    if (root == null) return result;

    var queue = new Queue<BSTNode>();
    queue.Enqueue(root);

    while (queue.Count > 0) {
        var node = queue.Dequeue();
        result.Add(node.Value);

        // Enqueue children
        if (node.Left != null) queue.Enqueue(node.Left);
        if (node.Right != null) queue.Enqueue(node.Right);
    }

    return result;
}`,
      lineMap: { 0: 1, 1: 3, 2: 6, 3: 8, 4: 9, 5: 13, 6: 14, 7: 17 },
    },
  },
};
