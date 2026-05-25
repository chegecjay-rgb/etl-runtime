import { type Immutable } from "../../rules/immutable";
import { type RuleContextInput } from "../../rules/context";
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
export declare function verifyRules(contextInput: RuleContextInput, rules: ReadonlyArray<VerificationRule>): Immutable<VerificationRuntimeResult>;
