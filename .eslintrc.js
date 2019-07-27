module.exports = {
  'env': {
    'es6': true,
    'node': true,
  },
  'extends': 'airbnb',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'rules': {
    'arrow-parens': ['error', 'as-needed'],
    'camelcase': 0,
    'class-methods-use-this': 0,
    'consistent-return': 0,
    'curly': [2, "multi-or-nest"],
    'func-names': 0,
    'global-require': 0,
    'guard-for-in': 0,
    'max-len': 0,
    'no-console': 0,
    'no-continue': 0,
    'no-invalid-this': 0,
    'nonblock-statement-body-position': ['error', 'below'],
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'no-restricted-syntax': 0,
    'no-return-assign': 0,
    'no-underscore-dangle': 0,
    'no-use-before-define': 0,
    'require-jsdoc': 0,
    'semi': [1, "never"],
    'valid-jsdoc': 0,
  },
};
