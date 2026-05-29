import type { Immutable } from "./immutable.js";
import type { deepFreeze } from "./immutable.js";

export const RULE_STATES = deepFreeze([
  "VALID",
  "INVALID",
  "UNDECLARED",
  "INCONSISTENT",
  "UNKNOWN",
] as const);

export type RuleState = (typeof RULE_STATES)[number];

export interface RuleStateResult {
  readonly state: RuleState;
}

export function createRuleStateResult(
  state: RuleState,
): Immutable<RuleStateResult> {
  return deepFreeze({
    state,
  });
}

export function isRuleState(value: unknown): value is RuleState {
  return (
    typeof value === "string" &&
    RULE_STATES.includes(value as RuleState)
  );
}
