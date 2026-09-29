import type { GraphNode, GraphEdge, KnowledgeGraph } from './types.js';

/**
 * In-memory knowledge graph store.
 * Nodes are deduplicated by normalized label (trimmed, case-insensitive).
 */
export class GraphStore {
  private nodesById = new Map<string, GraphNode>();
  private labelToId = new Map<string, string>();
  private edges: GraphEdge[] = [];
  private nextId = 1;

  addEntity(label: string): GraphNode {
    const key = label.trim().toLowerCase();
    const existingId = this.labelToId.get(key);
    if (existingId) {
      return this.nodesById.get(existingId)!;
    }
    const id = `n${this.nextId++}`;
    const node: GraphNode = { id, label: label.trim(), type: 'ENTITY' };
    this.nodesById.set(id, node);
    this.labelToId.set(key, id);
    return node;
  }

  addRelation(sourceLabel: string, relation: string, targetLabel: string): GraphEdge {
    const source = this.addEntity(sourceLabel);
    const target = this.addEntity(targetLabel);
    const edge: GraphEdge = { source: source.id, target: target.id, relation };
    this.edges.push(edge);
    return edge;
  }

  toGraph(): KnowledgeGraph {
    return {
      nodes: Array.from(this.nodesById.values()),
      edges: [...this.edges],
    };
  }
}
