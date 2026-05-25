"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_STATES = void 0;
exports.createRuleStateResult = createRuleStateResult;
exports.isRuleState = isRuleState;
const immutable_1 = require("./immutable");
exports.RULE_STATES = (0, immutable_1.deepFreeze)([
    "VALID",
    "INVALID",
    "UNDECLARED",
    "INCONSISTENT",
    "UNKNOWN",
]);
function createRuleStateResult(state) {
    return (0, immutable_1.deepFreeze)({
        state,
    });
}
function isRuleState(value) {
    return (typeof value === "string" &&
        exports.RULE_STATES.includes(value));
}
