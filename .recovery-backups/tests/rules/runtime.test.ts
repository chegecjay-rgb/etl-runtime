import type { describe, expect, test } from "@jest/globals";

import {
  runConstitutionalVerification,
} from "../../verifier/rules/runtime.js";

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
} as const;

describe("constitutional runtime", () => {
  test("executes deterministically", () => {
    const first = runConstitutionalVerification(TEST_CONTEXT);

    const second = runConstitutionalVerification(TEST_CONTEXT);

    expect(first).toStrictEqual(second);
  });

  test("loads canonical constitutional rules", () => {
    const result = runConstitutionalVerification(TEST_CONTEXT);

    expect(result.totalRules).toBeGreaterThan(0);

    expect(
      result.result.execution.totalExecuted,
    ).toBe(result.totalRules);
  });

  test("produces stable certification hashes", () => {
    const first = runConstitutionalVerification(TEST_CONTEXT);

    const second = runConstitutionalVerification(TEST_CONTEXT);

    expect(
      first.result.certification.executionHash,
    ).toBe(
      second.result.certification.executionHash,
    );

    expect(
      first.result.certification.certificationHash,
    ).toBe(
      second.result.certification.certificationHash,
    );
  });

  test("produces stable diagnostics", () => {
    const result = runConstitutionalVerification(TEST_CONTEXT);

    expect(
      result.result.diagnostics.totalExecutedRules,
    ).toBe(result.totalRules);

    expect(
      result.result.diagnostics.traversalRuleCount,
    ).toBe(result.totalRules);
  });

  test("returns immutable runtime artifacts", () => {
    const result = runConstitutionalVerification(TEST_CONTEXT);

    expect(Object.isFrozen(result)).toBe(true);

    expect(Object.isFrozen(result.result)).toBe(true);

    expect(
      Object.isFrozen(result.result.execution.results),
    ).toBe(true);
  });
});
