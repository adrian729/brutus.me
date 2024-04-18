import antfu from '@antfu/eslint-config';

export default antfu(
    {
        stylistic: {
            indent: 4,
            quotes: 'single',
            semi: true,
        },
    },
    {
        rules: {
            'no-console': 'warn',
        },
    },
);
