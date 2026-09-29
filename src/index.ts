import { GraphStore } from './graph.js';
import type { KnowledgeGraph } from './types.js';

export { extractGraph } from './extractor.js';

export function buildGraphFromRelations(
  relations: Array<{ source: string; relation: string; target: string }>
): KnowledgeGraph {
  const store = new GraphStore();
  for (const r of relations) {
    store.addRelation(r.source, r.relation, r.target);
  }
  return store.toGraph();
}
