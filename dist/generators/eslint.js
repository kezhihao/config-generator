/**
 * ESLint Config Generator
 * 生成 ESLint 配置
 */
import { BaseGenerator } from './base.js';
export class ESLintGenerator extends BaseGenerator {
    type = 'eslint';
    displayName = 'ESLint Config';
    description = 'ESLint 代码规范配置';
    definePrompts() {
        return [
            {
                type: 'select',
                message: '项目类型？',
                choices: [
                    { title: 'JavaScript + React', value: 'react' },
                    { title: 'JavaScript + Vue', value: 'vue' },
                    { title: 'JavaScript + TypeScript', value: 'typescript' },
                    { title: 'TypeScript + React', value: 'ts-react' },
                    { title: 'TypeScript + Vue', value: 'ts-vue' },
                    { title: 'Node.js', value: 'nodejs' },
                    { title: '纯 JavaScript', value: 'javascript' }
                ],
                default: 'typescript'
            },
            {
                type: 'select',
                message: '代码风格？',
                choices: [
                    { title: 'Standard', value: 'standard' },
                    { title: 'Airbnb', value: 'airbnb' },
                    { title: '推荐配置', value: 'recommended' }
                ],
                default: 'recommended'
            }
        ];
    }
    generate(answers) {
        const projectType = answers.projectType || 'typescript';
        const style = answers.style || 'recommended';
        const config = {
            env: {
                browser: true,
                es2022: true,
                node: true
            },
            extends: [],
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module'
            }
        };
        // 基础扩展
        if (style === 'recommended') {
            config.extends.push('eslint:recommended');
        }
        // 根据项目类型配置
        switch (projectType) {
            case 'react':
                config.extends.push('plugin:react/recommended', 'plugin:react-hooks/recommended');
                config.parserOptions = { ...config.parserOptions, ecmaFeatures: { jsx: true } };
                config.plugins = ['react', 'react-hooks'];
                config.settings = { react: { version: 'detect' } };
                break;
            case 'vue':
                config.extends.push('plugin:vue/vue3-recommended');
                config.plugins = ['vue'];
                break;
            case 'typescript':
            case 'ts-react':
            case 'ts-vue':
                config.extends.push('plugin:@typescript-eslint/recommended');
                config.parser = '@typescript-eslint/parser';
                config.plugins = ['@typescript-eslint'];
                if (projectType === 'ts-react') {
                    config.extends.push('plugin:react/recommended', 'plugin:react-hooks/recommended');
                    config.parserOptions = { ...config.parserOptions, ecmaFeatures: { jsx: true } };
                    config.plugins.push('react', 'react-hooks');
                }
                if (projectType === 'ts-vue') {
                    config.extends.push('plugin:vue/vue3-recommended');
                    config.plugins.push('vue');
                }
                break;
            case 'nodejs':
                config.env.node = true;
                config.extends.push('plugin:n/recommended');
                break;
        }
        return `module.exports = ${JSON.stringify(config, null, 2)};`;
    }
    validate(config) {
        return config.includes('module.exports') || config.includes('export default');
    }
}
//# sourceMappingURL=eslint.js.map