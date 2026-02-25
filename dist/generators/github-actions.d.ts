/**
 * GitHub Actions Generator
 * 生成 CI/CD 工作流配置
 */
import { BaseGenerator } from './base.js';
import type { PromptOptions, PromptResult } from '../types.js';
export declare class GitHubActionsGenerator extends BaseGenerator {
    readonly type = "github-actions";
    readonly displayName = "GitHub Actions CI/CD";
    readonly description = "GitHub Actions \u6301\u7EED\u96C6\u6210\u914D\u7F6E";
    definePrompts(): PromptOptions[];
    generate(answers: PromptResult): string;
    private toYaml;
    validate(config: string): boolean;
}
//# sourceMappingURL=github-actions.d.ts.map