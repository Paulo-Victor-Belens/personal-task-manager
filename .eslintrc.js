module.exports = {
  root: true,
  env: {
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jest/recommended",
    "plugin:jest-dom/recommended",
    "plugin:prettier/recommended",
    "eslint-config-google",
  ],
  rules: {
    "no-console": 0,
    "react/display-name": 0,
  },
};