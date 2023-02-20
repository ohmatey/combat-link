module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    'ecmaVersion': 2018,
  },
  extends: [
    'eslint:recommended',
    'google',
  ],
  rules: {
    // turn off semi colon
    'semi': ['error', 'never'],
    // force single quotes and backticks
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    'no-restricted-globals': ['error', 'name', 'length'],
    'prefer-arrow-callback': 'error',
    // dont require trailing commas
    'comma-dangle': ['error', 'never'],
  },
  overrides: [
    {
      files: ['**/*.spec.*'],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
}
