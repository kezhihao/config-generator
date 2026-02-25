/**
 * Prettier Config Generator
 * 生成 Prettier 格式化配置
 */
import { BaseGenerator } from './base.js';
import type { PromptOptions, PromptResult } from '../types.js';
export declare class PrettierGenerator extends BaseGenerator {
    readonly type = "prettier";
    readonly displayName = "Prettier Config";
    readonly description = "Prettier \u4EE3\u7801\u683C\u5F0F\u5316\u914D\u7F6E";
    definePrompts(): PromptOptions[];
    generate(answers: PromptResult): string;
    validate(config: string): boolean;
}
//# sourceMappingURL=prettier.d.ts.map