// @ts-check
// A script that cleans and builds the directory containing the Google Material
// Symbols Material UI icon React component modules.

import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";

/**
 * Directory to generate the Google Material Symbols Material UI icon React
 * component modules within.
 */
const iconComponentDir = new URL(
  // Must have a trailing `/`.
  import.meta.resolve("./icons/material-symbols/"),
);

// Clean the icon component directory.
await rm(iconComponentDir, {
  force: true,
  recursive: true,
});

// Create the icon component directory.
await mkdir(iconComponentDir, { recursive: true });

/**
 * Google Material Symbols icon weight for the generated Google Material Symbols
 * Material UI icon React components.
 * @see https://m3.material.io/styles/icons/applying-icons#d7f45762-67ac-473d-95b0-9214c791e242
 * @satisfies {100 | 200 | 300 | 400 | 500 | 600 | 700}
 */
const iconWeight = 300;

/**
 * Google Material Symbols icon style for the generated Google Material Symbols
 * Material UI icon React components.
 * @see https://m3.material.io/styles/icons/applying-icons#d7f45762-67ac-473d-95b0-9214c791e242
 * @satisfies {"outlined" | "rounded" | "sharp"}
 */
const iconStyle = "rounded";

/**
 * Google Material Symbols icon grade for the generated Google Material Symbols
 * Material UI icon React components. Only one value is supported by the
 * dependencies available for pre-generated SVG files.
 * @see https://m3.material.io/styles/icons/applying-icons#3ad55207-1cb0-43af-8092-fad2762f69f7
 */
const iconGrade = 0;

/**
 * Google Material Symbols icon optical size (in pixels) for the generated
 * Google Material Symbols Material UI icon React components. Only one value is
 * supported by the dependencies available for pre-generated SVG files.
 * @see https://m3.material.io/styles/icons/applying-icons#b41cbc01-9b49-4a44-a525-d153d1ea1425
 */
const iconOpticalSize = 24;

/**
 * Google Material Symbols icon path for the generated Google Material Symbols
 * Material UI icon React components.
 */
const iconPath = new URL(
  // Must have a trailing `/`.
  import.meta.resolve(`@material-symbols/svg-${iconWeight}/${iconStyle}/`),
);

for (const iconSvgFileName of await readdir(iconPath)) {
  /** Google Material Symbols icon name. */
  const iconName = iconSvgFileName.replace(/(?:-fill)?\.svg$/u, "");

  /** Does the Google Material Symbols icon have a fill variant? */
  const hasFillVariant = iconSvgFileName.endsWith("-fill.svg");

  /** Google Material Symbols icon SVG content */
  const svgContent = /^<svg [^>]+><path d="(?<iconPathData>[^"]+)"\/><\/svg>$/u.exec(
    await readFile(new URL(iconSvgFileName, iconPath), "utf8"),
  );

  if (!svgContent) {
    throw new Error(`Invalid SVG file: ${iconSvgFileName}`);
  }

  if (!svgContent.groups?.iconPathData) {
    throw new Error(`Unexpected SVG content for icon: ${iconName}`);
  }

  // Note that Material UI has a different approach to icon component naming:
  // https://github.com/mui/material-ui/blob/a1eec4f1bcb1f8e2baeafb4aaa83ce65b6d263d2/packages/mui-icons-material/renameFilters/material-design-icons.mjs

  // Note that Material UI publishes extra custom icons not from Google, mainly
  // for social media brands:
  // https://github.com/mui/material-ui/tree/a1eec4f1bcb1f8e2baeafb4aaa83ce65b6d263d2/packages/mui-icons-material/custom

  /** The Material UI icon React component name. */
  const materialUiIconComponentName =
    // This prefix prevents a leading number in the icon name from making the
    // component name an invalid Javascript identifier
    "MaterialSymbols" +
    // Convert the icon name from snake_case to PascalCase.
    iconName.replaceAll(
      /(?:^|_)(.)/gu,
      (_match, /** @type {string} */ group1) => group1.toUpperCase(),
    ) +
    (hasFillVariant ? "Fill" : "OutlineRounded");

  await writeFile(
    new URL(materialUiIconComponentName + ".mjs", iconComponentDir),
    `// @ts-check

import { createSvgIcon } from "@mui/material/utils";
import { jsx } from "react/jsx-runtime";

/**
 * React component implementing the Material UI component
 * [\`SvgIcon\`](https://mui.com/material-ui/api/svg-icon) for the Google
 * Material Symbols icon
 * [\`${iconName}\`, ${hasFillVariant ? "with" : "without"} fill, ${iconStyle}, weight ${iconWeight}, grade ${iconGrade}, optical size ${iconOpticalSize}px](https://fonts.google.com/icons?selected=Material+Symbols+${iconStyle.replace(/^./, (firstChar) => firstChar.toUpperCase())}:${iconName}:FILL@${hasFillVariant ? "1" : "0"};wght@${iconWeight};GRAD@${iconGrade};opsz@${iconOpticalSize}):
 *
 * ![Preview](data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 -960 960 960" style="background:white"><path d="${svgContent.groups.iconPathData}"/></svg>`)})
 */
const ${materialUiIconComponentName} = createSvgIcon(
  jsx("svg", {
    viewBox: "0 -960 960 960",
    fill: "currentColor",
    children: jsx("path", {
      d: "${svgContent.groups.iconPathData}",
    }),
  }),
  "${materialUiIconComponentName}",
);

export default ${materialUiIconComponentName};
`,
    "utf8",
  );
}

