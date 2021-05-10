module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'jest'
  ],
  extends: [
    'prettier',
    'plugin:jest/recommended',
  ],
  rules: {
  }
};
