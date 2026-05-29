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
    ruleId: "VRF-DECL-001",
    state,
    reason,
  });
}

export const VRF_DECL_001: VerificationRule = {
  ruleId: "VRF-DECL-001",
  evaluationScope: "DECLARATION",
  description: "undeclared execution surface invalidation",

  evaluate(
    context: Immutable<RuleEvaluationContext>,
  ): Immutable<RuleResult> {
    if (
      context.authorityHash.length === 0 ||
      context.evidenceHash.length === 0
    ) {
      return buildResult(
        "UNKNOWN",
        "missing constitutional declaration evidence",
      );
    }

    if (
      context.authorityHash === context.evidenceHash
    ) {
      return buildResult(
        "INVALID",
        "undeclared execution surface detected",
      );
    }

    return buildResult(
      "VALID",
      "constitutional declaration continuity verified",
    );
  },
};
