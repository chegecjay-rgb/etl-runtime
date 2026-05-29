import { createHash  } from "crypto";
import type { DeterministicFailure } from "./deterministic-failure.js";

export interface RejectionManifest {
  readonly version: "TASK-017";
  readonly status: "REJECTED";
  readonly rejectionCode: string;
  readonly message: string;
  readonly canonicalHash: string;
  readonly inputHash: string;
  readonly timestamp: null;
  readonly entropy: false;
}

function stableSerialize(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableSerialize).join(",")}]`;
  }

  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .sort(([a], [b]) => a.localeCompare(b));

    return `{${entries
      .map(([key, val]) => `${JSON.stringify(key)}:${stableSerialize(val)}`)
      .join(",")}}`;
  }

  return JSON.stringify(value);
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function createRejectionManifest(
  failure: DeterministicFailure,
  input: unknown
): RejectionManifest {
  const inputHash = sha256(stableSerialize(input));

  const partial = {
    version: "TASK-017" as const,
    status: "REJECTED" as const,
    rejectionCode: failure.rejectionCode,
    message: failure.message,
    inputHash,
    timestamp: null,
    entropy: false as const
  };

  const canonicalHash = sha256(stableSerialize(partial));

  return Object.freeze({
    ...partial,
    canonicalHash
  });
}

export function serializeRejectionManifest(
  manifest: RejectionManifest
): string {
  return stableSerialize(manifest);
}
