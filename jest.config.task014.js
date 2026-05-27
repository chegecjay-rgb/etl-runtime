module.exports = {
  rootDir: ".",
  testEnvironment: "node",
  roots: [
    "<rootDir>/tests"
  ],
  modulePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/ERCs/",
    "/anti-rug pull protocol/",
    "/btc-coop-solvency/",
    "/proof-of-operation/",
    "/proof-of-operation-retrofits/",
    "/protocol-control-disclosure/",
    "/lib/"
  ],
  testMatch: [
    "**/*.test.ts"
  ],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.json"
      }
    ]
  }
};
