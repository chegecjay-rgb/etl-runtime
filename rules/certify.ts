import { deepFreeze, type Immutable } from "./immutable.js";
import { canonicalSerialize, hashValue } from "./hashes.js";
import type { ExecutionResult } from "./execute.js";

export interface RuleCertification {
  readonly certificationHash: string;
  readonly executionHash: string;
  readonly serializedResult: string;
}

export function certifyExecution(
  executionResult: Immutable<ExecutionResult>,
): Immutable<RuleCertification> {
  const serializedResult = canonicalSerialize(executionResult);

  const executionHash = hashValue(serializedResult);

  return deepFreeze({
    certificationHash: hashValue({
      executionHash,
      serializedResult,
    }),
    executionHash,
    serializedResult,
  });
}
