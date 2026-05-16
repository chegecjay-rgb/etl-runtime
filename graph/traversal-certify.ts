export function assertTraversalEquivalence(
  left: readonly string[],
  right: readonly string[]
): void {
  if (
    left.length !==
    right.length
  ) {
    throw new Error(
      'Deterministic traversal divergence detected'
    )
  }

  for (
    let index = 0;
    index < left.length;
    index += 1
  ) {
    if (
      left[index] !==
      right[index]
    ) {
      throw new Error(
        'Deterministic traversal divergence detected'
      )
    }
  }
}
