module.exports = {
  root: true,
  ignorePatterns: ["dist/**", "node_modules/**"],
  env: {
    node: true,
    es2022: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
};
