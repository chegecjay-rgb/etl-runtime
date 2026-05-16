import {
  CanonicalGraphNode,
} from './types'

export function sortNodes(
  nodes: readonly CanonicalGraphNode[]
): readonly CanonicalGraphNode[] {
  return Object.freeze(
    [...nodes].sort(
      (left, right) =>
        left.nodeId.localeCompare(
          right.nodeId
        )
    )
  )
}
