import type { deepFreeze, type Immutable } from "./immutable.js";
import type { normalizeRules, type NormalizedRule } from "./normalize.js";
import type { VerificationRule } from "./types.js";

export interface RuleRegistry {
  readonly rules: ReadonlyArray<Immutable<NormalizedRule>>;
  readonly size: number;
}

export function createRuleRegistry(
  rules: ReadonlyArray<VerificationRule>,
): Immutable<RuleRegistry> {
  const normalizedRules = normalizeRules(rules);

  return deepFreeze({
    rules: normalizedRules,
    size: normalizedRules.length,
  });
}

export function getRuleById(
  registry: RuleRegistry,
  ruleId: string,
): Immutable<NormalizedRule> | undefined {
  return registry.rules.find(
    (rule) => rule.ruleId === ruleId.trim().toUpperCase(),
  );
}
