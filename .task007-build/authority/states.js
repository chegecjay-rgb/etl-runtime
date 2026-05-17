"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTHORITY_STATE_ORDER = exports.AuthorityStates = void 0;
exports.isAuthorityState = isAuthorityState;
exports.AuthorityStates = {
    VALID: "VALID",
    INVALID: "INVALID",
    UNDECLARED: "UNDECLARED",
    UNKNOWN: "UNKNOWN"
};
exports.AUTHORITY_STATE_ORDER = Object.freeze([
    exports.AuthorityStates.INVALID,
    exports.AuthorityStates.UNDECLARED,
    exports.AuthorityStates.UNKNOWN,
    exports.AuthorityStates.VALID
]);
function isAuthorityState(value) {
    return (typeof value === "string" &&
        exports.AUTHORITY_STATE_ORDER.includes(value));
}
