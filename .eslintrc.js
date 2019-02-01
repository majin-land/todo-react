module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:css-modules/recommended',
    'airbnb',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      experimentalDecorators: true,
      experimentalObjectRestSpread: true,
      jsx: true,
      classes: true,
    },
    sourceType: 'module'
  },
  globals: {
    'google': true,
    'ga': true,
    'graphql': false,
    '__VERSION__': true,
    '__ENV__': true,
  },
  plugins: ['react', 'import', 'css-modules', 'json'],
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    camelcase: 0,
    'max-len': 0,
    'linebreak-style': ['error', 'unix'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true, optionalDependencies: false, peerDependencies: false }],
    'no-param-reassign': ['error', { props: false }],
    'object-curly-newline': [0],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'lines-between-class-members': ['error', 'always'],
    'arrow-body-style': 0,
    'no-underscore-dangle': 0,
    'no-nested-ternary': 1, // warning for now, merchant-portal used alot and related to logic
    'jsx-a11y/label-has-for': 0,
    'lines-between-class-members': 0,

    // import
    'import/no-unresolved': [2, { ignore: ['config/message$'] }],
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,

    // react
    'react/sort-comp' : 0,
    'react/prop-types': 0,
    'react/prefer-stateless-function': 0,
    'react/no-unescaped-entities': 0,
    'react/forbid-prop-types': [2, { forbid: ['any'] }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/no-array-index-key': 1, // warning for now, don't know how to fix
    "jsx-a11y/anchor-is-valid": [ "error", {
      components: [ "Link" ],
      specialLink: [ "to" ],
      aspects: [ "noHref", "invalidHref", "preferButton" ]
    }],
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,

    // css
    'css-modules/no-unused-class': 1,
  },
  overrides: [
    {
      files: ['**/stores/*.js'],
      rules: {
        'func-names': 0,
        'consistent-return': 0,
      },
    },
  ],
};
