"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrphans = validateOrphans;
function validateOrphans(graph) {
    const nodeIds = new Set(graph.nodes.map((node) => node.id));
    const entries = [];
    for (const node of graph.nodes) {
        const missingParents = node.parents.filter((parentId) => !nodeIds.has(parentId));
        if (missingParents.length > 0) {
            entries.push(Object.freeze({
                nodeId: node.id,
                missingParents: Object.freeze([...missingParents].sort())
            }));
        }
    }
    return Object.freeze({
        state: entries.length === 0
            ? "VALID"
            : "INVALID",
        entries: Object.freeze(entries)
    });
}
