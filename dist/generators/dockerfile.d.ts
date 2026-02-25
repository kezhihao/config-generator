/**
 * Dockerfile Generator
 * 生成多阶段优化的 Dockerfile
 */
import { BaseGenerator } from './base.js';
import type { PromptOptions, PromptResult } from '../types.js';
export declare class DockerfileGenerator extends BaseGenerator {
    readonly type = "dockerfile";
    readonly displayName = "Dockerfile";
    readonly description = "\u591A\u9636\u6BB5\u4F18\u5316\u7684 Docker \u955C\u50CF\u914D\u7F6E";
    definePrompts(): PromptOptions[];
    generate(answers: PromptResult): string;
    private generateNodeJS;
    private generatePython;
    private generateGo;
    private generateRust;
    validate(config: string): boolean;
}
//# sourceMappingURL=dockerfile.d.ts.map