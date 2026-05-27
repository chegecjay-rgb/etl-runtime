export type CanonicalMachineState =
  | "VALID"
  | "INVALID"
  | "UNDECLARED"
  | "INCONSISTENT"
  | "UNKNOWN";

export interface CliEmission {
  readonly status: CanonicalMachineState;
  readonly certificationHash: string;
}

export const EXIT_CODES = {
  VALID: 0,
  INVALID: 1,
  UNDECLARED: 2,
  INCONSISTENT: 3,
  UNKNOWN: 4,
  INVALID_ARGUMENT: 10,
  FILE_NOT_FOUND: 11,
  MALFORMED_EVIDENCE: 12
} as const;

const MACHINE_STATES:
  readonly CanonicalMachineState[] = [
    "VALID",
    "INVALID",
    "UNDECLARED",
    "INCONSISTENT",
    "UNKNOWN"
  ];

export function formatCliOutput(
  emission: CliEmission
): string {
  validateEmission(emission);

  return JSON.stringify({
    status: emission.status,
    certificationHash:
      emission.certificationHash
  });
}

export function emitCliOutput(
  emission: CliEmission
): void {
  process.stdout.write(
    formatCliOutput(emission) + "\n"
  );
}

function validateEmission(
  emission: CliEmission
): void {
  if (
    !MACHINE_STATES.includes(
      emission.status
    )
  ) {
    throw new Error(
      "INVALID_MACHINE_STATE"
    );
  }

  if (
    typeof emission
      .certificationHash !==
      "string" ||
    emission
      .certificationHash
      .length === 0
  ) {
    throw new Error(
      "INVALID_CERTIFICATION_HASH"
    );
  }
}
