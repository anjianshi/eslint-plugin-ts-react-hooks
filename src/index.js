'use strict'
const ExhaustiveDeps = require('./ExhaustiveDeps')

const plugin = {}

// 因为 plugin 内容里引用了 plugin 自己，所以先定义了 plugin 对象保证引用存在，然后再填充内容
Object.assign(plugin, {
  rules: {
    'exhaustive-deps': ExhaustiveDeps,
  },
  configs: {
    recommended: {
      files: ['**/*.{ts,mts,cts,tsx,mtsx,ctsx}'],
      languageOptions: {
        parserOptions: { sourceType: 'module' },
      },
      plugins: {
        'ts-react-hooks': plugin,
      },
      rules: {
        'react-hooks/exhaustive-deps': 'off',
        'ts-react-hooks/exhaustive-deps': 'warn',
      },
    },
  },
})

module.exports = plugin
