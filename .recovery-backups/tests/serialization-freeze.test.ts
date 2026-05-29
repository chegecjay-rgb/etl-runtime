import {
  SERIALIZATION_FREEZE,
  SERIALIZATION_ASSERTIONS,
  SERIALIZATION_CONTRACT_FREEZE
} from '../src/constitutional/serialization-freeze.js';

describe('serialization contract freeze', () => {
  test('serialization freeze policy remains stable', () => {
    expect(SERIALIZATION_FREEZE).toEqual({
      encoding: 'utf-8',
      newline: '\n',
      keyOrdering: 'lexicographic',
      deterministicBuffers: true,
      replaySafeCanonicalization: true
    });
  });

  test('serialization freeze object is immutable', () => {
    expect(Object.isFrozen(SERIALIZATION_FREEZE)).toBe(true);
  });

  test('serialization assertions remain immutable', () => {
    expect(Object.isFrozen(SERIALIZATION_ASSERTIONS)).toBe(true);
  });

  test('serialization contract freeze remains immutable', () => {
    expect(
      Object.isFrozen(SERIALIZATION_CONTRACT_FREEZE)
    ).toBe(true);
  });

  test('mutable serialization remains prohibited', () => {
    expect(
      SERIALIZATION_CONTRACT_FREEZE.mutableSerializationAllowed
    ).toBe(false);
  });
});
