import type { ICodeSnippets } from '@/core/interfaces';

export const singlyLinkedListCodeSnippets: ICodeSnippets = {
  insertAtHead: {
    typescript: {
      language: 'typescript',
      code: `class Node {
  value: number;
  next: Node | null = null;
  constructor(value: number) {
    this.value = value;
  }
}

function insertAtHead(head: Node | null, value: number): Node {
  const newNode = new Node(value);
  newNode.next = head;  // Point to old head
  return newNode;       // New node becomes head
}`,
      lineMap: { 0: 1, 1: 2, 2: 9, 3: 10, 4: 11, 5: 12 },
    },
    javascript: {
      language: 'javascript',
      code: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function insertAtHead(head, value) {
  const newNode = new Node(value);
  newNode.next = head;  // Point to old head
  return newNode;       // New node becomes head
}`,
      lineMap: { 0: 1, 1: 2, 2: 8, 3: 9, 4: 10, 5: 11 },
    },
    csharp: {
      language: 'csharp',
      code: `public class Node {
    public int Value { get; set; }
    public Node Next { get; set; }
    public Node(int value) {
        Value = value;
        Next = null;
    }
}

public Node InsertAtHead(Node head, int value) {
    Node newNode = new Node(value);
    newNode.Next = head;  // Point to old head
    return newNode;       // New node becomes head
}`,
      lineMap: { 0: 1, 1: 2, 2: 10, 3: 11, 4: 12, 5: 13 },
    },
  },
  insertAtTail: {
    typescript: {
      language: 'typescript',
      code: `function insertAtTail(head: Node | null, value: number): Node {
  const newNode = new Node(value);

  // If list is empty, new node is head
  if (!head) return newNode;

  // Traverse to find the tail
  let current = head;
  while (current.next !== null) {
    current = current.next;
  }

  // Link tail to new node
  current.next = newNode;
  return head;
}`,
      lineMap: { 0: 1, 1: 2, 2: 5, 3: 8, 4: 9, 5: 14, 6: 15 },
    },
    javascript: {
      language: 'javascript',
      code: `function insertAtTail(head, value) {
  const newNode = new Node(value);

  // If list is empty, new node is head
  if (!head) return newNode;

  // Traverse to find the tail
  let current = head;
  while (current.next !== null) {
    current = current.next;
  }

  // Link tail to new node
  current.next = newNode;
  return head;
}`,
      lineMap: { 0: 1, 1: 2, 2: 5, 3: 8, 4: 9, 5: 14, 6: 15 },
    },
    csharp: {
      language: 'csharp',
      code: `public Node InsertAtTail(Node head, int value) {
    Node newNode = new Node(value);

    // If list is empty, new node is head
    if (head == null) return newNode;

    // Traverse to find the tail
    Node current = head;
    while (current.Next != null) {
        current = current.Next;
    }

    // Link tail to new node
    current.Next = newNode;
    return head;
}`,
      lineMap: { 0: 1, 1: 2, 2: 5, 3: 8, 4: 9, 5: 14, 6: 15 },
    },
  },
  insertAtPosition: {
    typescript: {
      language: 'typescript',
      code: `function insertAtPosition(head: Node | null, value: number, pos: number): Node {
  const newNode = new Node(value);

  if (pos === 0) {
    newNode.next = head;
    return newNode;
  }

  // Traverse to position - 1
  let current = head;
  for (let i = 0; i < pos - 1 && current; i++) {
    current = current.next;
  }

  if (!current) throw new Error('Position out of bounds');

  // Rewire pointers
  newNode.next = current.next;
  current.next = newNode;
  return head!;
}`,
      lineMap: { 0: 1, 1: 2, 2: 10, 3: 17, 4: 18, 5: 19, 6: 20 },
    },
    javascript: {
      language: 'javascript',
      code: `function insertAtPosition(head, value, pos) {
  const newNode = new Node(value);

  if (pos === 0) {
    newNode.next = head;
    return newNode;
  }

  // Traverse to position - 1
  let current = head;
  for (let i = 0; i < pos - 1 && current; i++) {
    current = current.next;
  }

  if (!current) throw new Error('Position out of bounds');

  // Rewire pointers
  newNode.next = current.next;
  current.next = newNode;
  return head;
}`,
      lineMap: { 0: 1, 1: 2, 2: 10, 3: 17, 4: 18, 5: 19, 6: 20 },
    },
    csharp: {
      language: 'csharp',
      code: `public Node InsertAtPosition(Node head, int value, int pos) {
    Node newNode = new Node(value);

    if (pos == 0) {
        newNode.Next = head;
        return newNode;
    }

    // Traverse to position - 1
    Node current = head;
    for (int i = 0; i < pos - 1 && current != null; i++) {
        current = current.Next;
    }

    if (current == null) throw new ArgumentOutOfRangeException();

    // Rewire pointers
    newNode.Next = current.Next;
    current.Next = newNode;
    return head;
}`,
      lineMap: { 0: 1, 1: 2, 2: 10, 3: 17, 4: 18, 5: 19, 6: 20 },
    },
  },
  deleteNode: {
    typescript: {
      language: 'typescript',
      code: `function deleteNode(head: Node | null, value: number): Node | null {
  if (!head) return null;

  // If head is the target
  if (head.value === value) {
    return head.next;
  }

  // Find node before target
  let current = head;
  while (current.next && current.next.value !== value) {
    current = current.next;
  }

  // If found, rewire to skip target
  if (current.next) {
    current.next = current.next.next;
  }

  return head;
}`,
      lineMap: { 0: 1, 1: 2, 2: 5, 3: 10, 4: 11, 5: 16, 6: 17, 7: 20 },
    },
    javascript: {
      language: 'javascript',
      code: `function deleteNode(head, value) {
  if (!head) return null;

  // If head is the target
  if (head.value === value) {
    return head.next;
  }

  // Find node before target
  let current = head;
  while (current.next && current.next.value !== value) {
    current = current.next;
  }

  // If found, rewire to skip target
  if (current.next) {
    current.next = current.next.next;
  }

  return head;
}`,
      lineMap: { 0: 1, 1: 2, 2: 5, 3: 10, 4: 11, 5: 16, 6: 17, 7: 20 },
    },
    csharp: {
      language: 'csharp',
      code: `public Node DeleteNode(Node head, int value) {
    if (head == null) return null;

    // If head is the target
    if (head.Value == value) {
        return head.Next;
    }

    // Find node before target
    Node current = head;
    while (current.Next != null && current.Next.Value != value) {
        current = current.Next;
    }

    // If found, rewire to skip target
    if (current.Next != null) {
        current.Next = current.Next.Next;
    }

    return head;
}`,
      lineMap: { 0: 1, 1: 2, 2: 5, 3: 10, 4: 11, 5: 16, 6: 17, 7: 20 },
    },
  },
  search: {
    typescript: {
      language: 'typescript',
      code: `function search(head: Node | null, value: number): number {
  let current = head;
  let position = 0;

  while (current !== null) {
    if (current.value === value) {
      return position;  // Found!
    }
    current = current.next;
    position++;
  }

  return -1;  // Not found
}`,
      lineMap: { 0: 1, 1: 1, 2: 5, 3: 6, 4: 9, 5: 10, 6: 13 },
    },
    javascript: {
      language: 'javascript',
      code: `function search(head, value) {
  let current = head;
  let position = 0;

  while (current !== null) {
    if (current.value === value) {
      return position;  // Found!
    }
    current = current.next;
    position++;
  }

  return -1;  // Not found
}`,
      lineMap: { 0: 1, 1: 1, 2: 5, 3: 6, 4: 9, 5: 10, 6: 13 },
    },
    csharp: {
      language: 'csharp',
      code: `public int Search(Node head, int value) {
    Node current = head;
    int position = 0;

    while (current != null) {
        if (current.Value == value) {
            return position;  // Found!
        }
        current = current.Next;
        position++;
    }

    return -1;  // Not found
}`,
      lineMap: { 0: 1, 1: 1, 2: 5, 3: 6, 4: 9, 5: 10, 6: 13 },
    },
  },
  traverse: {
    typescript: {
      language: 'typescript',
      code: `function traverse(head: Node | null): void {
  let current = head;

  while (current !== null) {
    console.log(current.value);
    current = current.next;
  }
  // Reached null - end of list
}`,
      lineMap: { 0: 1, 1: 1, 2: 4, 3: 5, 4: 8, 5: 8 },
    },
    javascript: {
      language: 'javascript',
      code: `function traverse(head) {
  let current = head;

  while (current !== null) {
    console.log(current.value);
    current = current.next;
  }
  // Reached null - end of list
}`,
      lineMap: { 0: 1, 1: 1, 2: 4, 3: 5, 4: 8, 5: 8 },
    },
    csharp: {
      language: 'csharp',
      code: `public void Traverse(Node head) {
    Node current = head;

    while (current != null) {
        Console.WriteLine(current.Value);
        current = current.Next;
    }
    // Reached null - end of list
}`,
      lineMap: { 0: 1, 1: 1, 2: 4, 3: 5, 4: 8, 5: 8 },
    },
  },
};
