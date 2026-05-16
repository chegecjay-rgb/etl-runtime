import {
  CanonicalGraphNode,
} from './types'

export function isOrphanNode(
  node: CanonicalGraphNode,
  knownNodeIds: ReadonlySet<string>
): boolean {
  if (
    node.parentExecutionId === null
  ) {
    return false
  }

  return !knownNodeIds.has(
    node.parentExecutionId
  )
}
