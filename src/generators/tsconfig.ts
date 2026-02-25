/**
 * TypeScript Config Generator
 * 生成 tsconfig.json 配置
 */

import { BaseGenerator } from './base.js';
import type { PromptOptions, PromptResult } from '../types.js';

export class TsConfigGenerator extends BaseGenerator {
  readonly type = 'tsconfig';
  readonly displayName = 'TypeScript Config';
  readonly description = 'TypeScript 编译器配置';

  definePrompts(): PromptOptions[] {
    return [
      {
        type: 'select',
        message: '项目类型？',
        choices: [
          { title: 'Node.js (CommonJS)', value: 'node-cjs' },
          { title: 'Node.js (ESM)', value: 'node-esm' },
          { title: 'React/Vue (Vite)', value: 'vite' },
          { title: 'React (Create React App)', value: 'cra' },
          { title: 'Next.js', value: 'nextjs' },
          { title: 'Library', value: 'library' }
        ],
        default: 'node-esm'
      },
      {
        type: 'confirm',
        message: '启用严格模式？',
        default: true
      },
      {
        type: 'input',
        message: '源码目录？',
        default: 'src'
      },
      {
        type: 'input',
        message: '输出目录？',
        default: 'dist'
      }
    ];
  }

  generate(answers: PromptResult): string {
    const projectType = answers.projectType || 'node-esm';
    const strict = answers.strict !== false;
    const outDir = answers.outDir || 'dist';
    const rootDir = answers.rootDir || 'src';

    // 使用 Record 类型允许动态属性
    const compilerOptions: Record<string, any> = {
      target: 'ES2022',
      module: 'ESNext',
      lib: ['ES2022'],
      outDir,
      rootDir,
      strict,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      resolveJsonModule: true,
      moduleResolution: 'node',
      allowSyntheticDefaultImports: true
    };

    // 根据项目类型调整配置
    switch (projectType) {
      case 'node-cjs':
        compilerOptions.module = 'CommonJS';
        compilerOptions.moduleResolution = 'node';
        break;
      case 'node-esm':
        compilerOptions.module = 'ESNext';
        compilerOptions.moduleResolution = 'node';
        break;
      case 'vite':
        compilerOptions.moduleResolution = 'bundler';
        compilerOptions.jsx = 'react-jsx';
        compilerOptions.types = ['vite/client'];
        break;
      case 'cra':
        compilerOptions.jsx = 'react-jsx';
        compilerOptions.lib = ['ES2022', 'DOM', 'DOM.Iterable'];
        compilerOptions.moduleResolution = 'node';
        compilerOptions.allowJs = true;
        break;
      case 'nextjs':
        compilerOptions.jsx = 'preserve';
        compilerOptions.plugins = [{ name: 'next' }];
        compilerOptions.incremental = true;
        break;
      case 'library':
        compilerOptions.declaration = true;
        compilerOptions.declarationMap = true;
        compilerOptions.sourceMap = true;
        break;
    }

    const baseConfig = {
      compilerOptions,
      include: [`${rootDir}/**/*`],
      exclude: ['node_modules', 'dist']
    };

    return JSON.stringify(baseConfig, null, 2);
  }

  validate(config: string): boolean {
    try {
      const parsed = JSON.parse(config);
      return parsed.compilerOptions !== undefined;
    } catch {
      return false;
    }
  }
}
