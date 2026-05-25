"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArtifact = createArtifact;
exports.createCertificationEntry = createCertificationEntry;
const immutable_1 = require("./immutable");
const hashes_1 = require("./hashes");
function createArtifact(input) {
    const artifactPayload = (0, immutable_1.immutable)(input.payload);
    const artifactHash = (0, hashes_1.deterministicHash)({
        artifactType: input.artifactType,
        payload: artifactPayload
    });
    return (0, immutable_1.immutable)({
        artifactId: input.artifactId,
        artifactHash,
        artifactType: input.artifactType,
        payload: artifactPayload
    });
}
function createCertificationEntry(input) {
    const artifact = createArtifact(input);
    const certificationHash = (0, hashes_1.deterministicHash)({
        artifact,
        lineageHash: input.lineageHash
    });
    const entryId = (0, hashes_1.deterministicHash)({
        certificationHash
    });
    return (0, immutable_1.immutable)({
        entryId,
        artifact,
        lineageHash: input.lineageHash,
        certificationHash
    });
}
