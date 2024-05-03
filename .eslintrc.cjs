/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    rules: {
        indent: ['error', 4],
        'vue/require-default-prop': 'off',
    },
    parserOptions: {
        ecmaVersion: 'latest',
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        'prettier',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier/skip-formatting',
    ],
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
    },
};
