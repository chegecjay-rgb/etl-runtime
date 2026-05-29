import assert from "node:assert/strict"
import path from "node:path"

import { createCompilerAttestation  } from "../../compiler/createCompilerAttestation.js"

const tsconfigPath = path.resolve(
  "compiler/tsconfig.replay.sovereign.json"
)

const attestationA = createCompilerAttestation(
  tsconfigPath
)

const attestationB = createCompilerAttestation(
  tsconfigPath
)

assert.equal(
  attestationA.compilerHash,
  attestationB.compilerHash
)

assert.equal(
  attestationA.deterministic,
  true
)

assert.equal(
  attestationA.isolated,
  true
)

assert.equal(
  attestationA.mutableRootInheritance,
  false
)

console.log("compiler-sovereignty.test.ts passed")
