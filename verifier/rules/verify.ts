import { deepFreeze, type Immutable } from "../../rules/immutable.js";
import {
  createRuleEvaluationContext,
  type RuleContextInput,
} from "../../rules/context.js";
import { createRuleRegistry  } from "../../rules/registry.js";
import { traverseRegistry  } from "../../rules/traversal.js";
import { executeRules  } from "../../rules/execute.js";
import { certifyExecution  } from "../../rules/certify.js";
import { createDiagnostics  } from "../../rules/diagnostics.js";
import type { VerificationRule } from "../../rules/types.js";

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
