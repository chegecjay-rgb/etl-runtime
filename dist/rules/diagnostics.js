"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDiagnostics = createDiagnostics;
const immutable_1 = require("./immutable");
function createDiagnostics(execution, traversal, certification) {
    return (0, immutable_1.deepFreeze)({
        totalExecutedRules: execution.totalExecuted,
        traversalRuleCount: traversal.totalRules,
        certificationHash: certification.certificationHash,
        executionHash: certification.executionHash,
    });
}
