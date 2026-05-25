"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRF_AUTH_001 = void 0;
const immutable_1 = require("../immutable");
function buildResult(state, reason) {
    return (0, immutable_1.deepFreeze)({
        ruleId: "VRF-AUTH-001",
        state,
        reason,
    });
}
exports.VRF_AUTH_001 = {
    ruleId: "VRF-AUTH-001",
    evaluationScope: "AUTHORITY",
    description: "undeclared authority continuity enforcement",
    evaluate(context) {
        if (context.authorityHash.length === 0 ||
            context.authorityHash === context.graphHash) {
            return buildResult("INCONSISTENT", "authority continuity divergence detected");
        }
        return buildResult("VALID", "authority continuity verified");
    },
};
