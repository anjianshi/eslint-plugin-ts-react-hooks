import ExhaustiveDeps from './ExhaustiveDeps'

const plugin = {
  rules: {
    'exhaustive-deps': ExhaustiveDeps,
  },
  configs: {
    recommended: {
      files: ['**/*.{ts,mts,cts,tsx,mtsx,ctsx}'],
      languageOptions: {
        parserOptions: {
          projectService: true,
        },
      },
      plugins: {
        get 'ts-react-hooks'() {
          return plugin
        },
      },
      rules: {
        'react-hooks/exhaustive-deps': 'off',
        'ts-react-hooks/exhaustive-deps': 'warn',
      },
    },
  },
}
export default plugin
