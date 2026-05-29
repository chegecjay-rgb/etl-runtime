import {
  ORCHESTRATION_LIMITS,
  ORCHESTRATION_MODEL,
  ORCHESTRATION_ASSERTIONS
} from '../src/constitutional/orchestration-thinness.js';

describe('orchestration thinness certification', () => {
  test('orchestration model preserves procedural ordering', () => {
    expect(ORCHESTRATION_MODEL).toEqual([
      'receive',
      'invoke',
      'emit'
    ]);
  });

  test('orchestration limits remain immutable', () => {
    expect(Object.isFrozen(ORCHESTRATION_LIMITS)).toBe(true);
  });

  test('orchestration assertions remain immutable', () => {
    expect(Object.isFrozen(ORCHESTRATION_ASSERTIONS)).toBe(true);
  });

  test('semantic interpretation remains prohibited', () => {
    expect(
      ORCHESTRATION_LIMITS.semanticInterpretation
    ).toBe(false);
  });

  test('adaptive dispatch remains prohibited', () => {
    expect(
      ORCHESTRATION_LIMITS.adaptiveDispatch
    ).toBe(false);
  });
});
