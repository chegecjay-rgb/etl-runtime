export function depthFirstTraversal(
  rootNodeId: string,
  adjacency: ReadonlyMap<
    string,
    readonly string[]
  >
): readonly string[] {
  const visited =
    new Set<string>()

  const traversal: string[] = []

  function visit(
    nodeId: string
  ): void {
    if (visited.has(nodeId)) {
      return
    }

    visited.add(nodeId)

    traversal.push(nodeId)

    const children =
      adjacency.get(nodeId)
      ?? []

    for (const child of children) {
      visit(child)
    }
  }

  visit(rootNodeId)

  return Object.freeze(
    traversal
  )
}
