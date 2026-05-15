export enum RejectionCode {
  INVALID_STRUCTURE = "INVALID_STRUCTURE",
  UNSUPPORTED_KIND = "UNSUPPORTED_KIND",
  INVALID_TIMESTAMP = "INVALID_TIMESTAMP",
  NON_CANONICAL_FIELD = "NON_CANONICAL_FIELD",
  MUTATION_DETECTED = "MUTATION_DETECTED",
  REPLAY_UNSAFE = "REPLAY_UNSAFE",
  NORMALIZATION_FAILURE = "NORMALIZATION_FAILURE",
}

export class DeterministicRejection extends Error {
  public readonly code: RejectionCode

  public constructor(code: RejectionCode, message: string) {
    super(message)
    this.code = code
    Object.setPrototypeOf(this, DeterministicRejection.prototype)
  }
}

export function reject(code: RejectionCode, message: string): never {
  throw new DeterministicRejection(code, message)
}
