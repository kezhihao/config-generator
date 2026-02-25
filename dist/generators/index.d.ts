/**
 * Generator Registry
 * 管理所有配置生成器
 */
import type { IGenerator } from '../types.js';
/**
 * 生成器注册表
 */
declare class GeneratorRegistry {
    private generators;
    /**
     * 注册生成器
     */
    register(type: string, generator: IGenerator): void;
    /**
     * 获取生成器
     */
    get(type: string): IGenerator | undefined;
    /**
     * 获取所有生成器
     */
    getAll(): IGenerator[];
    /**
     * 获取所有可用的配置类型
     */
    getAvailableTypes(): string[];
    /**
     * 检查类型是否存在
     */
    has(type: string): boolean;
}
/**
 * 创建并初始化注册表
 */
export declare function createRegistry(): GeneratorRegistry;
export { GeneratorRegistry };
//# sourceMappingURL=index.d.ts.map