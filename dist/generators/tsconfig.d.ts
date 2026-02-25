/**
 * TypeScript Config Generator
 * 生成 tsconfig.json 配置
 */
import { BaseGenerator } from './base.js';
import type { PromptOptions, PromptResult } from '../types.js';
export declare class TsConfigGenerator extends BaseGenerator {
    readonly type = "tsconfig";
    readonly displayName = "TypeScript Config";
    readonly description = "TypeScript \u7F16\u8BD1\u5668\u914D\u7F6E";
    definePrompts(): PromptOptions[];
    generate(answers: PromptResult): string;
    validate(config: string): boolean;
}
//# sourceMappingURL=tsconfig.d.ts.map