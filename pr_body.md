## Summary
Adds `extractGraph(text)` which parses free text and builds a knowledge graph of entities and their relationships automatically -- no manual relation list needed.

## What changed
- New `src/extractor.ts`: detects entities via capitalized-word matching and links entities that appear in the same sentence.
- Exported `extractGraph` from `src/index.ts`.
- Added a test for the extractor.

## Why
Building relations by hand (`buildGraphFromRelations`) doesn't scale -- this lets us ingest raw notes/articles and get a graph out automatically, handling relationship extraction between any entities found in a sentence.

## Testing
- `npm test` passes
- `npm run typecheck` passes
