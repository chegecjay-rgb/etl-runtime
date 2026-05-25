import { type Immutable } from "./immutable";
export interface RuleEvaluationContext {
    readonly graphHash: string;
    readonly authorityHash: string;
    readonly traversalHash: string;
    readonly evidenceHash: string;
}
export interface RuleContextInput {
    readonly graph: unknown;
    readonly authority: unknown;
    readonly traversal: unknown;
    readonly evidence: unknown;
}
export declare function createRuleEvaluationContext(input: RuleContextInput): Immutable<RuleEvaluationContext>;
