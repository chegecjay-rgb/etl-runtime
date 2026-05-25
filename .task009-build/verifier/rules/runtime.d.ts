import { type Immutable } from "../../rules/immutable";
import type { RuleContextInput } from "../../rules/context";
import { type VerificationRuntimeResult } from "./verify";
export interface ConstitutionalRuntimeResult {
    readonly result: Immutable<VerificationRuntimeResult>;
    readonly totalRules: number;
}
export declare function runConstitutionalVerification(contextInput: RuleContextInput): Immutable<ConstitutionalRuntimeResult>;
