module.exports = {
  // moduleDirectories: ['node_modules', '<rootDir>/'],
  preset: 'ts-jest/presets/js-with-babel',
  testEnvironment: 'jest-environment-jsdom',
  // transformIgnorePatterns: ['/node_modules/(?!ken-all)/'],
  moduleNameMapper: {
    '^@/(.+)': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
}
