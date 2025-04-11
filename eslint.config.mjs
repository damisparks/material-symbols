// @ts-check

import eslintJavascript from "@eslint/js";
import eslintPluginCommentLength from "eslint-plugin-comment-length";
import eslintPluginImportX from "eslint-plugin-import-x";
import eslintPluginJsdoc from "eslint-plugin-jsdoc";
import eslintPluginOptimalModules from "eslint-plugin-optimal-modules";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import eslintTypescript from "typescript-eslint";

export default eslintTypescript.config(
  {
    ignores: ["icons"],
  },
  {
    files: ["**/*.{mjs,cjs,js}"],
    extends: [
      eslintJavascript.configs.recommended,
      ...eslintTypescript.configs.strictTypeChecked,
      ...eslintTypescript.configs.stylisticTypeChecked,
      eslintPluginOptimalModules.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: "./jsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "comment-length": eslintPluginCommentLength,
      ["import-x"]: eslintPluginImportX,
      "simple-import-sort": eslintPluginSimpleImportSort,
    },
    rules: {
      // ESLint rules.
      "arrow-body-style": "error",
      "object-shorthand": "error",
      strict: "error",
      "@typescript-eslint/array-type": ["error", { default: "generic" }],
      "@typescript-eslint/consistent-indexed-object-style": [
        "error",
        "index-signature",
      ],
      // This rule makes unsafe suggestions that break intended logic.
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      // The TypeScript plugin strict config doesn’t allow numbers in template
      // literal expressions, but it’s safe and common practice.
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowAny: false,
          allowBoolean: false,
          allowNullish: false,
          allowNumber: true,
          allowRegExp: false,
          allowNever: false,
        },
      ],

      "comment-length/limit-multi-line-comments": "error",
      "comment-length/limit-single-line-comments": "error",

      "import-x/no-anonymous-default-export": "error",

      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    files: ["**/*.{mjs,cjs,js}"],
    extends: [
      eslintPluginJsdoc.configs["flat/recommended-typescript-flavor-error"],
    ],
  },
  {
    files: ["**/*.mjs"],
    rules: {
      "no-restricted-globals": [
        "error",
        ...["__dirname", "__filename", "exports", "module", "require"].map(
          (name) => ({
            name,
            message: "CJS global undefined in ESM.",
          }),
        ),
      ],
    },
  },
  {
    files: ["**/*.{cjs,js}"],
    languageOptions: {
      // This is only necessary to configure for CJS files, because the ESLint
      // default is `"module"` and `"script"` isn’t relevant in this project.
      sourceType: "commonjs",
    },
    rules: {
      // Override the TypeScript ESLint config forbidding `require` calls; it
      // incorrectly assumes all files are TypeScript modules using only
      // `import` syntax.
      "@typescript-eslint/no-require-imports": "off",

      "no-restricted-syntax": [
        "error",
        {
          selector: "ImportDeclaration",
          message:
            "Import declaration disallowed in CJS; use a `require` call.",
        },
        {
          selector: "ExportDefaultDeclaration, ExportNamedDeclaration",
          message:
            "Export declaration disallowed in CJS; use `module.exports`.",
        },
        {
          selector: "MetaProperty[meta.name='import']",
          message: "Meta-property `import.meta` disallowed in CJS.",
        },
      ],
    },
  },
);
