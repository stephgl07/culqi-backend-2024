/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    globals: {
        'ts-jest': {
            isolatedModules: true,
        },
    },
    roots: ['<rootDir>'],
    moduleDirectories: ['node_modules', '<rootDir>'],
    moduleFileExtensions: ['js', 'json', 'ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    preset: 'ts-jest',
};
