"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRuleEvaluationContext = createRuleEvaluationContext;
const immutable_1 = require("./immutable");
const hashes_1 = require("./hashes");
function createRuleEvaluationContext(input) {
    return (0, immutable_1.deepFreeze)({
        graphHash: (0, hashes_1.hashValue)(input.graph),
        authorityHash: (0, hashes_1.hashValue)(input.authority),
        traversalHash: (0, hashes_1.hashValue)(input.traversal),
        evidenceHash: (0, hashes_1.hashValue)(input.evidence),
    });
}
