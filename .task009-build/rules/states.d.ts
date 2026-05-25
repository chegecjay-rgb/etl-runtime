import type { Immutable } from "./immutable";
export declare const RULE_STATES: readonly ["VALID", "INVALID", "UNDECLARED", "INCONSISTENT", "UNKNOWN"];
export type RuleState = (typeof RULE_STATES)[number];
export interface RuleStateResult {
    readonly state: RuleState;
}
export declare function createRuleStateResult(state: RuleState): Immutable<RuleStateResult>;
export declare function isRuleState(value: unknown): value is RuleState;
