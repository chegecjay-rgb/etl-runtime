import { ReconstructionError } from "./errors";

import {
  deepFreeze,
} from "./immutable";

import type {
  CanonicalEvidenceRecord,
  CanonicalExecutionNode,
  ContinuityState,
} from "./types";

function resolveDepth(
  node: CanonicalExecutionNode,
  nodeMap: ReadonlyMap<
    string,
    CanonicalExecutionNode
  >,
  visited: Set<string>,
): number | null {
  if (
    node.continuityState ===
    "unknown-parent"
  ) {
    return null;
  }

  if (node.parentExecutionId === null) {
    return 0;
  }

  if (
    visited.has(node.executionId)
  ) {
    throw new ReconstructionError(
      "CYCLIC_LINEAGE",
      `Cyclic lineage detected at '${node.executionId}'`,
    );
  }

  visited.add(node.executionId);

  const parent = nodeMap.get(
    node.parentExecutionId,
  );

  if (!parent) {
    return null;
  }

  const parentDepth =
    resolveDepth(
      parent,
      nodeMap,
      visited,
    );

  visited.delete(node.executionId);

  if (parentDepth === null) {
    return null;
  }

  return parentDepth + 1;
}

export function reconstructLineage(
  evidence:
    readonly CanonicalEvidenceRecord[],
): readonly CanonicalExecutionNode[] {
  const childMap = new Map<
    string,
    string[]
  >();

  for (const record of evidence) {
    if (
      record.parentExecutionId ===
      record.executionId
    ) {
      throw new ReconstructionError(
        "SELF_PARENT",
        `Execution '${record.executionId}' cannot reference itself`,
      );
    }

    if (
      record.parentExecutionId !==
      null
    ) {
      const existing =
        childMap.get(
          record.parentExecutionId,
        ) ?? [];

      existing.push(
        record.executionId,
      );

      existing.sort();

      childMap.set(
        record.parentExecutionId,
        existing,
      );
    }
  }

  const preliminary =
    evidence.map((record) => {
      let continuityState:
        ContinuityState;

      if (
        record.parentExecutionId ===
        null
      ) {
        continuityState = "root";
      } else {
        continuityState = "resolved";
      }

      const parentExists =
        record.parentExecutionId ===
          null ||
        evidence.some(
          (candidate) =>
            candidate.executionId ===
            record.parentExecutionId,
        );

      if (
        !parentExists &&
        record.parentExecutionId !==
          null
      ) {
        continuityState =
          "unknown-parent";
      }

      return {
        executionId:
          record.executionId,

        parentExecutionId:
          record.parentExecutionId,

        batchId:
          record.batchId,

        batchIndex:
          record.batchIndex,

        timestamp:
          record.timestamp,

        evidenceHash:
          record.evidenceHash,

        lineageDepth: null,

        continuityState,

        children:
          childMap.get(
            record.executionId,
          ) ?? [],
      };
    });

  const nodeMap = new Map<
    string,
    CanonicalExecutionNode
  >();

  for (const node of preliminary) {
    nodeMap.set(
      node.executionId,
      node as CanonicalExecutionNode,
    );
  }

  const resolved =
    preliminary.map((node) => {
      const frozenNode =
        deepFreeze({
          ...node,
          lineageDepth:
            resolveDepth(
              node as CanonicalExecutionNode,
              nodeMap,
              new Set(),
            ),
          children:
            deepFreeze([
              ...node.children,
            ]),
        });

      nodeMap.set(
        frozenNode.executionId,
        frozenNode,
      );

      return frozenNode;
    });

  return deepFreeze(resolved);
}
