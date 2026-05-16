import {
  CanonicalProjectionRecord,
} from '../../graph/types'

import {
  createNode,
} from '../../graph/nodes'

import {
  sortNodes,
} from '../../graph/sort-nodes'

export function materializeNodes(
  records: readonly CanonicalProjectionRecord[]
) {
  return sortNodes(
    records.map(createNode)
  )
}
