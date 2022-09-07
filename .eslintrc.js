module.exports = {
  root: true,
  //运行环境
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',//解析器
  //解析器选项
  parserOptions: {
    //ESLint的parser基于Acorn实现，不能直接解析TypeScript
    //需要我们指定parser选项为@typescript-eslint/parser才能兼容TS的解析
    parser: '@typescript-eslint/parser'
  },
  //ESLint本身也没有内置TypeScript的代码规则，需要使用插件来增加规则
  //添加TS规则
  plugins: ['@typescript-eslint', 'prettier'],
  //继承配置
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    //接入prettier的规则
    'prettier',
    'plugin:prettier/recommended'
  ],
  // 可以自定义一些校验规则
  rules: {},
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off'
      }
    }
  ]
};
