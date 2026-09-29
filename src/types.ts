export interface GraphNode {
  id: string;
  label: string;
  type: 'ENTITY';
}

export interface GraphEdge {
  source: string;
  target: string;
  relation: string;
}

export interface KnowledgeGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
