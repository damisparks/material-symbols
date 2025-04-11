# @damisparks/material-symbols

`@damisparks/material-symbols` includes the 2100+ [Material Symbols Rounded icons](https://fonts.google.com/icons?icon.set=Material+Symbols&icon.style=Rounded) from Google Fonts converted to [`SvgIcon`](https://mui.com/material-ui/api/svg-icon/) components for seamless integration with Material UI applications.

## Installation

To install in an existing Node.js, React, and Material UI project:

1. [Install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) versions according to the [_**Requirements**_](#requirements).
2. Install the `@damisparks/material-symbols` package using your preferred package manager. Using [pnpm](https://pnpm.io/):

    ```sh
    pnpm add @damisparks/material-symbols
    ```

## Usage

The package doesn't have a main index module, so use deep imports (using the file extension `.mjs`) from the ECMAScript modules that are exported via the [`package.json`](./package.json) field [`exports`](https://nodejs.org/api/packages.html#exports):

- `icons/material-symbols`: Modules each named `IconMaterialSymbols` + the [Google Material Symbols](https://fonts.google.com/icons) icon name in pascal case + `Fill` (optionally, if the icon has a fill variant) or `OutlineRounded` (optionally, if the icon has a rounded variant) + `.mjs`, default exporting a React component implementing the [Material UI](https://mui.com/material-ui) component [`SvgIcon`](https://mui.com/material-ui/api/svg-icon). Example:

  ```js
  import MaterialSymbolsIconKeyboardArrowDownOutlineRounded from "@damisparks/material-symbols/icons/material-symbols/MaterialSymbolsIconKeyboardArrowDownOutlineRounded.mjs";
  ```

## Requirements

Supported runtime environments:

- [Node.js](https://nodejs.org) versions `^18.18.0 || ^20.9.0 || >=22.0.0`.
- Browsers matching the [Browserslist](https://browsersl.ist) query [`> 0.5%, not OperaMini all, not dead`](https://browsersl.ist/#q=%3E+0.5%25%2C+not+OperaMini+all%2C+not+dead).

Supported TypeScript versions: v5+.

> [!WARNING]
> While this package has correct [ESM for Node.js and TypeScript](https://www.typescriptlang.org/docs/handbook/modules/theory.html#module-format-detection), the [Material UI dependencies don’t](https://github.com/mui/material-ui/issues/30671). Until this is fixed upstream, instead of the correct TypeScript config of [`compilerOptions.module`](https://www.typescriptlang.org/tsconfig#module) set to [`"nodenext"`](https://www.typescriptlang.org/docs/handbook/modules/reference.html#node16-nodenext), projects must set [`"preserve"`](https://www.typescriptlang.org/docs/handbook/modules/reference.html#preserve), and must use a bundler (e.g. [esbuild](https://esbuild.github.io) or [webpack](https://webpack.js.org)) to consume this package as Node.js and browsers can’t run it directly. Bundlers have to be specially configured to be able to resolve the non standard ESM dependencies.

## Scripts

These CLI scripts are used to install, build, serve, and quality check the project.

### Install script

To install dependencies:

```sh
pnpm install
```

### Prepare script

To prepare build artifacts so the repo can be used as an installed package:

```sh
pnpm prepare
```


This [npm life cycle script](https://docs.npmjs.com/cli/v10/using-npm/scripts#life-cycle-scripts) is automatically used by the npm CLI in certain situations and isn’t for manual use (instead see [**_Build script_**](#build-script)). It allows the `@damisparks/material-symbols` package to be installed in a project via a [Git repo URL](https://docs.npmjs.com/cli/v10/using-npm/package-spec#git-urls); useful for testing forks or PR branches.

### Build script

To build the project:

```sh
pnpm build
```
### Check script

To check the project for linting errors and formatting issues:

```sh
pnpm check
```

### ESLint script

To run ESLint:

```sh
pnpm lint
```

### Type check script

To type check the project:

```sh
pnpm typecheck
```
