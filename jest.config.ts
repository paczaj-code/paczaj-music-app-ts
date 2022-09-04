module.exports = {
  testEnvironment: "node",
  // roots: ['<rootDir>/src/'],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{jsx,ts,tsx}",
    "!<rootDir>/node_modules/",
    // '!src/server.ts',
  ],
  verbose: true,
};
