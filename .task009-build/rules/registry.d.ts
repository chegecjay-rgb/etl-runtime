import { type Immutable } from "./immutable";
import { type NormalizedRule } from "./normalize";
import type { VerificationRule } from "./types";
export interface RuleRegistry {
    readonly rules: ReadonlyArray<Immutable<NormalizedRule>>;
    readonly size: number;
}
export declare function createRuleRegistry(rules: ReadonlyArray<VerificationRule>): Immutable<RuleRegistry>;
export declare function getRuleById(registry: RuleRegistry, ruleId: string): Immutable<NormalizedRule> | undefined;
