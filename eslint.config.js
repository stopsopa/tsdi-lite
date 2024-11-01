/* eslint-disable */
const js = require("@eslint/js");
const globals = require("globals");
const pluginJs = require("@eslint/js");
const tseslint = require("typescript-eslint");
const jest = require("eslint-plugin-jest");
const eslintConfigPrettier = require("eslint-config-prettier");

module.exports = tseslint.config(
  // will override all "rules" so put it before
  // any other config object specifying rules
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    ignores: ["dist/*"],
  },
  {
    files: ["src/*.ts", "src/*.tsx"],
    rules: {
      // Ignore variables starting with _
      // for notorious error:
      // 'data' is declared but its value is never read.ts(6133)
      // 'data' is defined but never used.eslint@typescript-eslint/no-unused-vars
      "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
    },
  },
);
