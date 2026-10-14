import type { ICodeSnippets } from '@/core/interfaces';

export const graphCodeSnippets: ICodeSnippets = {
  addNode: {
    typescript: {
      language: 'typescript',
      code: `function addNode(graph: Map<string, string[]>, node: string): void {
  // Check if node already exists
  if (graph.has(node)) {
    throw new Error('Node already exists');
  }

  // Add node with empty adjacency list
  graph.set(node, []);
}`,
      lineMap: { 0: 1, 1: 2, 2: 7, 3: 7 },
    },
    javascript: {
      language: 'javascript',
      code: `function addNode(graph, node) {
  // Check if node already exists
  if (graph.has(node)) {
    throw new Error('Node already exists');
  }

  // Add node with empty adjacency list
  graph.set(node, []);
}`,
      lineMap: { 0: 1, 1: 2, 2: 7, 3: 7 },
    },
    csharp: {
      language: 'csharp',
      code: `public void AddNode(string node) {
    // Check if node already exists
    if (_adjacencyList.ContainsKey(node)) {
        throw new ArgumentException("Node already exists");
    }

    // Add node with empty adjacency list
    _adjacencyList[node] = new List<string>();
}`,
      lineMap: { 0: 1, 1: 2, 2: 7, 3: 7 },
    },
  },
  addEdge: {
    typescript: {
      language: 'typescript',
      code: `function addEdge(graph: Map<string, string[]>, from: string, to: string, directed = false): void {
  // Validate nodes exist
  if (!graph.has(from) || !graph.has(to)) {
    throw new Error('Both nodes must exist');
  }

  // Add edge from -> to
  graph.get(from)!.push(to);

  // For undirected graphs, add reverse edge
  if (!directed) {
    graph.get(to)!.push(from);
  }
}`,
      lineMap: { 0: 1, 1: 2, 2: 7, 3: 10, 4: 10 },
    },
    javascript: {
      language: 'javascript',
      code: `function addEdge(graph, from, to, directed = false) {
  // Validate nodes exist
  if (!graph.has(from) || !graph.has(to)) {
    throw new Error('Both nodes must exist');
  }

  // Add edge from -> to
  graph.get(from).push(to);

  // For undirected graphs, add reverse edge
  if (!directed) {
    graph.get(to).push(from);
  }
}`,
      lineMap: { 0: 1, 1: 2, 2: 7, 3: 10, 4: 10 },
    },
    csharp: {
      language: 'csharp',
      code: `public void AddEdge(string from, string to, bool directed = false) {
    // Validate nodes exist
    if (!_adjacencyList.ContainsKey(from) || !_adjacencyList.ContainsKey(to)) {
        throw new ArgumentException("Both nodes must exist");
    }

    // Add edge from -> to
    _adjacencyList[from].Add(to);

    // For undirected graphs, add reverse edge
    if (!directed) {
        _adjacencyList[to].Add(from);
    }
}`,
      lineMap: { 0: 1, 1: 2, 2: 7, 3: 10, 4: 10 },
    },
  },
  removeNode: {
    typescript: {
      language: 'typescript',
      code: `function removeNode(graph: Map<string, string[]>, node: string): void {
  // Remove the node's entry
  graph.delete(node);

  // Remove all edges pointing to this node
  for (const [key, neighbors] of graph) {
    const filtered = neighbors.filter(n => n !== node);
    graph.set(key, filtered);
  }
}`,
      lineMap: { 0: 1, 1: 2, 2: 5, 3: 7, 4: 7 },
    },
    javascript: {
      language: 'javascript',
      code: `function removeNode(graph, node) {
  // Remove the node's entry
  graph.delete(node);

  // Remove all edges pointing to this node
  for (const [key, neighbors] of graph) {
    const filtered = neighbors.filter(n => n !== node);
    graph.set(key, filtered);
  }
}`,
      lineMap: { 0: 1, 1: 2, 2: 5, 3: 7, 4: 7 },
    },
    csharp: {
      language: 'csharp',
      code: `public void RemoveNode(string node) {
    // Remove the node's entry
    _adjacencyList.Remove(node);

    // Remove all edges pointing to this node
    foreach (var key in _adjacencyList.Keys) {
        _adjacencyList[key].Remove(node);
    }
}`,
      lineMap: { 0: 1, 1: 2, 2: 5, 3: 7, 4: 7 },
    },
  },
  removeEdge: {
    typescript: {
      language: 'typescript',
      code: `function removeEdge(graph: Map<string, string[]>, from: string, to: string, directed = false): void {
  // Remove edge from -> to
  const fromNeighbors = graph.get(from);
  if (fromNeighbors) {
    graph.set(from, fromNeighbors.filter(n => n !== to));
  }

  // For undirected graphs, remove reverse edge
  if (!directed) {
    const toNeighbors = graph.get(to);
    if (toNeighbors) {
      graph.set(to, toNeighbors.filter(n => n !== from));
    }
  }
}`,
      lineMap: { 0: 1, 1: 3, 2: 5, 3: 10, 4: 10 },
    },
    javascript: {
      language: 'javascript',
      code: `function removeEdge(graph, from, to, directed = false) {
  // Remove edge from -> to
  const fromNeighbors = graph.get(from);
  if (fromNeighbors) {
    graph.set(from, fromNeighbors.filter(n => n !== to));
  }

  // For undirected graphs, remove reverse edge
  if (!directed) {
    const toNeighbors = graph.get(to);
    if (toNeighbors) {
      graph.set(to, toNeighbors.filter(n => n !== from));
    }
  }
}`,
      lineMap: { 0: 1, 1: 3, 2: 5, 3: 10, 4: 10 },
    },
    csharp: {
      language: 'csharp',
      code: `public void RemoveEdge(string from, string to, bool directed = false) {
    // Remove edge from -> to
    if (_adjacencyList.ContainsKey(from)) {
        _adjacencyList[from].Remove(to);
    }

    // For undirected graphs, remove reverse edge
    if (!directed && _adjacencyList.ContainsKey(to)) {
        _adjacencyList[to].Remove(from);
    }
}`,
      lineMap: { 0: 1, 1: 3, 2: 5, 3: 8, 4: 8 },
    },
  },
  bfs: {
    typescript: {
      language: 'typescript',
      code: `function bfs(graph: Map<string, string[]>, start: string): string[] {
  const visited = new Set<string>();
  const queue: string[] = [start];
  const result: string[] = [];

  while (queue.length > 0) {
    const node = queue.shift()!;

    if (visited.has(node)) continue;
    visited.add(node);
    result.push(node);

    // Add unvisited neighbors to queue
    for (const neighbor of graph.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    }
  }

  return result;
}`,
      lineMap: { 0: 1, 1: 2, 2: 3, 3: 6, 4: 7, 5: 13, 6: 15, 7: 20, 8: 20, 9: 20 },
    },
    javascript: {
      language: 'javascript',
      code: `function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  const result = [];

  while (queue.length > 0) {
    const node = queue.shift();

    if (visited.has(node)) continue;
    visited.add(node);
    result.push(node);

    // Add unvisited neighbors to queue
    for (const neighbor of graph.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    }
  }

  return result;
}`,
      lineMap: { 0: 1, 1: 2, 2: 3, 3: 6, 4: 7, 5: 13, 6: 15, 7: 20, 8: 20, 9: 20 },
    },
    csharp: {
      language: 'csharp',
      code: `public List<string> BFS(string start) {
    var visited = new HashSet<string>();
    var queue = new Queue<string>();
    var result = new List<string>();

    queue.Enqueue(start);

    while (queue.Count > 0) {
        var node = queue.Dequeue();

        if (visited.Contains(node)) continue;
        visited.Add(node);
        result.Add(node);

        // Add unvisited neighbors to queue
        foreach (var neighbor in _adjacencyList[node]) {
            if (!visited.Contains(neighbor)) {
                queue.Enqueue(neighbor);
            }
        }
    }

    return result;
}`,
      lineMap: { 0: 1, 1: 2, 2: 3, 3: 8, 4: 9, 5: 15, 6: 17, 7: 22, 8: 22, 9: 22 },
    },
  },
  dfs: {
    typescript: {
      language: 'typescript',
      code: `function dfs(graph: Map<string, string[]>, start: string): string[] {
  const visited = new Set<string>();
  const stack: string[] = [start];
  const result: string[] = [];

  while (stack.length > 0) {
    const node = stack.pop()!;

    if (visited.has(node)) continue;
    visited.add(node);
    result.push(node);

    // Add unvisited neighbors to stack (reverse for left-to-right)
    const neighbors = [...(graph.get(node) ?? [])].reverse();
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }

  return result;
}`,
      lineMap: { 0: 1, 1: 2, 2: 3, 3: 6, 4: 7, 5: 13, 6: 16, 7: 20, 8: 20, 9: 20 },
    },
    javascript: {
      language: 'javascript',
      code: `function dfs(graph, start) {
  const visited = new Set();
  const stack = [start];
  const result = [];

  while (stack.length > 0) {
    const node = stack.pop();

    if (visited.has(node)) continue;
    visited.add(node);
    result.push(node);

    // Add unvisited neighbors to stack (reverse for left-to-right)
    const neighbors = [...(graph.get(node) ?? [])].reverse();
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }

  return result;
}`,
      lineMap: { 0: 1, 1: 2, 2: 3, 3: 6, 4: 7, 5: 13, 6: 16, 7: 20, 8: 20, 9: 20 },
    },
    csharp: {
      language: 'csharp',
      code: `public List<string> DFS(string start) {
    var visited = new HashSet<string>();
    var stack = new Stack<string>();
    var result = new List<string>();

    stack.Push(start);

    while (stack.Count > 0) {
        var node = stack.Pop();

        if (visited.Contains(node)) continue;
        visited.Add(node);
        result.Add(node);

        // Add unvisited neighbors to stack (reverse for left-to-right)
        var neighbors = _adjacencyList[node].AsEnumerable().Reverse();
        foreach (var neighbor in neighbors) {
            if (!visited.Contains(neighbor)) {
                stack.Push(neighbor);
            }
        }
    }

    return result;
}`,
      lineMap: { 0: 1, 1: 2, 2: 3, 3: 8, 4: 9, 5: 15, 6: 17, 7: 23, 8: 23, 9: 23 },
    },
  },
};
