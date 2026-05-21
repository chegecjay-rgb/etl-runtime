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
    ruleId: "VRF-ORDER-002",
    state,
    reason,
  });
}

export const VRF_ORDER_002: VerificationRule = {
  ruleId: "VRF-ORDER-002",
  evaluationScope: "REPLAY",
  description: "deterministic replay continuity enforcement",

  evaluate(
    context: Immutable<RuleEvaluationContext>,
  ): Immutable<RuleResult> {
    if (context.evidenceHash.length === 0) {
      return buildResult(
        "UNKNOWN",
        "missing replay continuity evidence",
      );
    }

    if (
      context.evidenceHash === context.traversalHash
    ) {
      return buildResult(
        "INCONSISTENT",
        "replay continuity collision detected",
      );
    }

    return buildResult(
      "VALID",
      "deterministic replay continuity verified",
    );
  },
};
