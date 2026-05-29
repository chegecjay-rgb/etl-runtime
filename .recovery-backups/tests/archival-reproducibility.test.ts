import {
  ARCHIVAL_REPRODUCIBILITY,
  ARCHIVAL_ASSERTIONS,
  ARCHIVAL_FREEZE
} from '../src/constitutional/archival-reproducibility.js';

describe('archival reproducibility certification', () => {
  test('manifest reproducibility is certified', () => {
    expect(
      ARCHIVAL_REPRODUCIBILITY.manifestReproducibility
    ).toBe(true);
  });

  test('artifact reproducibility is certified', () => {
    expect(
      ARCHIVAL_REPRODUCIBILITY.artifactReproducibility
    ).toBe(true);
  });

  test('serialization stability is certified', () => {
    expect(
      ARCHIVAL_ASSERTIONS.serializationRemainsStable
    ).toBe(true);
  });

  test('replay identity stability is certified', () => {
    expect(
      ARCHIVAL_ASSERTIONS.replayIdentityRemainsStable
    ).toBe(true);
  });

  test('mutable archival semantics remain prohibited', () => {
    expect(
      ARCHIVAL_FREEZE.mutableArchivalSemantics
    ).toBe(false);
  });
});
