import type { deepFreeze, type Immutable } from "../immutable.js";
import type { RuleEvaluationContext } from "../context.js";
import type {
  RuleResult,
  VerificationRule,
} from "../types.js";

function buildResult(
  state: RuleResult["state"],
  reason: string,
): Immutable<RuleResult> {
  return deepFreeze({
    ruleId: "VRF-GRAPH-002",
    state,
    reason,
  });
}

export const VRF_GRAPH_002: VerificationRule = {
  ruleId: "VRF-GRAPH-002",
  evaluationScope: "GRAPH",
  description: "orphan causality preservation",

  evaluate(
    context: Immutable<RuleEvaluationContext>,
  ): Immutable<RuleResult> {
    if (
      context.traversalHash.length === 0 ||
      context.evidenceHash.length === 0
    ) {
      return buildResult(
        "UNKNOWN",
        "insufficient causality evidence detected",
      );
    }

    if (
      context.traversalHash === context.evidenceHash
    ) {
      return buildResult(
        "INCONSISTENT",
        "orphan causality preservation failure detected",
      );
    }

    return buildResult(
      "VALID",
      "orphan causality preservation verified",
    );
  },
};
