import { type Immutable } from "./immutable";
import type { RuleEvaluationContext } from "./context";
import type { RuleResult, VerificationRule } from "./types";
import type { RuleRegistry } from "./registry";
export interface ExecutionResult {
    readonly results: ReadonlyArray<Immutable<RuleResult>>;
    readonly totalExecuted: number;
}
export declare function executeRules(registry: RuleRegistry, context: Immutable<RuleEvaluationContext>, rules: ReadonlyArray<VerificationRule>): Immutable<ExecutionResult>;
