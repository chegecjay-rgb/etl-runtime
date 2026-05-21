import { deepFreeze, type Immutable } from "./immutable";
import type { NormalizedRule } from "./normalize";
import type { RuleRegistry } from "./registry";

export interface TraversalResult {
  readonly orderedRuleIds: ReadonlyArray<string>;
  readonly totalRules: number;
}

export function traverseRegistry(
  registry: RuleRegistry,
): Immutable<TraversalResult> {
  const orderedRules = [...registry.rules].sort(compareRules);

  return deepFreeze({
    orderedRuleIds: orderedRules.map((rule) => rule.ruleId),
    totalRules: orderedRules.length,
  });
}

function compareRules(
  left: Immutable<NormalizedRule>,
  right: Immutable<NormalizedRule>,
): number {
  if (left.ruleId < right.ruleId) {
    return -1;
  }

  if (left.ruleId > right.ruleId) {
    return 1;
  }

  if (left.evaluationScope < right.evaluationScope) {
    return -1;
  }

  if (left.evaluationScope > right.evaluationScope) {
    return 1;
  }

  return 0;
}
