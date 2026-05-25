"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortTraversalNodes = sortTraversalNodes;
exports.canonicalTraversal = canonicalTraversal;
const tieBreaker_1 = require("./tieBreaker");
function sortTraversalNodes(nodes) {
    const cloned = [...nodes];
    cloned.sort((left, right) => (0, tieBreaker_1.lexicalTieBreak)(left.id, right.id));
    return cloned;
}
function canonicalTraversal(nodes) {
    const ordered = sortTraversalNodes(nodes);
    const visited = [];
    for (const node of ordered) {
        visited.push(node.id);
        const children = node.children ?? [];
        const traversed = canonicalTraversal(children);
        for (const child of traversed) {
            visited.push(child);
        }
    }
    return visited;
}
