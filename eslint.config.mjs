import { defineConfig } from "eslint/config";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends("airbnb", "plugin:prettier/recommended", "prettier/react"),

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.commonjs,
            ...globals.jest,
            ...globals.node,
        },
    },

    rules: {
        "jsx-a11y/href-no-hash": ["off"],

        "react/jsx-filename-extension": ["warn", {
            extensions: [".js", ".jsx"],
        }],

        "max-len": ["warn", {
            code: 80,
            tabWidth: 2,
            comments: 80,
            ignoreComments: false,
            ignoreTrailingComments: true,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
        }],
    },
}]);