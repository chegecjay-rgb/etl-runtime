import {
  EXECUTION_MODEL,
  SUBSYSTEM_AUTHORITIES,
  CONVERGENCE_ASSERTIONS,
  CONVERGENCE_FREEZE
} from '../src/constitutional/convergence.js';

describe('subsystem convergence certification', () => {
  test('all subsystems converge under canonical execution model', () => {
    expect(EXECUTION_MODEL).toEqual([
      'receive',
      'canonicalize',
      'classify',
      'emit'
    ]);
  });

  test('subsystem authorities remain immutable', () => {
    expect(Object.isFrozen(SUBSYSTEM_AUTHORITIES)).toBe(true);
  });

  test('convergence assertions remain immutable', () => {
    expect(Object.isFrozen(CONVERGENCE_ASSERTIONS)).toBe(true);
  });

  test('convergence freeze policy remains immutable', () => {
    expect(Object.isFrozen(CONVERGENCE_FREEZE)).toBe(true);
  });

  test('semantic fragmentation remains prohibited', () => {
    expect(
      CONVERGENCE_FREEZE.semanticFragmentationAllowed
    ).toBe(false);
  });
});
