"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLineage = createLineage;
exports.appendEntry = appendEntry;
const immutable_1 = require("./immutable");
const hashes_1 = require("./hashes");
function createLineage(entries) {
    const immutableEntries = (0, immutable_1.immutable)([...entries].sort((a, b) => a.entryId.localeCompare(b.entryId)));
    const lineageHash = (0, hashes_1.deterministicHash)({
        entries: immutableEntries
    });
    const lineageId = (0, hashes_1.deterministicHash)({
        lineageHash
    });
    return (0, immutable_1.immutable)({
        lineageId,
        entries: immutableEntries,
        lineageHash
    });
}
function appendEntry(lineage, entry) {
    return createLineage([
        ...lineage.entries,
        entry
    ]);
}
