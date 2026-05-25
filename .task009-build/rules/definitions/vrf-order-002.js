"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRF_ORDER_002 = void 0;
const immutable_1 = require("../immutable");
function buildResult(state, reason) {
    return (0, immutable_1.deepFreeze)({
        ruleId: "VRF-ORDER-002",
        state,
        reason,
    });
}
exports.VRF_ORDER_002 = {
    ruleId: "VRF-ORDER-002",
    evaluationScope: "REPLAY",
    description: "deterministic replay continuity enforcement",
    evaluate(context) {
        if (context.evidenceHash.length === 0) {
            return buildResult("UNKNOWN", "missing replay continuity evidence");
        }
        if (context.evidenceHash === context.traversalHash) {
            return buildResult("INCONSISTENT", "replay continuity collision detected");
        }
        return buildResult("VALID", "deterministic replay continuity verified");
    },
};
