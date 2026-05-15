import {
  compareNumbers,
  compareStrings,
  normalizeLexical,
  chainComparators
} from "../../verifier/ordering";

function assert(
  condition: boolean,
  message: string
): void {
  if (!condition) {
    throw new Error(message);
  }
}

assert(
  compareStrings("alpha", "beta") === -1,
  "Expected alpha < beta"
);

assert(
  compareStrings("beta", "alpha") === 1,
  "Expected beta > alpha"
);

assert(
  compareStrings("same", "same") === 0,
  "Expected equality comparison"
);

assert(
  compareNumbers(1, 2) === -1,
  "Expected numeric ordering"
);

assert(
  compareNumbers(2, 1) === 1,
  "Expected numeric ordering"
);

assert(
  compareNumbers(5, 5) === 0,
  "Expected numeric equality"
);

assert(
  normalizeLexical("é") === normalizeLexical("é"),
  "Expected Unicode normalization stability"
);

const comparator = chainComparators<
  Readonly<{
    readonly primary: number;
    readonly secondary: string;
  }>
>([
  (left, right) =>
    compareNumbers(left.primary, right.primary),

  (left, right) =>
    compareStrings(left.secondary, right.secondary)
]);

const comparison = comparator(
  {
    primary: 1,
    secondary: "alpha"
  },
  {
    primary: 1,
    secondary: "beta"
  }
);

assert(
  comparison === -1,
  "Expected deterministic chained comparison"
);

console.log(
  "Deterministic comparator certification passed"
);
