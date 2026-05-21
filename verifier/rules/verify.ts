import { deepFreeze, type Immutable } from "../../rules/immutable";
import {
  createRuleEvaluationContext,
  type RuleContextInput,
} from "../../rules/context";
import { createRuleRegistry } from "../../rules/registry";
import { traverseRegistry } from "../../rules/traversal";
import { executeRules } from "../../rules/execute";
import { certifyExecution } from "../../rules/certify";
import { createDiagnostics } from "../../rules/diagnostics";
import type { VerificationRule } from "../../rules/types";

export interface VerificationRuntimeResult {
  readonly traversal: ReturnType<typeof traverseRegistry>;
  readonly execution: ReturnType<typeof executeRules>;
  readonly certification: ReturnType<typeof certifyExecution>;
  readonly diagnostics: ReturnType<typeof createDiagnostics>;
}

export function verifyRules(
  contextInput: RuleContextInput,
  rules: ReadonlyArray<VerificationRule>,
): Immutable<VerificationRuntimeResult> {
  const context = createRuleEvaluationContext(contextInput);

  const registry = createRuleRegistry(rules);

  const traversal = traverseRegistry(registry);

  const execution = executeRules(registry, context, rules);

  const certification = certifyExecution(execution);

  const diagnostics = createDiagnostics(
    execution,
    traversal,
    certification,
  );

  return deepFreeze({
    traversal,
    execution,
    certification,
    diagnostics,
  });
}
