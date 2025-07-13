import js from '@eslint/js';
import parser from '@typescript-eslint/parser';
import plugin from '@typescript-eslint/eslint-plugin';
import jest from 'eslint-plugin-jest'; // ✅ this fixes the ReferenceError

export default [
    {
        ignores: ['dist/**'],
    },
    {
        ...js.configs.recommended,
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                console: true,
                jest: true,
            },
        },
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser,
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        plugins: {
            '@typescript-eslint': plugin,
        },
        rules: {
            ...plugin.configs.recommended.rules,
        },
    },
    {
        files: ['**/*.test.ts'],
        languageOptions: {
            globals: {
                ...jest.environments.globals.globals,
            },
        },
        plugins: {
            jest,
        },
        rules: {
            ...jest.configs.recommended.rules,
        },
    },
];
