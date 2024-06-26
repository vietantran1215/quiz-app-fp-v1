// jest.config.js
export default {
  transform: {
    // "^.+\\.m?jsx?$": "babel-jest", // Transform both .js and .jsx files
  },
  testEnvironment: "jest-environment-jsdom",
  moduleFileExtensions: ["js", "jsx", "json", "node", "mjs"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  injectGlobals: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!src/index.js",
    "!src/bootstrap.js",
    "!src/server.js",
    "!**/vendor/**",
    "!**/coverage/**",
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 50,
      statements: 100,
    },
  },
  coverageReporters: ["text", "lcov", "json", "html"],
};
