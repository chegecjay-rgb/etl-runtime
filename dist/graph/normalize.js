"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeGraph = normalizeGraph;
exports.stableStringify = stableStringify;
const sort_nodes_1 = require("./sort-nodes");
function sortEdges(edges) {
    return Object.freeze([...edges].sort((left, right) => {
        const fromOrder = left.from.localeCompare(right.from, "en");
        if (fromOrder !== 0) {
            return fromOrder;
        }
        const toOrder = left.to.localeCompare(right.to, "en");
        if (toOrder !== 0) {
            return toOrder;
        }
        return left.ordinal - right.ordinal;
    }));
}
function normalizeGraph(graph) {
    const normalizedNodes = (0, sort_nodes_1.sortNodes)(graph.nodes).map((node) => Object.freeze({
        id: node.id,
        parents: Object.freeze([...node.parents].sort((a, b) => a.localeCompare(b, "en"))),
        authority: node.authority
    }));
    return Object.freeze({
        nodes: Object.freeze(normalizedNodes),
        edges: sortEdges(graph.edges)
    });
}
function stableStringify(graph) {
    return JSON.stringify(normalizeGraph(graph), null, 2);
}
