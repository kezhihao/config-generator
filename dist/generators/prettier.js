/**
 * Prettier Config Generator
 * 生成 Prettier 格式化配置
 */
import { BaseGenerator } from './base.js';
export class PrettierGenerator extends BaseGenerator {
    type = 'prettier';
    displayName = 'Prettier Config';
    description = 'Prettier 代码格式化配置';
    definePrompts() {
        return [
            {
                type: 'select',
                message: '缩进风格？',
                choices: [
                    { title: '2 空格', value: '2' },
                    { title: '4 空格', value: '4' },
                    { title: 'Tab', value: 'tab' }
                ],
                default: '2'
            },
            {
                type: 'select',
                message: '引号风格？',
                choices: [
                    { title: '单引号', value: 'single' },
                    { title: '双引号', value: 'double' }
                ],
                default: 'single'
            },
            {
                type: 'confirm',
                message: '行尾分号？',
                default: true
            },
            {
                type: 'confirm',
                message: '尾随逗号？',
                default: true
            }
        ];
    }
    generate(answers) {
        const tabWidth = answers.tabWidth || '2';
        const useTabs = tabWidth === 'tab';
        const singleQuote = answers.quoteStyle === 'single';
        const semi = answers.semi !== false;
        const trailingComma = answers.trailingComma !== false;
        const config = {
            printWidth: 100,
            tabWidth: useTabs ? 2 : parseInt(tabWidth),
            useTabs,
            singleQuote,
            semi,
            trailingComma: trailingComma ? 'es5' : 'none',
            bracketSpacing: true,
            arrowParens: 'always',
            endOfLine: 'lf'
        };
        return JSON.stringify(config, null, 2);
    }
    validate(config) {
        try {
            JSON.parse(config);
            return true;
        }
        catch {
            return false;
        }
    }
}
//# sourceMappingURL=prettier.js.map