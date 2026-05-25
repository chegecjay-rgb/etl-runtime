import { type Immutable } from "./immutable";
import type { RuleRegistry } from "./registry";
export interface TraversalResult {
    readonly orderedRuleIds: ReadonlyArray<string>;
    readonly totalRules: number;
}
export declare function traverseRegistry(registry: RuleRegistry): Immutable<TraversalResult>;
