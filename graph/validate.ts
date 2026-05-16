import {
  CanonicalGraphNode,
} from './types'

export function indexNodes(
  nodes: readonly CanonicalGraphNode[]
): ReadonlyMap<
  string,
  CanonicalGraphNode
> {
  return new Map(
    nodes.map((node) => [
      node.nodeId,
      node,
    ])
  )
}
