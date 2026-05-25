"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const runtime_1 = require("../../verifier/rules/runtime");
const TEST_CONTEXT = {
    graph: {
        nodes: ["A", "B"],
        edges: [["A", "B"]],
    },
    authority: {
        authorityChain: ["ROOT", "SYSTEM"],
    },
    traversal: {
        ordered: ["VRF-AUTH-001", "VRF-GRAPH-001"],
    },
    evidence: {
        execution: ["STEP-001", "STEP-002"],
    },
};
(0, vitest_1.describe)("constitutional runtime", () => {
    (0, vitest_1.test)("executes deterministically", () => {
        const first = (0, runtime_1.runConstitutionalVerification)(TEST_CONTEXT);
        const second = (0, runtime_1.runConstitutionalVerification)(TEST_CONTEXT);
        (0, vitest_1.expect)(first).toStrictEqual(second);
    });
    (0, vitest_1.test)("loads canonical constitutional rules", () => {
        const result = (0, runtime_1.runConstitutionalVerification)(TEST_CONTEXT);
        (0, vitest_1.expect)(result.totalRules).toBeGreaterThan(0);
        (0, vitest_1.expect)(result.result.execution.totalExecuted).toBe(result.totalRules);
    });
    (0, vitest_1.test)("produces stable certification hashes", () => {
        const first = (0, runtime_1.runConstitutionalVerification)(TEST_CONTEXT);
        const second = (0, runtime_1.runConstitutionalVerification)(TEST_CONTEXT);
        (0, vitest_1.expect)(first.result.certification.executionHash).toBe(second.result.certification.executionHash);
        (0, vitest_1.expect)(first.result.certification.certificationHash).toBe(second.result.certification.certificationHash);
    });
    (0, vitest_1.test)("produces stable diagnostics", () => {
        const result = (0, runtime_1.runConstitutionalVerification)(TEST_CONTEXT);
        (0, vitest_1.expect)(result.result.diagnostics.totalExecutedRules).toBe(result.totalRules);
        (0, vitest_1.expect)(result.result.diagnostics.traversalRuleCount).toBe(result.totalRules);
    });
    (0, vitest_1.test)("returns immutable runtime artifacts", () => {
        const result = (0, runtime_1.runConstitutionalVerification)(TEST_CONTEXT);
        (0, vitest_1.expect)(Object.isFrozen(result)).toBe(true);
        (0, vitest_1.expect)(Object.isFrozen(result.result)).toBe(true);
        (0, vitest_1.expect)(Object.isFrozen(result.result.execution.results)).toBe(true);
    });
});
