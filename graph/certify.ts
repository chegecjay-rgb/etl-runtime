import crypto from "crypto";

import type { CanonicalGraph } from "./types.js";

import {
  normalizeGraph
} from "./normalize.js";

import {
  validateCausality
} from "./causality.js";

import {
  validateOrphans
} from "./orphans.js";

import {
  validateAuthority
} from "./authority.js";

export type CanonicalCertification =
  Readonly<{
    causality: ReturnType<
      typeof validateCausality
    >;
    orphans: ReturnType<
      typeof validateOrphans
    >;
    authority: ReturnType<
      typeof validateAuthority
    >;
  }>;

export function certifyGraph(
  input: CanonicalGraph
): CanonicalCertification {

  const graph =
    normalizeGraph(input);

  const snapshot =
    JSON.stringify(graph);

    crypto
      .createHash("sha256")
      .update(snapshot)
      .digest("hex");

  return Object.freeze({
    causality:
      validateCausality(graph),
    orphans:
      validateOrphans(graph),
    authority:
      validateAuthority(graph)
  });
}
