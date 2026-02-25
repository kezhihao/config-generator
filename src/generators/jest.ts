/**
 * Jest Config Generator
 * 生成 Jest 测试配置
 */

import { BaseGenerator } from './base.js';
import type { PromptOptions, PromptResult } from '../types.js';

export class JestGenerator extends BaseGenerator {
  readonly type = 'jest';
  readonly displayName = 'Jest Config';
  readonly description = 'Jest 测试框架配置';

  definePrompts(): PromptOptions[] {
    return [
      {
        type: 'select',
        message: '项目类型？',
        choices: [
          { title: 'JavaScript', value: 'js' },
          { title: 'TypeScript', value: 'ts' },
          { title: 'React', value: 'react' },
          { title: 'Vue', value: 'vue' },
          { title: 'Next.js', value: 'nextjs' }
        ],
        default: 'ts'
      },
      {
        type: 'input',
        message: '测试文件模式？',
        default: '**/*.test.{js,ts}'
      }
    ];
  }

  generate(answers: PromptResult): string {
    const projectType = answers.projectType || 'ts';
    const testMatch = answers.testMatch || '**/*.test.{js,ts}';

    const config: any = {
      preset: undefined,
      testEnvironment: 'node',
      testMatch: [testMatch],
      collectCoverageFrom: [
        'src/**/*.{js,ts,jsx,tsx}',
        '!src/**/*.d.ts',
        '!src/**/*.test.{js,ts,jsx,tsx}',
        '!src/**/__tests__/**'
      ],
      coverageThreshold: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70
        }
      }
    };

    // 根据项目类型配置
    switch (projectType) {
      case 'ts':
        config.preset = 'ts-jest';
        config.testMatch = ['**/*.test.ts'];
        break;
      case 'react':
        config.preset = 'ts-jest';
        config.testEnvironment = 'jsdom';
        config.testMatch = ['**/*.test.{ts,tsx}'];
        config.moduleNameMapper = {
          '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
        };
        config.setupFilesAfterEnv = ['<rootDir>/src/setupTests.ts'];
        break;
      case 'vue':
        config.preset = 'ts-jest';
        config.testEnvironment = 'jsdom';
        config.transform = {
          '^.+\\.vue$': '@vue/vue3-jest',
          '^.+\\.(ts|tsx)$': 'ts-jest'
        };
        config.moduleFileExtensions = ['ts', 'tsx', 'js', 'jsx', 'json', 'vue'];
        break;
      case 'nextjs':
        config.preset = 'ts-jest';
        config.testEnvironment = 'jsdom';
        config.testMatch = ['**/*.test.{ts,tsx}'];
        config.moduleNameMapper = {
          '^@/(.*)$': '<rootDir>/src/$1'
        };
        config.setupFilesAfterEnv = ['<rootDir>/jest.setup.js'];
        break;
      case 'js':
      default:
        config.testMatch = ['**/*.test.js'];
        break;
    }

    return `module.exports = ${JSON.stringify(config, null, 2)};`;
  }

  validate(config: string): boolean {
    return config.includes('module.exports') || config.includes('testMatch');
  }
}
