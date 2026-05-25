import { type Immutable } from "./immutable";
import type { EvaluationScope, VerificationRule } from "./types";
export interface NormalizedRule {
    readonly ruleId: string;
    readonly evaluationScope: EvaluationScope;
    readonly description: string;
}
export declare function normalizeRule(rule: VerificationRule): Immutable<NormalizedRule>;
export declare function normalizeRules(rules: ReadonlyArray<VerificationRule>): ReadonlyArray<Immutable<NormalizedRule>>;
