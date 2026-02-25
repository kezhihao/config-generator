/**
 * Generator Registry
 * 管理所有配置生成器
 */
import { DockerfileGenerator } from './dockerfile.js';
/**
 * 生成器注册表
 */
class GeneratorRegistry {
    generators = new Map();
    /**
     * 注册生成器
     */
    register(type, generator) {
        this.generators.set(type, generator);
    }
    /**
     * 获取生成器
     */
    get(type) {
        return this.generators.get(type);
    }
    /**
     * 获取所有生成器
     */
    getAll() {
        return Array.from(this.generators.values());
    }
    /**
     * 获取所有可用的配置类型
     */
    getAvailableTypes() {
        return Array.from(this.generators.keys());
    }
    /**
     * 检查类型是否存在
     */
    has(type) {
        return this.generators.has(type);
    }
}
/**
 * 创建并初始化注册表
 */
export function createRegistry() {
    const registry = new GeneratorRegistry();
    // 注册所有生成器
    registry.register('dockerfile', new DockerfileGenerator());
    // TODO: 添加更多生成器
    // registry.register('tsconfig', new TsConfigGenerator());
    // registry.register('eslint', new ESLintGenerator());
    // registry.register('prettier', new PrettierGenerator());
    // registry.register('github-actions', new GitHubActionsGenerator());
    return registry;
}
export { GeneratorRegistry };
//# sourceMappingURL=index.js.map