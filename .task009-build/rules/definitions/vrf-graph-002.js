"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRF_GRAPH_002 = void 0;
const immutable_1 = require("../immutable");
function buildResult(state, reason) {
    return (0, immutable_1.deepFreeze)({
        ruleId: "VRF-GRAPH-002",
        state,
        reason,
    });
}
exports.VRF_GRAPH_002 = {
    ruleId: "VRF-GRAPH-002",
    evaluationScope: "GRAPH",
    description: "orphan causality preservation",
    evaluate(context) {
        if (context.traversalHash.length === 0 ||
            context.evidenceHash.length === 0) {
            return buildResult("UNKNOWN", "insufficient causality evidence detected");
        }
        if (context.traversalHash === context.evidenceHash) {
            return buildResult("INCONSISTENT", "orphan causality preservation failure detected");
        }
        return buildResult("VALID", "orphan causality preservation verified");
    },
};
