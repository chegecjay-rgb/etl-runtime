import type { Immutable } from "./immutable.js";
import type { RuleState } from "./states.js";

export type RuleId = string;

export type EvaluationScope =
  | "AUTHORITY"
  | "GRAPH"
  | "ORDER"
  | "DECLARATION"
  | "REPLAY";

export interface RuleResult {
  readonly ruleId: RuleId;
  readonly state: RuleState;
  readonly reason: string;
}

export interface EvaluationContext {
  readonly graphHash: string;
  readonly authorityHash: string;
  readonly traversalHash: string;
}

export interface VerificationRule {
  readonly ruleId: RuleId;
  readonly evaluationScope: EvaluationScope;
  readonly description: string;

  evaluate(
    context: Immutable<EvaluationContext>,
  ): Immutable<RuleResult>;
}
