import crypto from "crypto";

import {
  CanonicalGraph
} from "./types";

import {
  normalizeGraph
} from "./normalize";

import {
  validateCausality
} from "./causality";

import {
  validateOrphans
} from "./orphans";

import {
  validateAuthority
} from "./authority";

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
