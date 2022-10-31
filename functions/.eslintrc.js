module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    // eslint-disable-next-line quote-props
    quotes: ["error", "double"],
    "linebreak-style": 0,
  },
};
