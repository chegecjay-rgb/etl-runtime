import {
  PUBLICATION_CERTIFICATION,
  PUBLICATION_ASSERTIONS,
  PUBLICATION_READINESS_FREEZE
} from '../src/certification/publication-certifier.js';

describe('publication readiness certification', () => {
  test('publication stability is frozen', () => {
    expect(PUBLICATION_CERTIFICATION.publicationStable).toBe(true);
  });

  test('semantic immutability is certified', () => {
    expect(PUBLICATION_ASSERTIONS.semanticImmutabilityProven).toBe(true);
  });

  test('deterministic boundedness is certified', () => {
    expect(
      PUBLICATION_ASSERTIONS.deterministicBoundednessProven
    ).toBe(true);
  });

  test('replay stability is certified', () => {
    expect(PUBLICATION_CERTIFICATION.replayStable).toBe(true);
  });

  test('publication mutation remains prohibited', () => {
    expect(
      PUBLICATION_READINESS_FREEZE.mutablePublicationSemantics
    ).toBe(false);
  });
});
