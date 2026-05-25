"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeRule = normalizeRule;
exports.normalizeRules = normalizeRules;
const immutable_1 = require("./immutable");
function normalizeString(value) {
    return value.trim().toUpperCase();
}
function normalizeRule(rule) {
    return (0, immutable_1.deepFreeze)({
        ruleId: normalizeString(rule.ruleId),
        evaluationScope: rule.evaluationScope,
        description: rule.description.trim(),
    });
}
function normalizeRules(rules) {
    return (0, immutable_1.deepFreeze)([...rules]
        .map(normalizeRule)
        .sort((left, right) => {
        if (left.ruleId < right.ruleId) {
            return -1;
        }
        if (left.ruleId > right.ruleId) {
            return 1;
        }
        return 0;
    }));
}
