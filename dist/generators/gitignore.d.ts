/**
 * .gitignore Generator
 * 生成 Git 忽略文件配置
 */
import { BaseGenerator } from './base.js';
import type { PromptOptions, PromptResult } from '../types.js';
export declare class GitignoreGenerator extends BaseGenerator {
    readonly type = "gitignore";
    readonly displayName = ".gitignore";
    readonly description = "Git \u5FFD\u7565\u6587\u4EF6\u914D\u7F6E";
    definePrompts(): PromptOptions[];
    generate(answers: PromptResult): string;
    validate(config: string): boolean;
}
//# sourceMappingURL=gitignore.d.ts.map