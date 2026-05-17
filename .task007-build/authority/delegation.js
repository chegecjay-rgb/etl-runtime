"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyDelegationContinuity = verifyDelegationContinuity;
const immutable_1 = require("./immutable");
function sortPaths(paths) {
    return Object.freeze([...paths].sort((left, right) => {
        const authorityOrder = left.authorityId.localeCompare(right.authorityId);
        if (authorityOrder !== 0) {
            return authorityOrder;
        }
        return left.visitedNodeIds.join(":").localeCompare(right.visitedNodeIds.join(":"));
    }));
}
function createLineage(path) {
    return (0, immutable_1.deepFreeze)({
        authorityId: path.authorityId,
        lineage: Object.freeze([...path.visitedNodeIds])
    });
}
function createState(path) {
    return (0, immutable_1.deepFreeze)({
        authorityId: path.authorityId,
        valid: path.visitedNodeIds.length > 0
    });
}
function createResolvedPath(path) {
    return (0, immutable_1.deepFreeze)({
        authorityId: path.authorityId,
        visitedNodeIds: Object.freeze([
            ...path.visitedNodeIds
        ])
    });
}
function verifyDelegationContinuity(traversal) {
    const sortedPaths = sortPaths(traversal.paths);
    return (0, immutable_1.deepFreeze)({
        lineages: Object.freeze(sortedPaths.map((path) => createLineage(path))),
        states: Object.freeze(sortedPaths.map((path) => createState(path))),
        paths: Object.freeze(sortedPaths.map((path) => createResolvedPath(path)))
    });
}
