"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverseLineage = traverseLineage;
exports.traverseEntryIds = traverseEntryIds;
exports.traverseCertificationHashes = traverseCertificationHashes;
const immutable_1 = require("./immutable");
function traverseLineage(lineage) {
    return (0, immutable_1.immutable)([...lineage.entries].sort((left, right) => left.entryId.localeCompare(right.entryId)));
}
function traverseEntryIds(lineage) {
    return (0, immutable_1.immutable)(traverseLineage(lineage).map((entry) => entry.entryId));
}
function traverseCertificationHashes(lineage) {
    return (0, immutable_1.immutable)(traverseLineage(lineage).map((entry) => entry.certificationHash));
}
