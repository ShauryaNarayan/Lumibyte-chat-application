module.exports = {
  env: {
    'shared-node-browser': true,
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
    node: true,
    serviceworker: true,
    worker: true,
  },
  extends: [
    'react-app',
    'react-app/jest',
    // https://github.com/iamturns/eslint-config-airbnb-typescript#user-content-i-wish-this-config-would-support-
    // Sets up: @typescript-eslint/eslint-plugin, import, jsx-a11y, react, react-hooks
    'airbnb',
    'airbnb/hooks',
    'plugin:promise/recommended',
    'plugin:compat/recommended',
    'plugin:eslint-comments/recommended',
    // https://github.com/prettier/eslint-plugin-prettier#user-content-recommended-configuration
    // Sets up: eslint-config-prettier, eslint-plugin-prettier
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['build', 'coverage', 'service-worker.js', 'serviceWorkerRegistration.js'],
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'import/order': ['error', { alphabetize: { order: 'asc' } }],
    'import/prefer-default-export': 'off',
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsForRegex: ['^draft'] },
    ],
    'no-underscore-dangle': ['error', { allow: ['__WB_MANIFEST'] }],
    'react/require-default-props': 'off',

    // 👇 ADD THIS LINE
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
  },
};
