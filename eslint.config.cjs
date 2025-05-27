const tseslint = require('typescript-eslint')
const reactPlugin = require('eslint-plugin-react')
const reactHooksPlugin = require('eslint-plugin-react-hooks')

const files = ['demo/*.tsx']

const configs = [
  ...tseslint.configs.strictTypeChecked.map(config => ({ ...config, files })),
  ...tseslint.configs.stylisticTypeChecked.map(config => ({ ...config, files })),
  { ...reactPlugin.configs.flat.recommended, files },
  { ...reactPlugin.configs.flat['jsx-runtime'], files },
  { ...reactHooksPlugin.configs['recommended-latest'], files },
  { ...require('./dist/index.js').default.configs.recommended, files },
  {
    files,
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
module.exports = configs
