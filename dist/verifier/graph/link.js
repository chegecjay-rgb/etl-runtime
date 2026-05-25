"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkGraph = linkGraph;
function linkGraph(graph) {
    const edges = [];
    graph.nodes.forEach((node) => {
        node.parents.forEach((parent, index) => {
            edges.push({
                from: parent,
                to: node.id,
                ordinal: index
            });
        });
    });
    return Object.freeze({
        nodes: graph.nodes,
        edges: Object.freeze(edges)
    });
}
