module.exports = {
  roots: ['<rootDir>/tests'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',
  moduleFileExtensions: ['js', 'jsx'],
  testEnvironment: 'jsdom',
  "collectCoverage": true,
  
};
