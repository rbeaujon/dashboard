module.exports = {
  roots: ['<rootDir>/tests'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(png)$': '<rootDir>/tests/__mocks__/fileMock.js',
    '^/assets/icons/find\\.png$': '<rootDir>/tests/__mocks__/find.png',
    '\\.(scss)$': 'identity-obj-proxy'
  },
  
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',
  moduleFileExtensions: ['js', 'jsx'],
  testEnvironment: 'jsdom',
  collectCoverage: true,
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};
