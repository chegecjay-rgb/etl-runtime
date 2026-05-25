"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthorityProjectionGraph = createAuthorityProjectionGraph;
exports.projectAuthorityPaths = projectAuthorityPaths;
const immutable_1 = require("./immutable");
function sortNodeIds(nodeIds) {
    return Object.freeze([...new Set(nodeIds)]
        .map((nodeId) => nodeId.trim())
        .filter((nodeId) => nodeId.length > 0)
        .sort((left, right) => left.localeCompare(right)));
}
function sortEdges(edges) {
    return Object.freeze([...edges]
        .map((edge) => (0, immutable_1.deepFreeze)({
        fromNodeId: edge.fromNodeId.trim(),
        toNodeId: edge.toNodeId.trim()
    }))
        .sort((left, right) => {
        const fromOrder = left.fromNodeId.localeCompare(right.fromNodeId);
        if (fromOrder !== 0) {
            return fromOrder;
        }
        return left.toNodeId.localeCompare(right.toNodeId);
    }));
}
function projectNode(declaration) {
    return (0, immutable_1.deepFreeze)({
        nodeId: declaration.nodeId,
        authorityId: declaration.authority.authorityId
    });
}
function createAuthorityProjectionGraph(declarationIndex, edges) {
    const sortedNodeIds = sortNodeIds([...declarationIndex.keys()]);
    const projectedNodes = Object.freeze(sortedNodeIds.map((nodeId) => {
        const declaration = declarationIndex.get(nodeId);
        if (!declaration) {
            throw new Error(`missing declaration for projection node: ${nodeId}`);
        }
        return projectNode(declaration);
    }));
    return (0, immutable_1.deepFreeze)({
        nodes: projectedNodes,
        edges: sortEdges(edges)
    });
}
function projectAuthorityPaths(graph) {
    return Object.freeze(graph.nodes
        .map((node) => (0, immutable_1.deepFreeze)({
        authorityId: node.authorityId,
        nodePath: Object.freeze([node.nodeId])
    }))
        .sort((left, right) => left.authorityId.localeCompare(right.authorityId)));
}
