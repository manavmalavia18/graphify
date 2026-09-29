import { GraphStore } from './graph.js';
import type { KnowledgeGraph } from './types.js';

// Matches sequences of capitalized words, e.g. "Ada Lovelace", "Charles Babbage".
const ENTITY_PATTERN = /[A-Z][a-z]+(?:\s[A-Z][a-z]+)*/g;

function splitSentences(text: string): string[] {
  return text.split(/[.!?]/).map((s) => s.trim());
}

function extractEntities(sentence: string): string[] {
  const matches = sentence.match(ENTITY_PATTERN);
  return matches ?? [];
}

/**
 * Extracts a knowledge graph from free text.
 * Entities are detected via capitalized-word sequences. Any two entities
 * that co-occur in the same sentence are connected with a MENTIONED_WITH
 * relation.
 */
export function extractGraph(text: string): KnowledgeGraph {
  const store = new GraphStore();
  const sentences = splitSentences(text);

  for (const sentence of sentences) {
    const entities = extractEntities(sentence);
    for (let i = 0; i < entities.length; i++) {
      for (let j = i; j < entities.length; j++) {
        store.addRelation(entities[i], 'MENTIONED_WITH', entities[j]);
      }
    }
  }

  return store.toGraph();
}
