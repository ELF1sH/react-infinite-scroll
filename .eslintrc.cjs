module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "plugin:import/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: [
    "react-refresh",
    "@tanstack/query",
    "@typescript-eslint",
    "unused-imports",
    "import",
  ],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "unused-imports/no-unused-imports": "error",
    "import/order": [
      2,
      {
        distinctGroup: true,
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        groups: [
          "builtin",
          ["external", "type"],
          "unknown",
          ["internal", "sibling", "parent"],
          "index",
          "object",
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "no-duplicate-imports": "error",
    "import/no-default-export": "off",
    "@typescript-eslint/no-unused-vars": "off"
  },
  overrides: [
    {
      files: [
        "pages/**",
        "public/**",
        "src/features/**",
        "src/ui/**",
        "src/application/**",
        "./vite.config.ts",
        "./prettier.config.mjs",
      ],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};
