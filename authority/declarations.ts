import type { deepFreeze, type DeepReadonly } from "./immutable.js";
import {
  normalizeAuthorityDescriptor
} from "./normalize.js";
import type {
  AuthorityDescriptor,
  NormalizedAuthorityDescriptor
} from "./types.js";

export interface AuthorityDeclaration {
  readonly nodeId: string;
  readonly authority: AuthorityDescriptor;
}

export interface ResolvedAuthorityDeclaration {
  readonly nodeId: string;
  readonly authority: DeepReadonly<NormalizedAuthorityDescriptor>;
}

export interface DeclarationProjection {
  readonly nodeId: string;
  readonly authorityId: string;
}

export type DeclarationIndex = ReadonlyMap<
  string,
  DeepReadonly<ResolvedAuthorityDeclaration>
>;

function sortDeclarations(
  declarations: readonly AuthorityDeclaration[]
): readonly AuthorityDeclaration[] {
  return Object.freeze(
    [...declarations].sort((left, right) => {
      const nodeOrder = left.nodeId.localeCompare(right.nodeId);

      if (nodeOrder !== 0) {
        return nodeOrder;
      }

      return left.authority.authorityId.localeCompare(
        right.authority.authorityId
      );
    })
  );
}

export function resolveAuthorityDeclarations(
  declarations: readonly AuthorityDeclaration[]
): readonly DeepReadonly<ResolvedAuthorityDeclaration>[] {
  return Object.freeze(
    sortDeclarations(declarations).map((declaration) =>
      deepFreeze({
        nodeId: declaration.nodeId.trim(),
        authority: normalizeAuthorityDescriptor(
          declaration.authority
        )
      })
    )
  );
}

export function createDeclarationIndex(
  declarations: readonly AuthorityDeclaration[]
): DeclarationIndex {
  const entries = resolveAuthorityDeclarations(declarations).map(
    (resolved) => [resolved.nodeId, resolved] as const
  );

  return deepFreeze(new Map(entries));
}

export function projectDeclarationIndex(
  index: DeclarationIndex
): readonly DeepReadonly<DeclarationProjection>[] {
  return Object.freeze(
    [...index.values()]
      .map((resolved) =>
        deepFreeze({
          nodeId: resolved.nodeId,
          authorityId: resolved.authority.authorityId
        })
      )
      .sort((left, right) =>
        left.nodeId.localeCompare(right.nodeId)
      )
  );
}

export function lookupAuthorityDeclaration(
  index: DeclarationIndex,
  nodeId: string
): DeepReadonly<ResolvedAuthorityDeclaration> | undefined {
  return index.get(nodeId.trim());
}
