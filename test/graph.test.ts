import { describe, it, expect } from 'vitest';
import { GraphStore } from '../src/graph.js';
import { buildGraphFromRelations } from '../src/index.js';

describe('GraphStore', () => {
  it('deduplicates entities by normalized label', () => {
    const store = new GraphStore();
    const a = store.addEntity('Ada Lovelace');
    const b = store.addEntity('  ada lovelace  ');
    expect(a.id).toBe(b.id);
  });

  it('creates an edge between two entities', () => {
    const store = new GraphStore();
    const edge = store.addRelation('Ada Lovelace', 'WORKED_WITH', 'Charles Babbage');
    const graph = store.toGraph();
    expect(graph.nodes).toHaveLength(2);
    expect(graph.edges).toHaveLength(1);
    expect(edge.relation).toBe('WORKED_WITH');
  });
});

describe('buildGraphFromRelations', () => {
  it('builds a graph from a list of relations', () => {
    const graph = buildGraphFromRelations([
      { source: 'Ada Lovelace', relation: 'WORKED_WITH', target: 'Charles Babbage' },
    ]);
    expect(graph.nodes).toHaveLength(2);
    expect(graph.edges).toHaveLength(1);
  });
});
