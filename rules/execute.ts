import { deepFreeze, type Immutable } from "./immutable";
import type { RuleEvaluationContext } from "./context";
import type { RuleResult, VerificationRule } from "./types";
import type { RuleRegistry } from "./registry";

export interface ExecutionResult {
  readonly results: ReadonlyArray<Immutable<RuleResult>>;
  readonly totalExecuted: number;
}

export function executeRules(
  registry: RuleRegistry,
  context: Immutable<RuleEvaluationContext>,
  rules: ReadonlyArray<VerificationRule>,
): Immutable<ExecutionResult> {
  const orderedResults = [...registry.rules]
    .map((normalizedRule) => {
      const implementation = rules.find(
        (rule) =>
          rule.ruleId.trim().toUpperCase() ===
          normalizedRule.ruleId,
      );

      if (!implementation) {
        throw new Error(
          `Missing rule implementation: ${normalizedRule.ruleId}`,
        );
      }

      return implementation.evaluate(context);
    });

  return deepFreeze({
    results: orderedResults,
    totalExecuted: orderedResults.length,
  });
}
