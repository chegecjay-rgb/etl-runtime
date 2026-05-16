import {
  createHash,
} from 'crypto'

export interface ReplayAttestation {
  readonly graphHash: string
  readonly traversalHash: string
  readonly replayHash: string
  readonly attestationHash: string
}

export function createReplayAttestation(
  graphHash: string,
  traversalHash: string
): ReplayAttestation {
  const replayHash =
    createHash('sha256')
      .update(
        JSON.stringify({
          graphHash,
          traversalHash,
        })
      )
      .digest('hex')

  const attestationHash =
    createHash('sha256')
      .update(
        JSON.stringify({
          replayHash,
        })
      )
      .digest('hex')

  return Object.freeze({
    graphHash,
    traversalHash,
    replayHash,
    attestationHash,
  })
}
