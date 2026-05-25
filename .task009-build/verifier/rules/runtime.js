"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runConstitutionalVerification = runConstitutionalVerification;
const immutable_1 = require("../../rules/immutable");
const definitions_1 = require("../../rules/definitions");
const verify_1 = require("./verify");
function runConstitutionalVerification(contextInput) {
    const result = (0, verify_1.verifyRules)(contextInput, definitions_1.CONSTITUTIONAL_RULES);
    return (0, immutable_1.deepFreeze)({
        result,
        totalRules: definitions_1.CONSTITUTIONAL_RULES.length,
    });
}
