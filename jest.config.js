module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transformIgnorePatterns: ['/node_modules/'],
  testMatch: [
    '<rootDir>/**/__tests__/**/*.js',
    '<rootDir>/**/*.{spec,test}.js',
    '<rootDir>/**/__tests__/**/*.ts',
    '<rootDir>/**/*.{spec,test}.ts',
  ],
};
