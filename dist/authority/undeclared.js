"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectUndeclaredAuthority = detectUndeclaredAuthority;
const immutable_1 = require("./immutable");
const states_1 = require("./states");
function sortContinuity(continuity) {
    return Object.freeze([...continuity].sort((left, right) => {
        const authorityOrder = left.authorityId.localeCompare(right.authorityId);
        if (authorityOrder !== 0) {
            return authorityOrder;
        }
        return left.lineage.join(":").localeCompare(right.lineage.join(":"));
    }));
}
function isUndeclared(continuity) {
    return (continuity.state === states_1.AuthorityStates.UNDECLARED ||
        continuity.lineage.length === 0);
}
function createUndeclaredAuthority(continuity) {
    return (0, immutable_1.deepFreeze)({
        authorityId: continuity.authorityId,
        lineage: Object.freeze([
            ...continuity.lineage
        ]),
        state: states_1.AuthorityStates.UNDECLARED
    });
}
function createUndeclaredPath(continuity) {
    return (0, immutable_1.deepFreeze)({
        authorityId: continuity.authorityId,
        visitedNodeIds: Object.freeze([
            ...continuity.lineage
        ])
    });
}
function createDiscontinuity(continuity) {
    return (0, immutable_1.deepFreeze)({
        authorityId: continuity.authorityId,
        reason: states_1.AuthorityStates.UNDECLARED,
        state: states_1.AuthorityStates.UNDECLARED
    });
}
function detectUndeclaredAuthority(continuityResult) {
    const undeclared = [];
    const paths = [];
    const discontinuities = [];
    for (const continuity of sortContinuity(continuityResult.continuity)) {
        if (!isUndeclared(continuity)) {
            continue;
        }
        undeclared.push(createUndeclaredAuthority(continuity));
        paths.push(createUndeclaredPath(continuity));
        discontinuities.push(createDiscontinuity(continuity));
    }
    return (0, immutable_1.deepFreeze)({
        undeclared: Object.freeze(undeclared),
        paths: Object.freeze(paths),
        discontinuities: Object.freeze(discontinuities)
    });
}
