import {
  CanonicalExecutionDAG,
} from './types'

export function assertGraphReplayEquivalence(
  left: CanonicalExecutionDAG,
  right: CanonicalExecutionDAG
): void {
  if (
    left.graphHash !==
    right.graphHash
  ) {
    throw new Error(
      'Deterministic DAG replay divergence detected'
    )
  }
}
