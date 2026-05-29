test("constitutional certification", () => {
import assert from "node:assert/strict";

import {
  createDeclarationIndex,
  lookupAuthorityDeclaration,
  projectDeclarationIndex,
  resolveAuthorityDeclarations
} from "../../authority/declarations.js";

const declarations = [
  {
    nodeId: "node-b",
    authority: {
      authorityId: "executor.beta",
      capabilities: ["mint", "deploy"],
      delegations: ["delegate.gamma"],
      controlSurfaces: ["treasury"]
    }
  },
  {
    nodeId: "node-a",
    authority: {
      authorityId: " executor.alpha ",
      capabilities: ["audit", "deploy", "audit"],
      delegations: ["delegate.alpha"],
      controlSurfaces: [" governance "]
    }
  }
] as const;

const resolved = resolveAuthorityDeclarations(declarations);

assert.equal(resolved[0]?.nodeId, "node-a");
assert.equal(
  resolved[0]?.authority.authorityId,
  "executor.alpha"
);

const index = createDeclarationIndex(declarations);

const lookup = lookupAuthorityDeclaration(
  index,
  " node-a "
);

assert.ok(lookup);
assert.equal(
  lookup?.authority.authorityId,
  "executor.alpha"
);

const projection = projectDeclarationIndex(index);

assert.deepStrictEqual(projection, [
  {
    nodeId: "node-a",
    authorityId: "executor.alpha"
  },
  {
    nodeId: "node-b",
    authorityId: "executor.beta"
  }
]);

assert.equal(Object.isFrozen(projection), true);

console.log("TASK-007 authority declaration tests passed");
})
