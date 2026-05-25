"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.certifyExecution = certifyExecution;
const immutable_1 = require("./immutable");
const hashes_1 = require("./hashes");
function certifyExecution(executionResult) {
    const serializedResult = (0, hashes_1.canonicalSerialize)(executionResult);
    const executionHash = (0, hashes_1.hashValue)(serializedResult);
    return (0, immutable_1.deepFreeze)({
        certificationHash: (0, hashes_1.hashValue)({
            executionHash,
            serializedResult,
        }),
        executionHash,
        serializedResult,
    });
}
