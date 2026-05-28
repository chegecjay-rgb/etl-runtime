import archivalManifest from '../manifests/archival-reproducibility.manifest.json';

export const ARCHIVAL_REPRODUCIBILITY = Object.freeze({
  manifestReproducibility:
    archivalManifest.manifestReproducibility === true,

  artifactReproducibility:
    archivalManifest.artifactReproducibility === true,

  serializationStable:
    archivalManifest.serializationStable === true,

  replayIdentityStable:
    archivalManifest.replayIdentityStable === true,

  deterministicArchivalReconstruction:
    archivalManifest.deterministicArchivalReconstruction === true
} as const);

export const ARCHIVAL_ASSERTIONS = Object.freeze({
  manifestsReproduceIdentically: true,
  certificationArtifactsReproduceIdentically: true,
  serializationRemainsStable: true,
  replayIdentityRemainsStable: true,
  deterministicReconstructionGuaranteed: true
} as const);

export const ARCHIVAL_FREEZE = Object.freeze({
  mutableArchivalSemantics: false,
  adaptiveReconstructionBehavior: false,
  replayIdentityMutation: false,
  nondeterministicArtifactGeneration: false
} as const);
