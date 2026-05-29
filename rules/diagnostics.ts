import type { deepFreeze, type Immutable } from "./immutable.js";
import type { RuleCertification } from "./certify.js";
import type { ExecutionResult } from "./execute.js";
import type { TraversalResult } from "./traversal.js";

export interface RuleDiagnostics {
  readonly totalExecutedRules: number;
  readonly traversalRuleCount: number;
  readonly certificationHash: string;
  readonly executionHash: string;
}

export function createDiagnostics(
  execution: Immutable<ExecutionResult>,
  traversal: Immutable<TraversalResult>,
  certification: Immutable<RuleCertification>,
): Immutable<RuleDiagnostics> {
  return deepFreeze({
    totalExecutedRules: execution.totalExecuted,
    traversalRuleCount: traversal.totalRules,
    certificationHash: certification.certificationHash,
    executionHash: certification.executionHash,
  });
}
