/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};


// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom', // Use jsdom for React components
//   setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Setup file for testing library
//   moduleNameMapper: {
//     '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
//   },
//   transform: {
//     '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files
//   },
//   testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'], // Test file patterns
// };