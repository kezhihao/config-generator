/**
 * Base Generator Class
 * 所有配置生成器的基类
 */

import type { IGenerator, PromptOptions, PromptResult } from '../types.js';

export abstract class BaseGenerator implements IGenerator {
  /** 配置类型标识 */
  abstract readonly type: string;

  /** 显示名称 */
  abstract readonly displayName: string;

  /** 描述 */
  abstract readonly description: string;

  /**
   * 定义需要向用户询问的问题
   */
  abstract definePrompts(): PromptOptions[];

  /**
   * 生成配置文件内容
   */
  abstract generate(answers: PromptResult): string;

  /**
   * 验证生成的配置是否有效（可选）
   */
  validate?(config: string): boolean;

  /**
   * 加载模板文件
   */
  protected loadTemplate(templateName: string): string {
    // 模板加载逻辑将在实现时完成
    return `{{ template: ${templateName} }}`;
  }
}
