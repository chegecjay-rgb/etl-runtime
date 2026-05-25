"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeterministicRejection = exports.RejectionCode = void 0;
exports.reject = reject;
var RejectionCode;
(function (RejectionCode) {
    RejectionCode["INVALID_STRUCTURE"] = "INVALID_STRUCTURE";
    RejectionCode["UNSUPPORTED_KIND"] = "UNSUPPORTED_KIND";
    RejectionCode["INVALID_TIMESTAMP"] = "INVALID_TIMESTAMP";
    RejectionCode["NON_CANONICAL_FIELD"] = "NON_CANONICAL_FIELD";
    RejectionCode["MUTATION_DETECTED"] = "MUTATION_DETECTED";
    RejectionCode["REPLAY_UNSAFE"] = "REPLAY_UNSAFE";
    RejectionCode["NORMALIZATION_FAILURE"] = "NORMALIZATION_FAILURE";
})(RejectionCode || (exports.RejectionCode = RejectionCode = {}));
class DeterministicRejection extends Error {
    code;
    constructor(code, message) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, DeterministicRejection.prototype);
    }
}
exports.DeterministicRejection = DeterministicRejection;
function reject(code, message) {
    throw new DeterministicRejection(code, message);
}
