import {
  CONSTITUTIONAL_EXECUTION_MODEL,
  EXECUTION_MODEL_ASSERTIONS,
  EXECUTION_MODEL_FREEZE
} from '../src/constitutional/execution-model';

describe('constitutional execution model freeze', () => {
  test('execution model preserves canonical ordering', () => {
    expect(CONSTITUTIONAL_EXECUTION_MODEL).toEqual([
      'receive',
      'canonicalize',
      'classify',
      'emit'
    ]);
  });

  test('execution model is immutable', () => {
    expect(Object.isFrozen(CONSTITUTIONAL_EXECUTION_MODEL)).toBe(true);
  });

  test('execution assertions remain constitutionally frozen', () => {
    expect(Object.isFrozen(EXECUTION_MODEL_ASSERTIONS)).toBe(true);
  });

  test('execution freeze policy remains immutable', () => {
    expect(Object.isFrozen(EXECUTION_MODEL_FREEZE)).toBe(true);
  });

  test('semantic mutation remains prohibited', () => {
    expect(
      EXECUTION_MODEL_FREEZE.semanticMutationAllowed
    ).toBe(false);
  });
});
