import fs from "node:fs";

import {
  type CanonicalMachineState
} from "../../cli/output";

export interface RuntimeExecutionResult {
  readonly status: CanonicalMachineState;
  readonly certificationHash: string;
}

export type RuntimeFailureCode =
  | "MALFORMED_EVIDENCE";

export interface RuntimeFailure {
  readonly code: RuntimeFailureCode;
  readonly message: RuntimeFailureCode;
}

export function executeVerifierRuntime(
  evidencePath: string
): RuntimeExecutionResult {
  const evidence = loadDeterministicEvidence(
    evidencePath
  );

  return {
    status: deriveMachineState(evidence),
    certificationHash:
      deriveCertificationHash(evidence)
  };
}

function loadDeterministicEvidence(
  evidencePath: string
): unknown {
  const raw = fs.readFileSync(
    evidencePath,
    "utf8"
  );

  try {
    return JSON.parse(raw);
  } catch {
    const failure: RuntimeFailure = {
      code: "MALFORMED_EVIDENCE",
      message: "MALFORMED_EVIDENCE"
    };

    throw failure;
  }
}

function deriveMachineState(
  evidence: unknown
): CanonicalMachineState {
  if (
    typeof evidence === "object" &&
    evidence !== null &&
    "status" in evidence
  ) {
    const candidate = (
      evidence as {
        status?: unknown;
      }
    ).status;

    if (
      candidate === "VALID" ||
      candidate === "INVALID" ||
      candidate === "UNDECLARED" ||
      candidate === "INCONSISTENT" ||
      candidate === "UNKNOWN"
    ) {
      return candidate;
    }
  }

  return "UNKNOWN";
}

function deriveCertificationHash(
  evidence: unknown
): string {
  return Buffer
    .from(
      JSON.stringify(evidence)
    )
    .toString("base64");
}
