"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTopology = validateTopology;
function validateTopology(graph) {
    const ids = new Set(graph.nodes.map((node) => node.id));
    const cycles = new Set();
    for (const node of graph.nodes) {
        for (const parent of node.parents) {
            if (parent === node.id || !ids.has(parent)) {
                cycles.add(node.id);
            }
        }
    }
    return Object.freeze({
        state: cycles.size === 0 ? "VALID" : "INVALID",
        cycles: Object.freeze([...cycles].sort())
    });
}
