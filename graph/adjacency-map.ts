import {
  CanonicalGraphEdge,
} from './types'

import {
  sortAdjacency,
} from './adjacency'

export function buildAdjacencyMap(
  edges: readonly CanonicalGraphEdge[]
): ReadonlyMap<
  string,
  readonly string[]
> {
  const adjacency =
    new Map<string, string[]>()

  for (const edge of edges) {
    const existing =
      adjacency.get(
        edge.parentNodeId
      ) ?? []

    existing.push(
      edge.childNodeId
    )

    adjacency.set(
      edge.parentNodeId,
      existing
    )
  }

  return new Map(
    [...adjacency.entries()].map(
      ([key, values]) => [
        key,
        sortAdjacency(values),
      ]
    )
  )
}
