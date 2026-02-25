/**
 * Config-Generator Type Definitions
 */

/** 项目类型检测结果 */
export interface DetectionResult {
  projectType: ProjectType;
  hasTypeScript: boolean;
  hasTests: boolean;
  hasCI: boolean;
  recommendedConfigs: string[];
}

/** 支持的项目类型 */
export type ProjectType = 'nodejs' | 'python' | 'go' | 'rust' | 'unknown';

/** 问题选项类型 */
export type PromptType = 'select' | 'input' | 'confirm' | 'multiselect';

/** 单个问题配置 */
export interface PromptOptions {
  type: PromptType;
  message: string;
  choices?: PromptChoice[];
  default?: any;
}

/** 问题选项 */
export interface PromptChoice {
  title: string;
  value: string;
  description?: string;
}

/** 用户回答结果 */
export type PromptResult = Record<string, any>;

/** 生成器配置 */
export interface GeneratorConfig {
  type: string;
  answers: PromptResult;
  options: GenerationOptions;
}

/** 生成选项 */
export interface GenerationOptions {
  output?: string;
  force?: boolean;
  dryRun?: boolean;
  defaults?: boolean;
}

/** 生成器基类接口 */
export interface IGenerator {
  readonly type: string;
  readonly displayName: string;
  readonly description: string;
  definePrompts(): PromptOptions[];
  generate(answers: PromptResult): string;
  validate?(config: string): boolean;
}

/** 模板上下文 */
export type TemplateContext = Record<string, any>;
