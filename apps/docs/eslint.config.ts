import type { Linter } from "eslint";
import globals from "globals";

import baseConfig from "../../eslint.config.ts";

const config: Linter.Config[] = [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        JSX: true,
        React: true,
      },
    },
    files: ["stories/**/*.tsx", ".storybook/**/*.ts"],
    ignores: ["node_modules/**", "storybook-static/**"],
  },
];

export default config;
