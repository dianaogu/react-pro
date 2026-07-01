import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import boundaries from "eslint-plugin-boundaries";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";

export default [

    {
        ignores: [
            "dist/**",
            "node_modules/**",
        ],
    },

    // Для JS-файлов
    {
        files: ["**/*.{js,mjs,cjs}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },
    },

    js.configs.recommended,
    prettier,

    {

        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: "./tsconfig.eslint.json",
            },
        },

        plugins: {
            react,
            "react-hooks": reactHooks,
            "jsx-a11y": jsxA11y,
            import: importPlugin,
            boundaries,
        },

        settings: {
            react: {
                version: "detect",
            },
            "import/resolver": {
                typescript: {
                    project: "./tsconfig.app.json",
                },
            },

            "boundaries/elements": [
                { type: "shared", pattern: "src/shared/*" },
                { type: "entities", pattern: "src/entities/*" },
                { type: "features", pattern: "src/features/*" },
                { type: "widgets", pattern: "src/widgets/*" },
                { type: "pages", pattern: "src/pages/*" },
                { type: "app", pattern: "src/app/*" },
            ],
        },

        rules: {
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            ...jsxA11y.configs.recommended.rules,
            ...importPlugin.configs.recommended.rules,

            "react/react-in-jsx-scope": "off",
            "react/jsx-uses-react": "off",
            "no-undef": "off",
            "no-unused-vars": "off",

            "boundaries/element-types": [
                "error",
                {
                    default: "disallow",
                    rules: [
                        { from: "features", allow: ["shared", "entities"] },
                        { from: "entities", allow: ["shared"] },
                        { from: "widgets", allow: ["shared", "features", "entities"] },
                        { from: "pages", allow: ["widgets", "features", "entities", "shared"] },
                    ],
                },
            ],
        },
    },
];