import {
  CanonicalExecutionDAG,
  CanonicalProjectionRecord,
} from '../../graph/types'

import {
  deepFreeze,
} from '../../graph/immutable'

import {
  assembleCanonicalDAG,
} from './assemble'

import {
  validateCanonicalDAG,
} from './validate'

export function projectCanonicalDAG(
  records: readonly CanonicalProjectionRecord[]
): CanonicalExecutionDAG {
  return validateCanonicalDAG(
    assembleCanonicalDAG(records)
  )
}
