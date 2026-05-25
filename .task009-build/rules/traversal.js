"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverseRegistry = traverseRegistry;
const immutable_1 = require("./immutable");
function traverseRegistry(registry) {
    const orderedRules = [...registry.rules].sort(compareRules);
    return (0, immutable_1.deepFreeze)({
        orderedRuleIds: orderedRules.map((rule) => rule.ruleId),
        totalRules: orderedRules.length,
    });
}
function compareRules(left, right) {
    if (left.ruleId < right.ruleId) {
        return -1;
    }
    if (left.ruleId > right.ruleId) {
        return 1;
    }
    if (left.evaluationScope < right.evaluationScope) {
        return -1;
    }
    if (left.evaluationScope > right.evaluationScope) {
        return 1;
    }
    return 0;
}
