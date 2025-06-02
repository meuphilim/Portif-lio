const { ESLint } = require("eslint")

module.exports = {
  extends: ["next/core-web-vitals", "prettier"],
  rules: {
    "no-console": "warn",
    "no-unused-vars": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "prefer-const": "error",
    "no-var": "error",
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
}
