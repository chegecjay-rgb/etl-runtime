import { type Immutable } from "./immutable";
import type { ExecutionResult } from "./execute";
export interface RuleCertification {
    readonly certificationHash: string;
    readonly executionHash: string;
    readonly serializedResult: string;
}
export declare function certifyExecution(executionResult: Immutable<ExecutionResult>): Immutable<RuleCertification>;
