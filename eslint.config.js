import js from "@eslint/js";
import nextVitals from "eslint-config-next/core-web-vitals";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import {defineConfig, globalIgnores} from "eslint/config";

export default defineConfig([
    globalIgnores([".next", "dist"]),
    ...nextVitals,
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        extends: [
            js.configs.recommended,
            reactHooks.configs.flat.recommended,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: "latest",
                ecmaFeatures: {jsx: true},
                sourceType: "module",
            },
        },
        rules: {
            "no-unused-vars": ["error", {varsIgnorePattern: "^[A-Z_]"}],
            "@next/next/no-img-element": "off",
        },
    },
    {
        files: ["server/**/*.js"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.node,
            parserOptions: {
                sourceType: "script",
            },
        },
    },
]);
