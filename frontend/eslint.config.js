import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default {
  extends: [
    js.configs.recommended, // ESLint recommended rules for JS
    'plugin:react/recommended', // React plugin recommended rules
  ],
  files: ['**/*.{js,jsx}'],
  languageOptions: {
    ecmaVersion: 2020, // ES2020 syntax support
    globals: globals.browser, // Browser globals
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
