"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverseAuthorityProjection = traverseAuthorityProjection;
const immutable_1 = require("./immutable");
function sortNodes(nodes) {
    return Object.freeze([...nodes].sort((left, right) => left.nodeId.localeCompare(right.nodeId)));
}
function sortEdges(edges) {
    return Object.freeze([...edges].sort((left, right) => {
        const fromOrder = left.fromNodeId.localeCompare(right.fromNodeId);
        if (fromOrder !== 0) {
            return fromOrder;
        }
        return left.toNodeId.localeCompare(right.toNodeId);
    }));
}
function buildAdjacencyMap(edges) {
    const adjacency = new Map();
    for (const edge of sortEdges(edges)) {
        const next = adjacency.get(edge.fromNodeId) ?? [];
        next.push(edge.toNodeId);
        adjacency.set(edge.fromNodeId, [...new Set(next)].sort((left, right) => left.localeCompare(right)));
    }
    return (0, immutable_1.deepFreeze)(adjacency);
}
function visitNode(nodeId, graph, adjacency, state, depth, traversal, paths) {
    if (state.visited.includes(nodeId)) {
        return;
    }
    const node = graph.nodes.find((candidate) => candidate.nodeId === nodeId);
    if (!node) {
        throw new Error(`missing projection node during traversal: ${nodeId}`);
    }
    const nextVisited = Object.freeze([
        ...state.visited,
        nodeId
    ]);
    traversal.push((0, immutable_1.deepFreeze)({
        nodeId: node.nodeId,
        authorityId: node.authorityId,
        depth
    }));
    paths.push((0, immutable_1.deepFreeze)({
        authorityId: node.authorityId,
        visitedNodeIds: nextVisited
    }));
    const nextNodes = adjacency.get(nodeId) ?? [];
    for (const nextNodeId of nextNodes) {
        visitNode(nextNodeId, graph, adjacency, (0, immutable_1.deepFreeze)({
            visited: nextVisited
        }), depth + 1, traversal, paths);
    }
}
function traverseAuthorityProjection(graph) {
    const traversal = [];
    const paths = [];
    const adjacency = buildAdjacencyMap(graph.edges);
    for (const node of sortNodes(graph.nodes)) {
        visitNode(node.nodeId, graph, adjacency, (0, immutable_1.deepFreeze)({
            visited: Object.freeze([])
        }), 0, traversal, paths);
    }
    return (0, immutable_1.deepFreeze)({
        traversal: Object.freeze(traversal.sort((left, right) => {
            const depthOrder = left.depth - right.depth;
            if (depthOrder !== 0) {
                return depthOrder;
            }
            return left.nodeId.localeCompare(right.nodeId);
        })),
        paths: Object.freeze(paths.sort((left, right) => left.authorityId.localeCompare(right.authorityId)))
    });
}
