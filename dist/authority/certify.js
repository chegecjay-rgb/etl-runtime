"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.certifyAuthorityVerification = certifyAuthorityVerification;
const immutable_1 = require("./immutable");
function createSnapshot(continuity, traversal, undeclared) {
    return (0, immutable_1.deepFreeze)({
        continuityStates: Object.freeze(continuity.states.map((entry) => `${entry.authorityId}:${entry.state}`)),
        traversalAuthorities: Object.freeze(traversal.traversal.map((entry) => `${entry.nodeId}:${entry.authorityId}:${entry.depth}`)),
        undeclaredAuthorities: Object.freeze(undeclared.undeclared.map((entry) => `${entry.authorityId}:${entry.state}`))
    });
}
function arraysEqual(left, right) {
    if (left.length !== right.length) {
        return false;
    }
    for (let index = 0; index < left.length; index += 1) {
        if (left[index] !== right[index]) {
            return false;
        }
    }
    return true;
}
function createEquivalence(snapshot, comparison) {
    const continuityEquivalent = arraysEqual(snapshot.continuityStates, comparison.continuityStates);
    const traversalEquivalent = arraysEqual(snapshot.traversalAuthorities, comparison.traversalAuthorities);
    const undeclaredEquivalent = arraysEqual(snapshot.undeclaredAuthorities, comparison.undeclaredAuthorities);
    return (0, immutable_1.deepFreeze)({
        equivalent: continuityEquivalent &&
            traversalEquivalent &&
            undeclaredEquivalent,
        continuityEquivalent,
        traversalEquivalent,
        undeclaredEquivalent
    });
}
function createDiagnostics(snapshot) {
    return (0, immutable_1.deepFreeze)({
        continuityCount: snapshot.continuityStates.length,
        traversalCount: snapshot.traversalAuthorities.length,
        undeclaredCount: snapshot.undeclaredAuthorities.length
    });
}
function certifyAuthorityVerification(continuity, traversal, undeclared, comparison) {
    const snapshot = createSnapshot(continuity, traversal, undeclared);
    const equivalence = createEquivalence(snapshot, comparison ?? snapshot);
    return (0, immutable_1.deepFreeze)({
        snapshot,
        equivalence,
        diagnostics: createDiagnostics(snapshot)
    });
}
