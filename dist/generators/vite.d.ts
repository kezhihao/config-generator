/**
 * Vite Config Generator
 * 生成 Vite 构建配置
 */
import { BaseGenerator } from './base.js';
import type { PromptOptions, PromptResult } from '../types.js';
export declare class ViteGenerator extends BaseGenerator {
    readonly type = "vite";
    readonly displayName = "Vite Config";
    readonly description = "Vite \u5FEB\u901F\u6784\u5EFA\u914D\u7F6E";
    definePrompts(): PromptOptions[];
    generate(answers: PromptResult): string;
    validate(config: string): boolean;
}
//# sourceMappingURL=vite.d.ts.map