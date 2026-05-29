import type { deepFreeze, type Immutable } from "../../rules/immutable.js";
import type { RuleContextInput } from "../../rules/context.js";
import {
  CONSTITUTIONAL_RULES,
} from "../../rules/definitions.js";
import {
  verifyRules,
  type VerificationRuntimeResult,
} from "./verify.js";

export interface ConstitutionalRuntimeResult {
  readonly result: Immutable<VerificationRuntimeResult>;
  readonly totalRules: number;
}

export function runConstitutionalVerification(
  contextInput: RuleContextInput,
): Immutable<ConstitutionalRuntimeResult> {
  const result = verifyRules(
    contextInput,
    CONSTITUTIONAL_RULES,
  );

  return deepFreeze({
    result,
    totalRules: CONSTITUTIONAL_RULES.length,
  });
}
