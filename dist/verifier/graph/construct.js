"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructCanonicalGraph = constructCanonicalGraph;
function constructCanonicalGraph(nodes) {
    const edges = [];
    for (const node of nodes) {
        node.parents.forEach((parent, index) => {
            edges.push(Object.freeze({
                from: parent,
                to: node.id,
                ordinal: index
            }));
        });
    }
    return Object.freeze({
        nodes: Object.freeze([...nodes]),
        edges: Object.freeze(edges)
    });
}
