module.exports = {
  env: {
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  overrides: [
    {
      files: ['*.test.ts'],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 0,
      },
    },
    {
      files: ['*.{js,cjs}'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
      env: {
        node: true,
      },
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['lib/**/*.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    quotes: ['warn', 'single', { avoidEscape: true }],
    semi: ['warn', 'always'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-debugger': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
      },
    ],
  },
};
