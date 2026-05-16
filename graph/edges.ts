import {
  CanonicalGraphEdge,
} from './types'

import { sha256 } from './hashes'

export function createEdge(
  parentNodeId: string,
  childNodeId: string,
  ordinal: number
): CanonicalGraphEdge {
  const edgeId = sha256(
    parentNodeId +
    ':' +
    childNodeId
  )

  return Object.freeze({
    edgeId,
    parentNodeId,
    childNodeId,
    ordinal,
    hash: sha256(
      JSON.stringify({
        parentNodeId,
        childNodeId,
        ordinal,
      })
    ),
  })
}
