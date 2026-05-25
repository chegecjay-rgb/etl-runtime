"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateContinuity = validateContinuity;
const errors_1 = require("./errors");
function validateContinuity(nodes) {
    const identitySet = new Set();
    for (const node of nodes) {
        if (identitySet.has(node.executionId)) {
            throw new errors_1.ReconstructionError("DUPLICATE_NODE", `Duplicate node '${node.executionId}' detected`);
        }
        identitySet.add(node.executionId);
        if (node.continuityState === "resolved" &&
            node.parentExecutionId === null) {
            throw new errors_1.ReconstructionError("INVALID_RESOLVED_PARENT", `Resolved node '${node.executionId}' has null parent`);
        }
        if (node.continuityState === "root" &&
            node.parentExecutionId !== null) {
            throw new errors_1.ReconstructionError("INVALID_ROOT_PARENT", `Root node '${node.executionId}' cannot have parent`);
        }
        if (node.continuityState ===
            "unknown-parent" &&
            node.lineageDepth !== null) {
            throw new errors_1.ReconstructionError("INVALID_UNKNOWN_DEPTH", `Unknown parent node '${node.executionId}' cannot have lineage depth`);
        }
    }
}
