export interface AuthorityBoundary {
  readonly subsystem: string;
  readonly authority: string;
  readonly mutable: false;
  readonly overlappingAuthorities: readonly string[];
}

export const AUTHORITY_BOUNDARIES = Object.freeze([
  Object.freeze({
    subsystem: 'verifier',
    authority: 'classification',
    mutable: false,
    overlappingAuthorities: Object.freeze([])
  }),

  Object.freeze({
    subsystem: 'replay',
    authority: 'reconstruction',
    mutable: false,
    overlappingAuthorities: Object.freeze([])
  }),

  Object.freeze({
    subsystem: 'certification',
    authority: 'attestation',
    mutable: false,
    overlappingAuthorities: Object.freeze([])
  }),

  Object.freeze({
    subsystem: 'containment',
    authority: 'isolation',
    mutable: false,
    overlappingAuthorities: Object.freeze([])
  }),

  Object.freeze({
    subsystem: 'entropy',
    authority: 'entropy-enforcement',
    mutable: false,
    overlappingAuthorities: Object.freeze([])
  }),

  Object.freeze({
    subsystem: 'compiler',
    authority: 'deterministic-compilation',
    mutable: false,
    overlappingAuthorities: Object.freeze([])
  }),

  Object.freeze({
    subsystem: 'orchestration',
    authority: 'procedural-invocation',
    mutable: false,
    overlappingAuthorities: Object.freeze([])
  })
] as const);

export const AUTHORITY_ISOLATION_ASSERTIONS = Object.freeze({
  verifierCannotReplay: true,
  replayCannotVerify: true,
  orchestrationCannotInterpret: true,
  certificationCannotMutate: true,
  compilerCannotOrchestrate: true,
  containmentCannotClassify: true
} as const);

export const AUTHORITY_BOUNDARY_FREEZE = Object.freeze({
  authorityOverlapAllowed: false,
  semanticBleedAllowed: false,
  adaptiveBoundaryCrossingAllowed: false,
  mutableExecutionInterpretationAllowed: false
} as const);
