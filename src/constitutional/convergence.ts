export const EXECUTION_MODEL = Object.freeze([
  'receive',
  'canonicalize',
  'classify',
  'emit'
] as const);

export const SUBSYSTEM_AUTHORITIES = Object.freeze({
  verifier: 'classification',
  replay: 'reconstruction',
  certification: 'attestation',
  containment: 'isolation',
  entropy: 'entropy-enforcement',
  compiler: 'deterministic-compilation',
  orchestration: 'procedural-invocation'
} as const);

export const CONVERGENCE_ASSERTIONS = Object.freeze({
  subsystemConvergence: true,
  deterministicCoordinationOnly: true,
  semanticIsolationPreserved: true,
  authorityOverlapProhibited: true,
  adaptiveBehaviorProhibited: true
} as const);

export const CONVERGENCE_FREEZE = Object.freeze({
  immutableExecutionOrdering: true,
  unifiedExecutionModel: true,
  semanticFragmentationAllowed: false,
  runtimeGovernanceMutable: false
} as const);
