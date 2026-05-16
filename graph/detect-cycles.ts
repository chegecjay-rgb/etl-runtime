export function assertAcyclicGraph(
  adjacency: ReadonlyMap<string, readonly string[]>
): void {
  const visited =
    new Set<string>()

  const active =
    new Set<string>()

  function visit(
    nodeId: string
  ): void {
    if (active.has(nodeId)) {
      throw new Error(
        'Deterministic DAG cycle detected'
      )
    }

    if (visited.has(nodeId)) {
      return
    }

    visited.add(nodeId)
    active.add(nodeId)

    const children =
      adjacency.get(nodeId)
      ?? []

    for (const child of children) {
      visit(child)
    }

    active.delete(nodeId)
  }

  for (const nodeId of adjacency.keys()) {
    visit(nodeId)
  }
}
