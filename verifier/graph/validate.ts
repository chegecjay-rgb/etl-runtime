import {
  CanonicalExecutionDAG,
} from '../../graph/types'

import {
  assertAcyclicGraph,
} from '../../graph/detect-cycles'

export function validateCanonicalDAG(
  dag: CanonicalExecutionDAG
): CanonicalExecutionDAG {
  assertAcyclicGraph(
    dag.adjacency
  )

  return dag
}
