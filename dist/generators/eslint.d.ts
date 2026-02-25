/**
 * ESLint Config Generator
 * 生成 ESLint 配置
 */
import { BaseGenerator } from './base.js';
import type { PromptOptions, PromptResult } from '../types.js';
export declare class ESLintGenerator extends BaseGenerator {
    readonly type = "eslint";
    readonly displayName = "ESLint Config";
    readonly description = "ESLint \u4EE3\u7801\u89C4\u8303\u914D\u7F6E";
    definePrompts(): PromptOptions[];
    generate(answers: PromptResult): string;
    validate(config: string): boolean;
}
//# sourceMappingURL=eslint.d.ts.map