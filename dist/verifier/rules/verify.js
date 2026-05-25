"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRules = verifyRules;
const immutable_1 = require("../../rules/immutable");
const context_1 = require("../../rules/context");
const registry_1 = require("../../rules/registry");
const traversal_1 = require("../../rules/traversal");
const execute_1 = require("../../rules/execute");
const certify_1 = require("../../rules/certify");
const diagnostics_1 = require("../../rules/diagnostics");
function verifyRules(contextInput, rules) {
    const context = (0, context_1.createRuleEvaluationContext)(contextInput);
    const registry = (0, registry_1.createRuleRegistry)(rules);
    const traversal = (0, traversal_1.traverseRegistry)(registry);
    const execution = (0, execute_1.executeRules)(registry, context, rules);
    const certification = (0, certify_1.certifyExecution)(execution);
    const diagnostics = (0, diagnostics_1.createDiagnostics)(execution, traversal, certification);
    return (0, immutable_1.deepFreeze)({
        traversal,
        execution,
        certification,
        diagnostics,
    });
}
