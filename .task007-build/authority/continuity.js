"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthorityContinuity = verifyAuthorityContinuity;
const immutable_1 = require("./immutable");
const states_1 = require("./states");
function sortLineages(lineages) {
    return Object.freeze([...lineages].sort((left, right) => {
        const authorityOrder = left.authorityId.localeCompare(right.authorityId);
        if (authorityOrder !== 0) {
            return authorityOrder;
        }
        return left.lineage.join(":").localeCompare(right.lineage.join(":"));
    }));
}
function resolveState(lineage) {
    if (lineage.lineage.length === 0) {
        return states_1.AuthorityStates.UNDECLARED;
    }
    const uniqueNodes = new Set(lineage.lineage);
    if (uniqueNodes.size !== lineage.lineage.length) {
        return states_1.AuthorityStates.UNKNOWN;
    }
    return states_1.AuthorityStates.VALID;
}
function createViolation(authorityId, state) {
    if (state === states_1.AuthorityStates.VALID) {
        return null;
    }
    return (0, immutable_1.deepFreeze)({
        authorityId,
        reason: state,
        state
    });
}
function verifyAuthorityContinuity(delegation) {
    const continuity = [];
    const states = [];
    const violations = [];
    for (const lineage of sortLineages(delegation.lineages)) {
        const state = resolveState(lineage);
        continuity.push((0, immutable_1.deepFreeze)({
            authorityId: lineage.authorityId,
            lineage: Object.freeze([
                ...lineage.lineage
            ]),
            state
        }));
        states.push((0, immutable_1.deepFreeze)({
            authorityId: lineage.authorityId,
            state
        }));
        const violation = createViolation(lineage.authorityId, state);
        if (violation) {
            violations.push(violation);
        }
    }
    return (0, immutable_1.deepFreeze)({
        states: Object.freeze(states),
        continuity: Object.freeze(continuity),
        violations: Object.freeze(violations)
    });
}
