import { deepFreeze, type Immutable } from "./immutable";
import type { RuleCertification } from "./certify";
import type { ExecutionResult } from "./execute";
import type { TraversalResult } from "./traversal";

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
