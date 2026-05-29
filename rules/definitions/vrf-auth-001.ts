import { deepFreeze, type Immutable } from "../immutable.js";
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
    ruleId: "VRF-AUTH-001",
    state,
    reason,
  });
}

export const VRF_AUTH_001: VerificationRule = {
  ruleId: "VRF-AUTH-001",
  evaluationScope: "AUTHORITY",
  description: "undeclared authority continuity enforcement",

  evaluate(
    context: Immutable<RuleEvaluationContext>,
  ): Immutable<RuleResult> {
    if (
      context.authorityHash.length === 0 ||
      context.authorityHash === context.graphHash
    ) {
      return buildResult(
        "INCONSISTENT",
        "authority continuity divergence detected",
      );
    }

    return buildResult(
      "VALID",
      "authority continuity verified",
    );
  },
};
