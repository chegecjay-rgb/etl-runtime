import * as assert from 'assert'

import {
  createReplayAttestation,
} from '../../replay/attestation.js'

import {
  exportReplayArtifact,
} from '../../replay/export.js'

import {
  verifyReplayAttestation,
} from '../../replay/verify.js'

const attestation =
  createReplayAttestation(
    'graph-hash',
    'traversal-hash'
  )

verifyReplayAttestation(
  attestation
)

const artifact =
  exportReplayArtifact(
    attestation
  )

assert.ok(
  Object.isFrozen(
    attestation
  )
)

assert.ok(
  Object.isFrozen(
    artifact
  )
)

assert.ok(
  artifact.version === 'v1'
)

assert.ok(
  artifact.standard ===
    'ETL-CONSTITUTIONAL-REPLAY'
)

console.log(
  'attestation.test.ts passed'
)
