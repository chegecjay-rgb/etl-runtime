import {
  CanonicalGraphEdge,
} from './types'

import {
  sortAdjacency,
} from './adjacency'

export function buildReverseAdjacencyMap(
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
        edge.childNodeId
      ) ?? []

    existing.push(
      edge.parentNodeId
    )

    adjacency.set(
      edge.childNodeId,
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
