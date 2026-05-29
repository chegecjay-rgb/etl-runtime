import type { RejectionCode } from "./rejection-codes.js";

export interface DeterministicFailure {
  readonly status: "REJECTED";
  readonly rejectionCode: RejectionCode;
  readonly message: string;
}

export function createDeterministicFailure(
  rejectionCode: RejectionCode,
  message: string
): DeterministicFailure {
  return Object.freeze({
    status: "REJECTED" as const,
    rejectionCode,
    message
  });
}
