/**
 * Jest Config Generator
 * 生成 Jest 测试配置
 */
import { BaseGenerator } from './base.js';
import type { PromptOptions, PromptResult } from '../types.js';
export declare class JestGenerator extends BaseGenerator {
    readonly type = "jest";
    readonly displayName = "Jest Config";
    readonly description = "Jest \u6D4B\u8BD5\u6846\u67B6\u914D\u7F6E";
    definePrompts(): PromptOptions[];
    generate(answers: PromptResult): string;
    validate(config: string): boolean;
}
//# sourceMappingURL=jest.d.ts.map