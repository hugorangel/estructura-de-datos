import type { IDataStructureVisualizer } from '../interfaces';

class DataStructureRegistryClass {
  private structures: Map<string, IDataStructureVisualizer> = new Map();
  private listeners: Set<() => void> = new Set();

  register<TData, TState>(
    structure: IDataStructureVisualizer<TData, TState>
  ): void {
    if (this.structures.has(structure.id)) {
      console.warn(
        `Data structure with id "${structure.id}" is already registered. Overwriting.`
      );
    }
    this.structures.set(
      structure.id,
      structure as unknown as IDataStructureVisualizer
    );
    this.notifyListeners();
  }

  unregister(id: string): boolean {
    const result = this.structures.delete(id);
    if (result) {
      this.notifyListeners();
    }
    return result;
  }

  get(id: string): IDataStructureVisualizer | undefined {
    return this.structures.get(id);
  }

  getBySlug(slug: string): IDataStructureVisualizer | undefined {
    for (const structure of this.structures.values()) {
      if (structure.slug === slug) {
        return structure;
      }
    }
    return undefined;
  }

  getAll(): IDataStructureVisualizer[] {
    return Array.from(this.structures.values());
  }

  getByCategory(
    category: IDataStructureVisualizer['category']
  ): IDataStructureVisualizer[] {
    return this.getAll().filter((s) => s.category === category);
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }

  get size(): number {
    return this.structures.size;
  }

  has(id: string): boolean {
    return this.structures.has(id);
  }
}

export const DataStructureRegistry = new DataStructureRegistryClass();
