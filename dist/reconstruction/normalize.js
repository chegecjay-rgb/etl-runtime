"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeProjectionNodes = normalizeProjectionNodes;
function compareNodes(left, right) {
    if (left.timestamp !== right.timestamp) {
        return left.timestamp.localeCompare(right.timestamp);
    }
    if (left.executionId !== right.executionId) {
        return left.executionId.localeCompare(right.executionId);
    }
    return left.evidenceHash.localeCompare(right.evidenceHash);
}
function normalizeProjectionNodes(nodes) {
    return Object.freeze([...nodes].sort(compareNodes));
}
