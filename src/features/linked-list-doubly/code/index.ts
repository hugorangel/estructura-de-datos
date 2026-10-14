import type { ICodeSnippets } from '@/core/interfaces';

export const doublyLinkedListCodeSnippets: ICodeSnippets = {
  insertAtHead: {
    typescript: {
      language: 'typescript',
      code: `function insertAtHead(value: number): void {
  // Create new node
  const newNode = new Node(value);

  // Set new node's next to current head
  newNode.next = this.head;

  // Update old head's prev pointer
  if (this.head) {
    this.head.prev = newNode;
  }

  // Update head pointer
  this.head = newNode;

  // Update tail if list was empty
  if (!this.tail) {
    this.tail = newNode;
  }
}`,
      lineMap: { 0: 1, 1: 3, 2: 6, 3: 10, 4: 14, 5: 18 },
    },
    javascript: {
      language: 'javascript',
      code: `function insertAtHead(value) {
  // Create new node
  const newNode = new Node(value);

  // Set new node's next to current head
  newNode.next = this.head;

  // Update old head's prev pointer
  if (this.head) {
    this.head.prev = newNode;
  }

  // Update head pointer
  this.head = newNode;

  // Update tail if list was empty
  if (!this.tail) {
    this.tail = newNode;
  }
}`,
      lineMap: { 0: 1, 1: 3, 2: 6, 3: 10, 4: 14, 5: 18 },
    },
    csharp: {
      language: 'csharp',
      code: `public void InsertAtHead(int value) {
    // Create new node
    var newNode = new Node(value);

    // Set new node's next to current head
    newNode.Next = Head;

    // Update old head's prev pointer
    if (Head != null) {
        Head.Prev = newNode;
    }

    // Update head pointer
    Head = newNode;

    // Update tail if list was empty
    if (Tail == null) {
        Tail = newNode;
    }
}`,
      lineMap: { 0: 1, 1: 3, 2: 6, 3: 9, 4: 14, 5: 17 },
    },
  },
  insertAtTail: {
    typescript: {
      language: 'typescript',
      code: `function insertAtTail(value: number): void {
  // Create new node
  const newNode = new Node(value);

  // Set new node's prev to current tail
  newNode.prev = this.tail;

  // Update old tail's next pointer
  if (this.tail) {
    this.tail.next = newNode;
  }

  // Update tail pointer
  this.tail = newNode;

  // Update head if list was empty
  if (!this.head) {
    this.head = newNode;
  }
}`,
      lineMap: { 0: 1, 1: 3, 2: 6, 3: 10, 4: 14, 5: 18 },
    },
    javascript: {
      language: 'javascript',
      code: `function insertAtTail(value) {
  // Create new node
  const newNode = new Node(value);

  // Set new node's prev to current tail
  newNode.prev = this.tail;

  // Update old tail's next pointer
  if (this.tail) {
    this.tail.next = newNode;
  }

  // Update tail pointer
  this.tail = newNode;

  // Update head if list was empty
  if (!this.head) {
    this.head = newNode;
  }
}`,
      lineMap: { 0: 1, 1: 3, 2: 6, 3: 10, 4: 14, 5: 18 },
    },
    csharp: {
      language: 'csharp',
      code: `public void InsertAtTail(int value) {
    // Create new node
    var newNode = new Node(value);

    // Set new node's prev to current tail
    newNode.Prev = Tail;

    // Update old tail's next pointer
    if (Tail != null) {
        Tail.Next = newNode;
    }

    // Update tail pointer
    Tail = newNode;

    // Update head if list was empty
    if (Head == null) {
        Head = newNode;
    }
}`,
      lineMap: { 0: 1, 1: 3, 2: 6, 3: 9, 4: 14, 5: 17 },
    },
  },
  insertAtPosition: {
    typescript: {
      language: 'typescript',
      code: `function insertAtPosition(value: number, position: number): void {
  // Traverse to position
  let current = this.head;
  for (let i = 0; i < position - 1; i++) {
    current = current.next;
  }

  // Create new node
  const newNode = new Node(value);

  // Update pointers - new node's prev and next
  newNode.prev = current;
  newNode.next = current.next;

  // Update surrounding nodes' pointers
  current.next.prev = newNode;
  current.next = newNode;
}`,
      lineMap: { 0: 1, 1: 2, 2: 3, 3: 9, 4: 12, 5: 13, 6: 16, 7: 17, 8: 17 },
    },
    javascript: {
      language: 'javascript',
      code: `function insertAtPosition(value, position) {
  // Traverse to position
  let current = this.head;
  for (let i = 0; i < position - 1; i++) {
    current = current.next;
  }

  // Create new node
  const newNode = new Node(value);

  // Update pointers - new node's prev and next
  newNode.prev = current;
  newNode.next = current.next;

  // Update surrounding nodes' pointers
  current.next.prev = newNode;
  current.next = newNode;
}`,
      lineMap: { 0: 1, 1: 2, 2: 3, 3: 9, 4: 12, 5: 13, 6: 16, 7: 17, 8: 17 },
    },
    csharp: {
      language: 'csharp',
      code: `public void InsertAtPosition(int value, int position) {
    // Traverse to position
    var current = Head;
    for (int i = 0; i < position - 1; i++) {
        current = current.Next;
    }

    // Create new node
    var newNode = new Node(value);

    // Update pointers - new node's prev and next
    newNode.Prev = current;
    newNode.Next = current.Next;

    // Update surrounding nodes' pointers
    current.Next.Prev = newNode;
    current.Next = newNode;
}`,
      lineMap: { 0: 1, 1: 3, 2: 4, 3: 9, 4: 12, 5: 13, 6: 16, 7: 17, 8: 17 },
    },
  },
  deleteNode: {
    typescript: {
      language: 'typescript',
      code: `function deleteNode(position: number): void {
  // Find the node to delete
  let current = this.head;
  for (let i = 0; i < position; i++) {
    current = current.next;
  }

  // Update prev node's next pointer
  if (current.prev) {
    current.prev.next = current.next;
  } else {
    this.head = current.next; // Deleting head
  }

  // Update next node's prev pointer
  if (current.next) {
    current.next.prev = current.prev;
  } else {
    this.tail = current.prev; // Deleting tail
  }
}`,
      lineMap: { 0: 1, 1: 2, 2: 9, 3: 12, 4: 16, 5: 19 },
    },
    javascript: {
      language: 'javascript',
      code: `function deleteNode(position) {
  // Find the node to delete
  let current = this.head;
  for (let i = 0; i < position; i++) {
    current = current.next;
  }

  // Update prev node's next pointer
  if (current.prev) {
    current.prev.next = current.next;
  } else {
    this.head = current.next; // Deleting head
  }

  // Update next node's prev pointer
  if (current.next) {
    current.next.prev = current.prev;
  } else {
    this.tail = current.prev; // Deleting tail
  }
}`,
      lineMap: { 0: 1, 1: 2, 2: 9, 3: 12, 4: 16, 5: 19 },
    },
    csharp: {
      language: 'csharp',
      code: `public void DeleteNode(int position) {
    // Find the node to delete
    var current = Head;
    for (int i = 0; i < position; i++) {
        current = current.Next;
    }

    // Update prev node's next pointer
    if (current.Prev != null) {
        current.Prev.Next = current.Next;
    } else {
        Head = current.Next; // Deleting head
    }

    // Update next node's prev pointer
    if (current.Next != null) {
        current.Next.Prev = current.Prev;
    } else {
        Tail = current.Prev; // Deleting tail
    }
}`,
      lineMap: { 0: 1, 1: 3, 2: 9, 3: 12, 4: 16, 5: 19 },
    },
  },
  traverseForward: {
    typescript: {
      language: 'typescript',
      code: `function traverseForward(): number[] {
  // Start at head
  const result: number[] = [];
  let current = this.head;

  // Follow next pointers
  while (current !== null) {
    result.push(current.value);
    current = current.next;
  }

  // Reached end (null)
  return result;
}`,
      lineMap: { 0: 1, 1: 3, 2: 7, 3: 8, 4: 12 },
    },
    javascript: {
      language: 'javascript',
      code: `function traverseForward() {
  // Start at head
  const result = [];
  let current = this.head;

  // Follow next pointers
  while (current !== null) {
    result.push(current.value);
    current = current.next;
  }

  // Reached end (null)
  return result;
}`,
      lineMap: { 0: 1, 1: 3, 2: 7, 3: 8, 4: 12 },
    },
    csharp: {
      language: 'csharp',
      code: `public List<int> TraverseForward() {
    // Start at head
    var result = new List<int>();
    var current = Head;

    // Follow next pointers
    while (current != null) {
        result.Add(current.Value);
        current = current.Next;
    }

    // Reached end (null)
    return result;
}`,
      lineMap: { 0: 1, 1: 3, 2: 7, 3: 8, 4: 12 },
    },
  },
  traverseBackward: {
    typescript: {
      language: 'typescript',
      code: `function traverseBackward(): number[] {
  // Start at tail
  const result: number[] = [];
  let current = this.tail;

  // Follow prev pointers
  while (current !== null) {
    result.push(current.value);
    current = current.prev;
  }

  // Reached beginning (null)
  return result;
}`,
      lineMap: { 0: 1, 1: 3, 2: 7, 3: 8, 4: 12 },
    },
    javascript: {
      language: 'javascript',
      code: `function traverseBackward() {
  // Start at tail
  const result = [];
  let current = this.tail;

  // Follow prev pointers
  while (current !== null) {
    result.push(current.value);
    current = current.prev;
  }

  // Reached beginning (null)
  return result;
}`,
      lineMap: { 0: 1, 1: 3, 2: 7, 3: 8, 4: 12 },
    },
    csharp: {
      language: 'csharp',
      code: `public List<int> TraverseBackward() {
    // Start at tail
    var result = new List<int>();
    var current = Tail;

    // Follow prev pointers
    while (current != null) {
        result.Add(current.Value);
        current = current.Prev;
    }

    // Reached beginning (null)
    return result;
}`,
      lineMap: { 0: 1, 1: 3, 2: 7, 3: 8, 4: 12 },
    },
  },
};
