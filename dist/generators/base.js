/**
 * Base Generator Class
 * 所有配置生成器的基类
 */
export class BaseGenerator {
    /**
     * 加载模板文件
     */
    loadTemplate(templateName) {
        // 模板加载逻辑将在实现时完成
        return `{{ template: ${templateName} }}`;
    }
}
//# sourceMappingURL=base.js.map