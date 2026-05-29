# Tracked Artifact Governance Policy

## Constitutional Rule

Tracked lineage artifacts override cleanup heuristics.

## Classification

### .task007-build

Classification:
- tracked constitutional lineage artifact
- historical deterministic build evidence
- non-disposable without governance review

### .task009-build

Classification:
- tracked constitutional lineage artifact
- verifier lineage evidence
- non-disposable without governance review

## Cleanup Constraints

The following directories must never be automatically removed if tracked by git:

- .task*
- reports/freeze/
- fixtures/
- verifier lineage domains
- certification lineage domains

## Repository Governance

Tracked artifacts take precedence over heuristic cleanup policies.

Repository cleanup must verify:

1. git tracking status
2. constitutional lineage role
3. replay certification dependency
4. verifier dependency
5. freeze lineage dependency

before removal authorization.

## Constitutional Preservation Principle

Historical deterministic lineage artifacts are part of repository sovereignty and archival integrity.
