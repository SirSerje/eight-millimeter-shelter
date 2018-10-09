module.exports = {
  // "extends": "airbnb", currently suppressed
  'extends': ['prettier'],
  'parser': 'babel-eslint',
  'rules': {
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'arrow-parens': ['error', 'as-needed'],
    'no-extra-semi': "error",
    'semi': ["error", "always"]
  },
};
