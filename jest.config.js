/** @type {import('jest').Config} */
module.exports = Object.freeze({
  preset: 'ts-jest',

  testEnvironment: 'node',

  roots: Object.freeze([
    '<rootDir>/tests'
  ]),

  transform: {
    '^.+\\.ts$': 'ts-jest'
  },

  moduleFileExtensions: Object.freeze([
    'ts',
    'js',
    'json'
  ]),

  testMatch: Object.freeze([
    '**/*.test.ts'
  ]),

  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,

  verbose: false
});
