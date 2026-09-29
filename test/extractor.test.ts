import { describe, it, expect } from 'vitest';
import { extractGraph } from '../src/extractor.js';

describe('extractGraph', () => {
  it('extracts two co-occurring entities from a sentence', () => {
    const graph = extractGraph('Ada Lovelace worked with Charles Babbage.');
    expect(graph.nodes.map((n) => n.label)).toEqual(
      expect.arrayContaining(['Ada Lovelace', 'Charles Babbage'])
    );
    expect(graph.edges.length).toBeGreaterThan(0);
  });
});
