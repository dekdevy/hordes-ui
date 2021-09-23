module.exports = {
  root   : true,
  parser : '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'sort-imports-es6-autofix'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'sort-imports-es6-autofix/sort-imports-es6': [2, {
      'ignoreCase'           : false,
      'ignoreMemberSort'     : false,
      'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single']
    }],
    'newline-per-chained-call'   : 'error',
    'no-useless-return'          : 'error',
    'max-len'                    : ['error', { 'code': 150, 'comments': 200 }],
    'no-var'                     : 'error',
    'prefer-const'               : 'error',
    'no-unused-vars'             : ['error', { 'args': 'none' }],
    'key-spacing'                : ['error', { 'align': 'colon' }],
    'block-spacing'              : 'error',
    'comma-style'                : ['error', 'last'],
    'brace-style'                : 'error',
    'lines-between-class-members': ['error', 'always'],
    'no-multiple-empty-lines'    : ['error', {'max': 1}],
    'space-before-blocks'        : 'error',
    'operator-linebreak'         : ['error', 'after'],
    'no-trailing-spaces'         : 'error',
    'comma-spacing'              : ['error', { 'before': false, 'after': true }],
    'comma-dangle'               : ['error', 'never'],
    'no-console'                 : 'off',
    'require-atomic-updates'     : 'off',
    '@typescript-eslint/indent'  : ['error', 2 ],
    'quotes'                     : ['error', 'single'],
    'semi'                       : ['error', 'never']
  }
}