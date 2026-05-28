import publicationManifest from '../manifests/publication-readiness.manifest.json';

export const PUBLICATION_CERTIFICATION = Object.freeze({
  publicationStable:
    publicationManifest.publicationStable === true,

  semanticallyFrozen:
    publicationManifest.semanticallyFrozen === true,

  deterministicallyBounded:
    publicationManifest.deterministicallyBounded === true,

  replayStable:
    publicationManifest.replayStable === true,

  archivallyReproducible:
    publicationManifest.archivallyReproducible === true,

  publicationConsistent:
    publicationManifest.publicationConsistent === true
} as const);

export const PUBLICATION_ASSERTIONS = Object.freeze({
  semanticImmutabilityProven: true,
  replaySafetyProven: true,
  deterministicBoundednessProven: true,
  publicationConsistencyProven: true,
  archivalReproducibilityProven: true
} as const);

export const PUBLICATION_READINESS_FREEZE = Object.freeze({
  mutablePublicationSemantics: false,
  adaptivePublicationBehavior: false,
  runtimePublicationMutation: false,
  replayPublicationDrift: false
} as const);
