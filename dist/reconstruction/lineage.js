"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reconstructLineage = reconstructLineage;
const errors_1 = require("./errors");
const immutable_1 = require("./immutable");
function resolveDepth(node, nodeMap, visited) {
    if (node.continuityState ===
        "unknown-parent") {
        return null;
    }
    if (node.parentExecutionId === null) {
        return 0;
    }
    if (visited.has(node.executionId)) {
        throw new errors_1.ReconstructionError("CYCLIC_LINEAGE", `Cyclic lineage detected at '${node.executionId}'`);
    }
    visited.add(node.executionId);
    const parent = nodeMap.get(node.parentExecutionId);
    if (!parent) {
        return null;
    }
    const parentDepth = resolveDepth(parent, nodeMap, visited);
    visited.delete(node.executionId);
    if (parentDepth === null) {
        return null;
    }
    return parentDepth + 1;
}
function reconstructLineage(evidence) {
    const childMap = new Map();
    for (const record of evidence) {
        if (record.parentExecutionId ===
            record.executionId) {
            throw new errors_1.ReconstructionError("SELF_PARENT", `Execution '${record.executionId}' cannot reference itself`);
        }
        if (record.parentExecutionId !==
            null) {
            const existing = childMap.get(record.parentExecutionId) ?? [];
            existing.push(record.executionId);
            existing.sort();
            childMap.set(record.parentExecutionId, existing);
        }
    }
    const preliminary = evidence.map((record) => {
        let continuityState;
        if (record.parentExecutionId ===
            null) {
            continuityState = "root";
        }
        else {
            continuityState = "resolved";
        }
        const parentExists = record.parentExecutionId ===
            null ||
            evidence.some((candidate) => candidate.executionId ===
                record.parentExecutionId);
        if (!parentExists &&
            record.parentExecutionId !==
                null) {
            continuityState =
                "unknown-parent";
        }
        return {
            executionId: record.executionId,
            parentExecutionId: record.parentExecutionId,
            batchId: record.batchId,
            batchIndex: record.batchIndex,
            timestamp: record.timestamp,
            evidenceHash: record.evidenceHash,
            lineageDepth: null,
            continuityState,
            children: childMap.get(record.executionId) ?? [],
        };
    });
    const nodeMap = new Map();
    for (const node of preliminary) {
        nodeMap.set(node.executionId, node);
    }
    const resolved = preliminary.map((node) => {
        const frozenNode = (0, immutable_1.deepFreeze)({
            ...node,
            lineageDepth: resolveDepth(node, nodeMap, new Set()),
            children: (0, immutable_1.deepFreeze)([
                ...node.children,
            ]),
        });
        nodeMap.set(frozenNode.executionId, frozenNode);
        return frozenNode;
    });
    return (0, immutable_1.deepFreeze)(resolved);
}
