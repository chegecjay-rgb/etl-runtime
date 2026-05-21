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
    ruleId: "VRF-ORDER-001",
    state,
    reason,
  });
}

export const VRF_ORDER_001: VerificationRule = {
  ruleId: "VRF-ORDER-001",
  evaluationScope: "ORDER",
  description: "deterministic execution ordering enforcement",

  evaluate(
    context: Immutable<RuleEvaluationContext>,
  ): Immutable<RuleResult> {
    if (context.traversalHash.length === 0) {
      return buildResult(
        "UNKNOWN",
        "missing traversal ordering evidence",
      );
    }

    if (
      context.traversalHash === context.graphHash
    ) {
      return buildResult(
        "INCONSISTENT",
        "ordering continuity collision detected",
      );
    }

    return buildResult(
      "VALID",
      "deterministic execution ordering verified",
    );
  },
};
