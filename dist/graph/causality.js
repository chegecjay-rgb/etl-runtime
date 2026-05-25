"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCausality = validateCausality;
function validateCausality(graph) {
    const adjacency = new Map();
    for (const node of graph.nodes) {
        adjacency.set(node.id, [...node.parents]);
    }
    const visited = new Set();
    const active = new Set();
    const cycles = [];
    function dfs(nodeId, path) {
        if (active.has(nodeId)) {
            const index = path.indexOf(nodeId);
            cycles.push([
                ...path.slice(index),
                nodeId
            ]);
            return;
        }
        if (visited.has(nodeId)) {
            return;
        }
        visited.add(nodeId);
        active.add(nodeId);
        const parents = adjacency.get(nodeId) ?? [];
        for (const parentId of parents) {
            dfs(parentId, [...path, parentId]);
        }
        active.delete(nodeId);
    }
    for (const node of graph.nodes) {
        dfs(node.id, [node.id]);
    }
    return Object.freeze({
        state: cycles.length === 0
            ? "VALID"
            : "INVALID",
        cycles: Object.freeze(cycles.map((cycle) => Object.freeze(cycle)))
    });
}
