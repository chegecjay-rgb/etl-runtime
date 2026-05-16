import {
  CanonicalExecutionDAG,
  CanonicalProjectionRecord,
} from '../../graph/types'

import {
  materializeNodes,
} from './construct'

import {
  materializeEdges,
} from './link'

import {
  buildAdjacencyMap,
} from '../../graph/adjacency-map'

import {
  buildReverseAdjacencyMap,
} from '../../graph/reverse-adjacency'

import {
  extractRootNodeIds,
} from '../../graph/roots'

import {
  extractOrphanNodeIds,
} from '../../graph/extract-orphans'

import {
  certifyGraphHash,
} from '../../graph/certify'

import {
  deepFreeze,
} from '../../graph/immutable'

export function assembleCanonicalDAG(
  records: readonly CanonicalProjectionRecord[]
): CanonicalExecutionDAG {
  const nodes =
    materializeNodes(records)

  const edges =
    materializeEdges(nodes)

  const adjacency =
    buildAdjacencyMap(edges)

  const reverseAdjacency =
    buildReverseAdjacencyMap(edges)

  const roots =
    extractRootNodeIds(nodes)

  const orphans =
    extractOrphanNodeIds(nodes)

  const graphHash =
    certifyGraphHash({
      nodes,
      edges,
      roots,
      orphans,
    })

  return deepFreeze({
    graphHash,
    nodes,
    edges,
    adjacency,
    reverseAdjacency,
    roots,
    orphans,
  })
}
