import { deepFreeze, type Immutable } from "../../rules/immutable";
import type { RuleContextInput } from "../../rules/context";
import {
  CONSTITUTIONAL_RULES,
} from "../../rules/definitions";
import {
  verifyRules,
  type VerificationRuntimeResult,
} from "./verify";

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
