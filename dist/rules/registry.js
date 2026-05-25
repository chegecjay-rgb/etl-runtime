"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRuleRegistry = createRuleRegistry;
exports.getRuleById = getRuleById;
const immutable_1 = require("./immutable");
const normalize_1 = require("./normalize");
function createRuleRegistry(rules) {
    const normalizedRules = (0, normalize_1.normalizeRules)(rules);
    return (0, immutable_1.deepFreeze)({
        rules: normalizedRules,
        size: normalizedRules.length,
    });
}
function getRuleById(registry, ruleId) {
    return registry.rules.find((rule) => rule.ruleId === ruleId.trim().toUpperCase());
}
