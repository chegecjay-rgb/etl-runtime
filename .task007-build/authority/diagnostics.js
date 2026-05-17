"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthorityDiagnostics = createAuthorityDiagnostics;
const immutable_1 = require("./immutable");
function createSnapshot(continuity, undeclared, hashes) {
    return (0, immutable_1.deepFreeze)({
        continuityStates: Object.freeze(continuity.states.map((entry) => `${entry.authorityId}:${entry.state}`)),
        undeclaredAuthorities: Object.freeze(undeclared.undeclared.map((entry) => `${entry.authorityId}:${entry.state}`)),
        hashFingerprints: Object.freeze([
            hashes.continuity.value,
            hashes.traversal.traversal.value,
            hashes.certification.certification.value
        ])
    });
}
function createReplayDiagnostics(certification, hashes) {
    return (0, immutable_1.deepFreeze)({
        replayStable: certification.equivalence.equivalent,
        certificationEquivalent: certification.equivalence
            .continuityEquivalent &&
            certification.equivalence
                .traversalEquivalent &&
            certification.equivalence
                .undeclaredEquivalent,
        hashEquivalent: hashes.continuity.value.length === 64 &&
            hashes.traversal.traversal.value.length === 64 &&
            hashes.certification.certification.value.length === 64
    });
}
function createFreezeReadiness(continuity, undeclared, replay) {
    const continuityStable = continuity.states.length > 0;
    const undeclaredStable = undeclared.discontinuities.every((entry) => entry.state === "UNDECLARED");
    const hashStable = replay.hashEquivalent;
    return (0, immutable_1.deepFreeze)({
        ready: continuityStable &&
            undeclaredStable &&
            hashStable &&
            replay.replayStable,
        continuityStable,
        undeclaredStable,
        hashStable
    });
}
function createAuthorityDiagnostics(continuity, undeclared, certification, hashes) {
    const replay = createReplayDiagnostics(certification, hashes);
    return (0, immutable_1.deepFreeze)({
        replay,
        freeze: createFreezeReadiness(continuity, undeclared, replay),
        snapshot: createSnapshot(continuity, undeclared, hashes)
    });
}
