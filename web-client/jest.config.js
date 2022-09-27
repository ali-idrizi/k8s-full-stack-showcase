const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  automock: false,
  resetMocks: false,
  setupFiles: ['./src/utils/test/setup-jest.ts'],
}

module.exports = createJestConfig(customJestConfig)
