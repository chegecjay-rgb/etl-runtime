"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRF_GRAPH_001 = void 0;
const immutable_1 = require("../immutable");
function buildResult(state, reason) {
    return (0, immutable_1.deepFreeze)({
        ruleId: "VRF-GRAPH-001",
        state,
        reason,
    });
}
exports.VRF_GRAPH_001 = {
    ruleId: "VRF-GRAPH-001",
    evaluationScope: "GRAPH",
    description: "cyclic causality invalidation",
    evaluate(context) {
        if (context.graphHash.length === 0 ||
            context.graphHash === context.traversalHash) {
            return buildResult("INVALID", "cyclic causality detected");
        }
        return buildResult("VALID", "causality graph verified");
    },
};
