import type { deepFreeze, type DeepReadonly } from "./immutable.js";
import type {
  AuthorityDescriptor,
  CapabilityId,
  ControlSurfaceId,
  DelegationId,
  NormalizedAuthorityDescriptor
} from "./types.js";

function normalizeStringArray<T extends string>(
  values: readonly T[]
): readonly T[] {
  return Object.freeze(
    [...new Set(values)]
      .map((value) => value.trim())
      .filter((value): value is T => value.length > 0)
      .sort((left, right) => left.localeCompare(right))
  );
}

export function normalizeCapabilities(
  capabilities: readonly CapabilityId[]
): readonly CapabilityId[] {
  return normalizeStringArray(capabilities);
}

export function normalizeDelegations(
  delegations: readonly DelegationId[]
): readonly DelegationId[] {
  return normalizeStringArray(delegations);
}

export function normalizeControlSurfaces(
  controlSurfaces: readonly ControlSurfaceId[]
): readonly ControlSurfaceId[] {
  return normalizeStringArray(controlSurfaces);
}

export function normalizeAuthorityDescriptor(
  descriptor: AuthorityDescriptor
): DeepReadonly<NormalizedAuthorityDescriptor> {
  const normalized: NormalizedAuthorityDescriptor = {
    authorityId: descriptor.authorityId.trim(),
    capabilities: normalizeCapabilities(descriptor.capabilities),
    delegations: normalizeDelegations(descriptor.delegations),
    controlSurfaces: normalizeControlSurfaces(
      descriptor.controlSurfaces
    )
  };

  return deepFreeze(normalized);
}
