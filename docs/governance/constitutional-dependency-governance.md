# Constitutional Dependency Governance

## Constitutional Principle

Deterministic certification infrastructure must not drift beyond validated compatibility boundaries.

## Freeze Rule

Toolchain versions participating in replay certification are constitutional infrastructure.

This includes:

- jest
- ts-jest
- typescript
- ts-node
- verifier runtime tooling

## Governance Constraints

Dependency upgrades must never occur without:

1. TypeScript validation
2. deterministic replay validation
3. certification execution validation
4. freeze lineage compatibility verification

## Known Compatibility Boundary

Current repository evidence indicates:

- ts-jest 29.x
- historical Jest 29 compatibility

Jest 30 introduces constitutional toolchain drift.

## Stabilization Requirement

Freeze-compatible dependency ranges must be pinned after validation succeeds.

## Repository Sovereignty Principle

Certification reproducibility overrides dependency recency.
