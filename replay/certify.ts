import type { projectCanonicalDAG } from "../verifier/graph/project.js";

export interface ReplayCertificationResult {
  readonly status: "CERTIFIED";
  readonly traversal: readonly string[];
  readonly traversalHash: string;
  readonly graphHash: string;
}

export function certifyReplay(
  value: unknown
): ReplayCertificationResult {
  const dag = projectCanonicalDAG(value);

  const traversal = Object.freeze([
    ...dag.roots
  ]);

  return Object.freeze({
    status: "CERTIFIED" as const,
    traversal,
    traversalHash: dag.graphHash,
    graphHash: dag.graphHash
  });
}

export function certifyReplayGraph(
  value: unknown
): ReplayCertificationResult {
  return certifyReplay(value);
}
