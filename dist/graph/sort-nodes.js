"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortNodes = sortNodes;
function sortNodes(nodes) {
    return Object.freeze([...nodes].sort((left, right) => left.id.localeCompare(right.id, "en")));
}
