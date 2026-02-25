/**
 * Simple Template Engine
 * 轻量级模板引擎，支持变量替换和简单的条件/循环
 */
export class TemplateEngine {
    cache = new Map();
    /**
     * 渲染模板字符串
     */
    render(template, context) {
        let result = template;
        // 1. 变量替换 {{variable}}
        result = result.replace(/\{\{(\w+)\}\}/g, (_, key) => {
            return context[key]?.toString() || '';
        });
        // 2. 条件渲染 {{#if condition}}...{{/if}}
        result = result.replace(/\{\{#if\s+(\w+)\}\}(.*?)\{\{\/if\}\}/gs, (_, condition, content) => {
            return context[condition] ? content : '';
        });
        // 3. 循环渲染 {{#each items}}...{{/each}}
        result = result.replace(/\{\{#each\s+(\w+)\}\}(.*?)\{\{\/each\}\}/gs, (_, key, template) => {
            const items = context[key];
            if (!Array.isArray(items))
                return '';
            return items.map(item => this.render(template, item)).join('');
        });
        return result;
    }
    /**
     * 从文件渲染模板
     */
    renderFile(templatePath, context) {
        const template = this.loadTemplate(templatePath);
        return this.render(template, context);
    }
    /**
     * 加载模板（带缓存）
     */
    loadTemplate(path) {
        if (this.cache.has(path)) {
            return this.cache.get(path);
        }
        // 文件读取逻辑将在实现时完成
        const content = `{{ template from ${path} }}`;
        this.cache.set(path, content);
        return content;
    }
    /**
     * 清除缓存
     */
    clearCache() {
        this.cache.clear();
    }
}
//# sourceMappingURL=template-engine.js.map