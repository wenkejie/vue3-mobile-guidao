import antfu from '@antfu/eslint-config'

export default antfu({
  // enable UnoCSS support
  // https://unocss.dev/integrations/vscode
  unocss: true,

  ignores: [
    '.github',
  ],
  formatters: {
    css: true,
  },
  rules: {
    // Vue specific rules
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',

    'vue/no-v-html': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off',

    // TypeScript specific rules
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
})
