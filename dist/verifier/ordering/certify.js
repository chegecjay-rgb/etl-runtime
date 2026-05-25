"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertDeterministicEquality = assertDeterministicEquality;
exports.assertImmutableSnapshot = assertImmutableSnapshot;
exports.createReplaySnapshot = createReplaySnapshot;
exports.certifyReplayOrdering = certifyReplayOrdering;
function assertDeterministicEquality(left, right, message) {
    const leftSerialized = JSON.stringify(left);
    const rightSerialized = JSON.stringify(right);
    if (leftSerialized !== rightSerialized) {
        throw new Error(message);
    }
}
function assertImmutableSnapshot(current, snapshot, message) {
    const serialized = JSON.stringify(current);
    if (serialized !== snapshot) {
        throw new Error(message);
    }
}
function createReplaySnapshot(value) {
    return JSON.stringify(value);
}
function certifyReplayOrdering(baseline, candidate) {
    const baselineHash = JSON.stringify(baseline);
    const candidateHash = JSON.stringify(candidate);
    return {
        deterministic: baselineHash === candidateHash,
        baselineHash,
        candidateHash
    };
}
