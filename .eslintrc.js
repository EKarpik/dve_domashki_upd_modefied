module.exports = {
  env: {
    es2021: true,
    node: true
  },
  plugins: ['jest'],
  extends: ['standard', 'plugin:jest/recommended', 'prettier'],
  overrides: [
    {
      files: ['specs/**'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      rules: {}
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {}
}
