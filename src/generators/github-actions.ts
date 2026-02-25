/**
 * GitHub Actions Generator
 * 生成 CI/CD 工作流配置
 */

import { BaseGenerator } from './base.js';
import type { PromptOptions, PromptResult } from '../types.js';

export class GitHubActionsGenerator extends BaseGenerator {
  readonly type = 'github-actions';
  readonly displayName = 'GitHub Actions CI/CD';
  readonly description = 'GitHub Actions 持续集成配置';

  definePrompts(): PromptOptions[] {
    return [
      {
        type: 'select',
        message: '项目类型？',
        choices: [
          { title: 'Node.js', value: 'nodejs' },
          { title: 'Python', value: 'python' },
          { title: 'Go', value: 'go' },
          { title: 'Rust', value: 'rust' },
          { title: 'Docker', value: 'docker' }
        ],
        default: 'nodejs'
      },
      {
        type: 'multiselect',
        message: '要执行的任务？',
        choices: [
          { title: '测试', value: 'test' },
          { title: '构建', value: 'build' },
          { title: '部署', value: 'deploy' },
          { title: '代码检查', value: 'lint' }
        ],
        default: ['test', 'lint']
      }
    ];
  }

  generate(answers: PromptResult): string {
    const projectType = answers.projectType || 'nodejs';
    const tasks = answers.tasks || ['test', 'lint'];

    const workflow: any = {
      name: 'CI',
      on: {
        push: { branches: ['main', 'develop'] },
        pull_request: { branches: ['main', 'develop'] }
      },
      jobs: {
        ci: {
          'runs-on': 'ubuntu-latest',
          steps: [
            { uses: 'actions/checkout@v4' }
          ]
        }
      }
    };

    // 根据项目类型配置
    const setupStep = { name: 'Setup', run: '' };

    switch (projectType) {
      case 'nodejs':
        workflow.jobs.ci.steps.push(
          { uses: 'actions/setup-node@v4', with: { 'node-version': '20', cache: 'npm' } },
          { name: 'Install dependencies', run: 'npm ci' }
        );
        if (tasks.includes('lint')) {
          workflow.jobs.ci.steps.push({ name: 'Lint', run: 'npm run lint' });
        }
        if (tasks.includes('test')) {
          workflow.jobs.ci.steps.push({ name: 'Test', run: 'npm test' });
        }
        if (tasks.includes('build')) {
          workflow.jobs.ci.steps.push({ name: 'Build', run: 'npm run build' });
        }
        break;

      case 'python':
        workflow.jobs.ci.steps.push(
          { uses: 'actions/setup-python@v5', with: { 'python-version': '3.11' } },
          { name: 'Install dependencies', run: 'pip install -r requirements.txt' }
        );
        if (tasks.includes('lint')) {
          workflow.jobs.ci.steps.push({ name: 'Lint', run: 'flake8 .' });
        }
        if (tasks.includes('test')) {
          workflow.jobs.ci.steps.push({ name: 'Test', run: 'pytest' });
        }
        break;

      case 'go':
        workflow.jobs.ci.steps.push(
          { uses: 'actions/setup-go@v5', with: { 'go-version': '1.21' } },
          { name: 'Install dependencies', run: 'go mod download' }
        );
        if (tasks.includes('test')) {
          workflow.jobs.ci.steps.push({ name: 'Test', run: 'go test -v ./...' });
        }
        if (tasks.includes('build')) {
          workflow.jobs.ci.steps.push({ name: 'Build', run: 'go build -v .' });
        }
        break;

      case 'rust':
        workflow.jobs.ci.steps.push(
          { uses: 'actions-rs/toolchain@v1', with: { toolchain: 'stable', override: true } }
        );
        if (tasks.includes('test')) {
          workflow.jobs.ci.steps.push({ uses: 'actions-rs/cargo@v1', with: { command: 'test' } });
        }
        if (tasks.includes('build')) {
          workflow.jobs.ci.steps.push({ uses: 'actions-rs/cargo@v1', with: { command: 'build' } });
        }
        break;

      case 'docker':
        workflow.jobs.ci.steps.push(
          { name: 'Set up Docker Buildx', uses: 'docker/setup-buildx-action@v3' },
          { name: 'Build', run: 'docker build -t myapp .' }
        );
        break;
    }

    // 将 YAML 对象转换为字符串
    return this.toYaml(workflow);
  }

  private toYaml(obj: any, indent = 0): string {
    const spaces = '  '.repeat(indent);
    let result = '';

    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        result += `${spaces}${key}:\n`;
        for (const item of value) {
          if (typeof item === 'object') {
            result += `${spaces}- ${this.toYaml(item, indent + 1).trim()}\n`;
          } else {
            result += `${spaces}- ${item}\n`;
          }
        }
      } else if (typeof value === 'object' && value !== null) {
        result += `${spaces}${key}:\n${this.toYaml(value, indent + 1)}`;
      } else {
        result += `${spaces}${key}: ${value}\n`;
      }
    }

    return result;
  }

  validate(config: string): boolean {
    return config.includes('on:') && config.includes('jobs:');
  }
}
