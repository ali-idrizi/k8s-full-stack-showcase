module.exports = {
  rootDir: './',
  roots: ['./src', './test/unit'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coveragePathIgnorePatterns: [
    // Ignore files that are better suited for e2e testing
    'main.ts',
    '.*\\.module\\.ts$',
    '.*\\.interceptor\\.ts$',
    '.*\\.interface\\.ts$',
    '.*\\.decorator\\.ts$',
    '.*\\.dto\\.ts$',
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
}
