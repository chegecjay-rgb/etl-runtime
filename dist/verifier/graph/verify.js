"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGraph = verifyGraph;
const topology_1 = require("../../graph/topology");
const causality_1 = require("../../graph/causality");
const orphans_1 = require("../../graph/orphans");
const authority_1 = require("../../graph/authority");
const certify_1 = require("../../graph/certify");
function verifyGraph(graph) {
    const validation = Object.freeze({
        topology: (0, topology_1.validateTopology)(graph),
        causality: (0, causality_1.validateCausality)(graph),
        orphans: (0, orphans_1.validateOrphans)(graph),
        authority: (0, authority_1.validateAuthority)(graph)
    });
    const certification = (0, certify_1.certifyGraph)(graph);
    return Object.freeze({
        validation,
        certification
    });
}
