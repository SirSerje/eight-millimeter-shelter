module.exports = {
  'parser': 'babel-eslint',
  'env': {
    'browser': true,
    'es6': true,
    'jest': true,
  },
  'extends': ['airbnb'],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    'import',
  ],
  'rules': {
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'arrow-parens': ['error', 'as-needed'],
    'no-extra-semi': "error",
    'semi': ["error", "always"]
  },
};
