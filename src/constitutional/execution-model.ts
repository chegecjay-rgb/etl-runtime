export const CONSTITUTIONAL_EXECUTION_MODEL = Object.freeze([
  'receive',
  'canonicalize',
  'classify',
  'emit'
] as const);

export type ConstitutionalExecutionPhase =
  typeof CONSTITUTIONAL_EXECUTION_MODEL[number];

export const EXECUTION_MODEL_ASSERTIONS = Object.freeze({
  canonicalIngress: true,
  deterministicNormalization: true,
  invariantClassification: true,
  canonicalEmission: true,
  replaySafeIdentity: true
} as const);

export const EXECUTION_MODEL_FREEZE = Object.freeze({
  immutableOrdering: true,
  semanticMutationAllowed: false,
  adaptiveExecutionAllowed: false,
  deterministicExecutionOnly: true
} as const);
