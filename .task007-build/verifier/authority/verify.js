"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthorityPipeline = verifyAuthorityPipeline;
const immutable_1 = require("../../authority/immutable");
const certify_1 = require("../../authority/certify");
const continuity_1 = require("../../authority/continuity");
const declarations_1 = require("../../authority/declarations");
const delegation_1 = require("../../authority/delegation");
const hashes_1 = require("../../authority/hashes");
const project_1 = require("../../authority/project");
const traversal_1 = require("../../authority/traversal");
const undeclared_1 = require("../../authority/undeclared");
function verifyAuthorityPipeline(declarations, edges) {
    const declarationIndex = (0, declarations_1.createDeclarationIndex)(declarations);
    const projection = (0, project_1.createAuthorityProjectionGraph)(declarationIndex, edges);
    const traversal = (0, traversal_1.traverseAuthorityProjection)(projection);
    const delegation = (0, delegation_1.verifyDelegationContinuity)(traversal);
    const continuity = (0, continuity_1.verifyAuthorityContinuity)(delegation);
    const undeclared = (0, undeclared_1.detectUndeclaredAuthority)(continuity);
    const certification = (0, certify_1.certifyAuthorityVerification)(continuity, traversal, undeclared);
    const hashes = (0, hashes_1.createAuthorityHashes)(continuity, traversal, certification.snapshot);
    return (0, immutable_1.deepFreeze)({
        pipeline: (0, immutable_1.deepFreeze)({
            declarations: declarations.length,
            edges: edges.length,
            traversalNodes: traversal.traversal.length
        }),
        bundle: (0, immutable_1.deepFreeze)({
            declarationIndex,
            projection,
            traversal,
            delegation,
            continuity,
            undeclared,
            certification,
            hashes
        })
    });
}
