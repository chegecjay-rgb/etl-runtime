import assert from "node:assert/strict";

import {
  normalizeAuthorityDescriptor,
  normalizeCapabilities,
  normalizeControlSurfaces,
  normalizeDelegations
} from "../../authority/normalize";

const descriptor = normalizeAuthorityDescriptor({
  authorityId: " executor.alpha ",
  capabilities: [
    "deploy",
    "mint",
    "deploy",
    " audit "
  ],
  delegations: [
    "delegate.beta",
    "delegate.alpha",
    "delegate.beta"
  ],
  controlSurfaces: [
    "governance",
    " treasury ",
    "governance"
  ]
});

assert.equal(descriptor.authorityId, "executor.alpha");

assert.deepEqual(
  descriptor.capabilities,
  normalizeCapabilities([
    "mint",
    "deploy",
    "audit",
    "deploy"
  ])
);

assert.deepEqual(
  descriptor.delegations,
  normalizeDelegations([
    "delegate.beta",
    "delegate.alpha"
  ])
);

assert.deepEqual(
  descriptor.controlSurfaces,
  normalizeControlSurfaces([
    "treasury",
    "governance"
  ])
);

assert.equal(Object.isFrozen(descriptor), true);
assert.equal(Object.isFrozen(descriptor.capabilities), true);

console.log("TASK-007 authority normalization tests passed");
