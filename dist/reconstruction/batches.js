"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reconstructBatches = reconstructBatches;
function compareSiblingNodes(left, right) {
    const leftIndex = left.batchIndex ?? Number.MAX_SAFE_INTEGER;
    const rightIndex = right.batchIndex ?? Number.MAX_SAFE_INTEGER;
    if (leftIndex !== rightIndex) {
        return leftIndex - rightIndex;
    }
    if (left.timestamp !== right.timestamp) {
        return left.timestamp.localeCompare(right.timestamp);
    }
    return left.executionId.localeCompare(right.executionId);
}
function reconstructBatches(nodes) {
    const batchMap = new Map();
    for (const node of nodes) {
        if (node.batchId === null) {
            continue;
        }
        const existing = batchMap.get(node.batchId) ?? [];
        existing.push(node);
        batchMap.set(node.batchId, existing);
    }
    return [...batchMap.entries()]
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([batchId, batchNodes]) => {
        const ordered = [...batchNodes]
            .sort(compareSiblingNodes)
            .map((node) => node.executionId);
        return Object.freeze({
            batchId,
            executionIds: Object.freeze(ordered),
        });
    });
}
