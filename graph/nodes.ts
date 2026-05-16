import {
  CanonicalGraphNode,
  CanonicalProjectionRecord,
} from './types'

import { sha256 } from './hashes'

export function createNode(
  record: CanonicalProjectionRecord
): CanonicalGraphNode {
  const nodeId = sha256(
    record.executionId
  )

  return Object.freeze({
    nodeId,
    executionId:
      record.executionId,
    parentExecutionId:
      record.parentExecutionId,
    depth: null,
    ordinal: record.ordinal,
    hash: sha256(
      JSON.stringify(record)
    ),
  })
}
