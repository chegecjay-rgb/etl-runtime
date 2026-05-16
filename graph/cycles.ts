export function assertNoSelfCycle(
  parentNodeId: string,
  childNodeId: string
): void {
  if (
    parentNodeId === childNodeId
  ) {
    throw new Error(
      'Deterministic DAG self-cycle detected'
    )
  }
}
