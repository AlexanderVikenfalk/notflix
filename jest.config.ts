/** @type {import('jest').Config} */
export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        "^.+\\.(svg)$": "<rootDir>/src/__mocks__/svgMock.tsx",
    },
    testPathIgnorePatterns: [
        '<rootDir>/playwrightTests/',
    ],
    testRegex: '((?!\\.playwright).)*\\.test\\.tsx?$',
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                useESM: true,
                tsconfig: 'tsconfig.test.json'
            }
        ]
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
} 