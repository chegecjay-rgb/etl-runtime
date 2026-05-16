import {
  CanonicalGraphNode,
} from './types'

export function isRootNode(
  node: CanonicalGraphNode
): boolean {
  return (
    node.parentExecutionId ===
    null
  )
}
