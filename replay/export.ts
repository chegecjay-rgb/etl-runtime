import {
  ReplayAttestation,
} from './attestation.js'

export interface ConstitutionalReplayArtifact {
  readonly version: string
  readonly standard: string
  readonly attestation: ReplayAttestation
}

export function exportReplayArtifact(
  attestation: ReplayAttestation
): ConstitutionalReplayArtifact {
  return Object.freeze({
    version: 'v1',
    standard: 'ETL-CONSTITUTIONAL-REPLAY',
    attestation,
  })
}
