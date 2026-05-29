import * as assert from 'assert'

import type { ReplayAttestation } from "./attestation.js";

export function verifyReplayAttestation(
  attestation: ReplayAttestation
): void {
  assert.ok(
    typeof attestation.graphHash === 'string'
  )

  assert.ok(
    typeof attestation.traversalHash === 'string'
  )

  assert.ok(
    typeof attestation.replayHash === 'string'
  )

  assert.ok(
    typeof attestation.attestationHash === 'string'
  )

  assert.ok(
    attestation.graphHash.length > 0
  )

  assert.ok(
    attestation.traversalHash.length > 0
  )

  assert.ok(
    attestation.replayHash.length > 0
  )

  assert.ok(
    attestation.attestationHash.length > 0
  )
}
