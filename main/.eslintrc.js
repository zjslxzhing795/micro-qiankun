module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/airbnb"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    quotes: "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-cycle": "off",
    "no-unused-expressions": "off",
    "operator-linebreak": "off",
    "no-underscore-dangle": "off",
    "comma-dangle": "off",
    "no-eval": "off",
    "import/prefer-default-export": "off",
  },
};
