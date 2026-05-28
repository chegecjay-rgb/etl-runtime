export const SERIALIZATION_FREEZE = Object.freeze({
  encoding: 'utf-8',
  newline: '\n',
  keyOrdering: 'lexicographic',
  deterministicBuffers: true,
  replaySafeCanonicalization: true
} as const);

export const SERIALIZATION_ASSERTIONS = Object.freeze({
  utf8NormalizationStable: true,
  newlineNormalizationStable: true,
  deterministicKeyOrderingStable: true,
  canonicalHashingStable: true,
  crossEnvironmentSerializationStable: true
} as const);

export const SERIALIZATION_CONTRACT_FREEZE = Object.freeze({
  mutableSerializationAllowed: false,
  adaptiveEncodingAllowed: false,
  runtimeDependentSerializationAllowed: false,
  deterministicSerializationRequired: true
} as const);
