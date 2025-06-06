module.exports = {
    // parser 代码解析依赖
    parser: 'vue-eslint-parser',

    parserOptions: {
        // 替换原有的代码解析器
        parser: '@typescript-eslint/parser',
        // 声明 es 版本
        ecmaVersion: 2020,
        // 声明源码类型
        sourceType: 'module',
        // 其他语言扩展，包含jsx，全局严格模式等
        ecmaFeatures: {
            jsx: true,
        },
    },

    // 继承插件的规则配置
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended',
        './.eslintrc-auto-import.json',
    ],

    // 自定义规则配置
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'vue/no-v-html': 'off',
        'vue/multi-word-component-names': 'off', // 禁用 multi-word-component-names 规则
        'vue/attribute-hyphenation': ['warn', 'never'], // 禁用属性自动转换为短横线命名
        // 关掉 ESLint 自带的缩进检查，让 prettier/prettier 规则来管
        indent: 'off',
        'vue/html-indent': 'off',
        'prettier/prettier': [
            'warn',
            {
                singleQuote: true, // 使用单引号 ' 替代双引号 " 作为字符串的定界符。
                semi: true, // 每行语句的结尾都加上分号。
                tabWidth: 4,
                useTabs: false,
            },
        ],
    },
};
