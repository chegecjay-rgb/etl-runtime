import type { createHash } from "node:crypto";

import {
  CertificationEntry,
  CertificationLineage,
  JsonObject,
  JsonValue,
  SnapshotReference
} from "./types.js";

function isJsonObject(value: JsonValue): value is JsonObject {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
}

function normalize(value: JsonValue): JsonValue {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((entry) => normalize(entry));
  }

  if (!isJsonObject(value)) {
    return value;
  }

  const normalized: Record<string, JsonValue> = {};

  for (const key of Object.keys(value).sort()) {
    const normalizedValue = value[key];

    normalized[key] = normalize(normalizedValue);
  }

  return normalized;
}

export function canonicalize(value: JsonValue): string {
  return JSON.stringify(normalize(value));
}

export function deterministicHash(value: JsonValue): string {
  return createHash("sha256")
    .update(canonicalize(value))
    .digest("hex");
}

export function hashEntry(entry: CertificationEntry): string {
  return deterministicHash(entry);
}

export function hashLineage(lineage: CertificationLineage): string {
  return deterministicHash(lineage);
}

export function hashSnapshot(snapshot: SnapshotReference): string {
  return deterministicHash(snapshot);
}
