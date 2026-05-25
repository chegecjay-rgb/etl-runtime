"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeRules = executeRules;
const immutable_1 = require("./immutable");
function executeRules(registry, context, rules) {
    const orderedResults = [...registry.rules]
        .map((normalizedRule) => {
        const implementation = rules.find((rule) => rule.ruleId.trim().toUpperCase() ===
            normalizedRule.ruleId);
        if (!implementation) {
            throw new Error(`Missing rule implementation: ${normalizedRule.ruleId}`);
        }
        return implementation.evaluate(context);
    });
    return (0, immutable_1.deepFreeze)({
        results: orderedResults,
        totalExecuted: orderedResults.length,
    });
}
