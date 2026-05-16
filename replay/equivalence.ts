import * as assert from 'assert'

export function assertReplayEquivalence(
  left: readonly string[],
  right: readonly string[]
): void {
  assert.deepStrictEqual(
    left,
    right
  )
}
