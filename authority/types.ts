export type AuthorityId = string;
export type CapabilityId = string;
export type DelegationId = string;
export type ControlSurfaceId = string;

export interface AuthorityDescriptor {
  readonly authorityId: AuthorityId;
  readonly capabilities: readonly CapabilityId[];
  readonly delegations: readonly DelegationId[];
  readonly controlSurfaces: readonly ControlSurfaceId[];
}

export interface NormalizedAuthorityDescriptor {
  readonly authorityId: AuthorityId;
  readonly capabilities: readonly CapabilityId[];
  readonly delegations: readonly DelegationId[];
  readonly controlSurfaces: readonly ControlSurfaceId[];
}
