module.exports = {
  "customSyntax": "postcss-html",
  "extends": ["stylelint-config-standard-scss"],
  "plugins": ["stylelint-scss"],
  // 可以自定义一些校验规则->识别deep语法
  "rules": {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep']
      }
    ],
    "declaration-block-trailing-semicolon": null,
  },
  "ignoreFiles": ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
}