"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRF_DECL_001 = void 0;
const immutable_1 = require("../immutable");
function buildResult(state, reason) {
    return (0, immutable_1.deepFreeze)({
        ruleId: "VRF-DECL-001",
        state,
        reason,
    });
}
exports.VRF_DECL_001 = {
    ruleId: "VRF-DECL-001",
    evaluationScope: "DECLARATION",
    description: "undeclared execution surface invalidation",
    evaluate(context) {
        if (context.authorityHash.length === 0 ||
            context.evidenceHash.length === 0) {
            return buildResult("UNKNOWN", "missing constitutional declaration evidence");
        }
        if (context.authorityHash === context.evidenceHash) {
            return buildResult("INVALID", "undeclared execution surface detected");
        }
        return buildResult("VALID", "constitutional declaration continuity verified");
    },
};
