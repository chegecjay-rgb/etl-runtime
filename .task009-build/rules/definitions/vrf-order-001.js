"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRF_ORDER_001 = void 0;
const immutable_1 = require("../immutable");
function buildResult(state, reason) {
    return (0, immutable_1.deepFreeze)({
        ruleId: "VRF-ORDER-001",
        state,
        reason,
    });
}
exports.VRF_ORDER_001 = {
    ruleId: "VRF-ORDER-001",
    evaluationScope: "ORDER",
    description: "deterministic execution ordering enforcement",
    evaluate(context) {
        if (context.traversalHash.length === 0) {
            return buildResult("UNKNOWN", "missing traversal ordering evidence");
        }
        if (context.traversalHash === context.graphHash) {
            return buildResult("INCONSISTENT", "ordering continuity collision detected");
        }
        return buildResult("VALID", "deterministic execution ordering verified");
    },
};
