"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveCanonicalIdentifier = exports.SHA256IdentifierDeriver = void 0;
const node_crypto_1 = require("node:crypto");
const assertNonEmpty = (value, field) => {
    if (value.trim().length === 0) {
        throw new Error(field + " must not be empty");
    }
};
const createDeterministicHash = (input) => {
    return (0, node_crypto_1.createHash)("sha256")
        .update(input, "utf8")
        .digest("hex");
};
class SHA256IdentifierDeriver {
    derive(input) {
        assertNonEmpty(input.schemaVersion, "schemaVersion");
        assertNonEmpty(input.kind, "kind");
        assertNonEmpty(input.canonicalPayload, "canonicalPayload");
        const canonicalIdentityMaterial = [
            input.schemaVersion,
            input.kind,
            input.canonicalPayload
        ].join("|");
        const evidenceHash = createDeterministicHash(canonicalIdentityMaterial);
        return Object.freeze({
            namespace: "etl.reference.verifier",
            evidenceHash
        });
    }
}
exports.SHA256IdentifierDeriver = SHA256IdentifierDeriver;
const deriveCanonicalIdentifier = (input) => {
    return new SHA256IdentifierDeriver()
        .derive(input);
};
exports.deriveCanonicalIdentifier = deriveCanonicalIdentifier;
