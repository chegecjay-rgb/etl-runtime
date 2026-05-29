import {
  AUTHORITY_BOUNDARIES,
  AUTHORITY_ISOLATION_ASSERTIONS,
  AUTHORITY_BOUNDARY_FREEZE
} from '../src/constitutional/authority-boundaries.js';

describe('authority boundary certification', () => {
  test('all authority boundaries are frozen', () => {
    expect(Object.isFrozen(AUTHORITY_BOUNDARIES)).toBe(true);

    for (const boundary of AUTHORITY_BOUNDARIES) {
      expect(Object.isFrozen(boundary)).toBe(true);
    }
  });

  test('all authority mappings are readonly', () => {
    for (const boundary of AUTHORITY_BOUNDARIES) {
      expect(boundary.mutable).toBe(false);
    }
  });

  test('no authority overlap exists', () => {
    for (const boundary of AUTHORITY_BOUNDARIES) {
      expect(boundary.overlappingAuthorities.length).toBe(0);
    }
  });

  test('constitutional isolation assertions remain frozen', () => {
    expect(
      Object.isFrozen(AUTHORITY_ISOLATION_ASSERTIONS)
    ).toBe(true);
  });

  test('constitutional freeze policy remains immutable', () => {
    expect(
      Object.isFrozen(AUTHORITY_BOUNDARY_FREEZE)
    ).toBe(true);

    expect(
      AUTHORITY_BOUNDARY_FREEZE.authorityOverlapAllowed
    ).toBe(false);

    expect(
      AUTHORITY_BOUNDARY_FREEZE.semanticBleedAllowed
    ).toBe(false);
  });
});
