import type { Linter } from "eslint";
import globals from "globals";

import baseConfig from "../../eslint.config.ts";

const config: Linter.Config[] = [
  ...baseConfig,
  {
    ignores: ["storybook-static/**"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        JSX: true,
        React: true,
      },
    },
    files: ["stories/**/*.tsx", ".storybook/**/*.ts"],
  },
];

export default config;
