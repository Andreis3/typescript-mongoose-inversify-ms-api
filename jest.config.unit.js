// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./jest.config');

delete config.collectCoverageFrom;

config.testMatch = ['**/tests/unit/**/*.spec.ts'];
// config.testRegex = ['test\\.js$'];
console.log('RUNNING UNIT TEST');

module.exports = config;
