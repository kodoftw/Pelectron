module.exports = {
  extends: 'erb/typescript',
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'class-methods-use-this': 0,
    'lines-between-class-members': 0,
    'no-plusplus': 0,
    'no-shadow': 0,
    'react/prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    'prettier/prettier': [
      'error',
      {
        'trailingComma': "es5",
        'printWidth': 100
      }
    ]
  },
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      webpack: {
        config: require.resolve('./configs/webpack.config.eslint.js')
      }
    }
  }
};
