import type { deepFreeze, type Immutable } from "./immutable.js";
import type { hashValue } from "./hashes.js";

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

export function createRuleEvaluationContext(
  input: RuleContextInput,
): Immutable<RuleEvaluationContext> {
  return deepFreeze({
    graphHash: hashValue(input.graph),
    authorityHash: hashValue(input.authority),
    traversalHash: hashValue(input.traversal),
    evidenceHash: hashValue(input.evidence),
  });
}
