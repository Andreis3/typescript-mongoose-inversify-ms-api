module.exports = {
    roots: ['<rootDir>'],
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // Indicates which provider should be used to instrument code for coverage
    // coverageProvider: 'v8',

    // The test environment that will be used for testing
    testEnvironment: 'node',
    //preset: '@shelf/jest-mongodb',
    // watchPathIgnorePatterns: ['globalConfig'],

    // A map from regular expressions to paths to transformers
    transform: {
        '.+\\.ts$': 'ts-jest',
    },
    // testMatch: ['**/tests/**/*.spec.ts'],

    modulePathIgnorePatterns: [],
    moduleNameMapper: {
        '@/(.*)': '<rootDir>src/$1',
    },
};
