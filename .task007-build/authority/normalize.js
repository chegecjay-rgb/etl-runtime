"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeCapabilities = normalizeCapabilities;
exports.normalizeDelegations = normalizeDelegations;
exports.normalizeControlSurfaces = normalizeControlSurfaces;
exports.normalizeAuthorityDescriptor = normalizeAuthorityDescriptor;
const immutable_1 = require("./immutable");
function normalizeStringArray(values) {
    return Object.freeze([...new Set(values)]
        .map((value) => value.trim())
        .filter((value) => value.length > 0)
        .sort((left, right) => left.localeCompare(right)));
}
function normalizeCapabilities(capabilities) {
    return normalizeStringArray(capabilities);
}
function normalizeDelegations(delegations) {
    return normalizeStringArray(delegations);
}
function normalizeControlSurfaces(controlSurfaces) {
    return normalizeStringArray(controlSurfaces);
}
function normalizeAuthorityDescriptor(descriptor) {
    const normalized = {
        authorityId: descriptor.authorityId.trim(),
        capabilities: normalizeCapabilities(descriptor.capabilities),
        delegations: normalizeDelegations(descriptor.delegations),
        controlSurfaces: normalizeControlSurfaces(descriptor.controlSurfaces)
    };
    return (0, immutable_1.deepFreeze)(normalized);
}
