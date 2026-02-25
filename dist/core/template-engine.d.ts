/**
 * Simple Template Engine
 * 轻量级模板引擎，支持变量替换和简单的条件/循环
 */
import type { TemplateContext } from '../types.js';
export declare class TemplateEngine {
    private cache;
    /**
     * 渲染模板字符串
     */
    render(template: string, context: TemplateContext): string;
    /**
     * 从文件渲染模板
     */
    renderFile(templatePath: string, context: TemplateContext): string;
    /**
     * 加载模板（带缓存）
     */
    private loadTemplate;
    /**
     * 清除缓存
     */
    clearCache(): void;
}
//# sourceMappingURL=template-engine.d.ts.map