module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src', '<rootDir>/integration-tests'],
    testMatch: ['**/*.test.ts'],
};
