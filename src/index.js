'use strict';
const ExhaustiveDeps = require('./ExhaustiveDeps')


module.exports = {
  rules: {
    'exhaustive-deps': ExhaustiveDeps,
  },
  configs: {
    recommended: {
      parser: '@typescript-eslint/parser',
      plugins: ['ts-react-hooks'],
      overrides: [
        {
          files: ['*.ts', '*.tsx'],
          parserOptions: { sourceType: 'module' },
          rules: {
            'react-hooks/exhaustive-deps': 'off',
            'ts-react-hooks/exhaustive-deps': 'warn',
          }
        }
      ],
    },
  },
};
