/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest',
  },
  coveragePathIgnorePatterns: [
    '.*__snapshots__/.*',
    '.index\\.ts',
  ],
};
