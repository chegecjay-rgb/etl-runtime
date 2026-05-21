import { deepFreeze, type Immutable } from "../immutable";
import type { RuleEvaluationContext } from "../context";
import type {
  RuleResult,
  VerificationRule,
} from "../types";

function buildResult(
  state: RuleResult["state"],
  reason: string,
): Immutable<RuleResult> {
  return deepFreeze({
    ruleId: "VRF-GRAPH-001",
    state,
    reason,
  });
}

export const VRF_GRAPH_001: VerificationRule = {
  ruleId: "VRF-GRAPH-001",
  evaluationScope: "GRAPH",
  description: "cyclic causality invalidation",

  evaluate(
    context: Immutable<RuleEvaluationContext>,
  ): Immutable<RuleResult> {
    if (
      context.graphHash.length === 0 ||
      context.graphHash === context.traversalHash
    ) {
      return buildResult(
        "INVALID",
        "cyclic causality detected",
      );
    }

    return buildResult(
      "VALID",
      "causality graph verified",
    );
  },
};
