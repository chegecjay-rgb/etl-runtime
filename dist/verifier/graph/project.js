"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRecords = projectRecords;
function projectRecords(records) {
    const nodes = [];
    const edges = [];
    for (const record of records) {
        const parents = record.parentExecutionId
            ? [record.parentExecutionId]
            : [];
        nodes.push(Object.freeze({
            id: record.executionId,
            parents,
            authority: record.authority ??
                "UNKNOWN"
        }));
        if (record.parentExecutionId) {
            edges.push(Object.freeze({
                from: record.parentExecutionId,
                to: record.executionId,
                ordinal: record.ordinal
            }));
        }
    }
    return Object.freeze({
        nodes: Object.freeze(nodes),
        edges: Object.freeze(edges)
    });
}
