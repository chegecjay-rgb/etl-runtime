import { deepFreeze, type Immutable } from "./immutable";
import type {
  EvaluationScope,
  VerificationRule,
} from "./types";

export interface NormalizedRule {
  readonly ruleId: string;
  readonly evaluationScope: EvaluationScope;
  readonly description: string;
}

function normalizeString(value: string): string {
  return value.trim().toUpperCase();
}

export function normalizeRule(
  rule: VerificationRule,
): Immutable<NormalizedRule> {
  return deepFreeze({
    ruleId: normalizeString(rule.ruleId),
    evaluationScope: rule.evaluationScope,
    description: rule.description.trim(),
  });
}

export function normalizeRules(
  rules: ReadonlyArray<VerificationRule>,
): ReadonlyArray<Immutable<NormalizedRule>> {
  return deepFreeze(
    [...rules]
      .map(normalizeRule)
      .sort((left, right) => {
        if (left.ruleId < right.ruleId) {
          return -1;
        }

        if (left.ruleId > right.ruleId) {
          return 1;
        }

        return 0;
      }),
  );
}
