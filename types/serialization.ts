import type {
  CanonicalValue
} from "./evidence";

export interface CanonicalSerializer {
  serialize(
    value: CanonicalValue
  ): string;
}
