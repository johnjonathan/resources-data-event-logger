const { compilerOptions } = require('./tsconfig.json')
const { pathsToModuleNameMapper } = require('ts-jest/utils')

module.exports = {
    clearMocks: true,
    coveragePathIgnorePatterns: ['/node_modules/'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
    preset: 'ts-jest',
    setupFiles: ['dotenv/config'],
    setupFilesAfterEnv: ['jest-extended'],
    testEnvironment: 'node',
    watchPlugins: ['jest-watch-yarn-workspaces'],
}
