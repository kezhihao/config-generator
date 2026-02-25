#!/usr/bin/env node
/**
 * Config-Generator CLI
 * 配置文件生成命令行工具
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { createRegistry } from './generators/index.js';
import { ProjectDetector } from './core/detector.js';

const program = new Command();

program
  .name('config-gen')
  .description('配置文件生成器 - 30秒生成正确的配置')
  .version('1.0.0');

program
  .argument('[config-type]', '配置类型 (如: dockerfile, tsconfig)')
  .option('-d, --defaults', '使用默认值，跳过问答')
  .option('-o, --output <path>', '输出文件路径')
  .option('--no-detect', '跳过项目检测')
  .option('-f, --force', '覆盖已存在的文件')
  .option('--dry-run', '预览，不实际写入')
  .action(async (configType, options) => {
    try {
      const registry = createRegistry();

      // 显示欢迎信息
      console.log(chalk.cyan.bold('🚀 Config-Generator v1.0.0\n'));

      // 项目检测
      if (!options.noDetect && !configType) {
        const detector = new ProjectDetector();
        const result = await detector.detect();

        if (result.projectType !== 'unknown') {
          console.log(chalk.yellow(`🔍 检测到 ${result.projectType} 项目`));
          if (result.recommendedConfigs.length > 0) {
            console.log(chalk.gray(`推荐配置: ${result.recommendedConfigs.join(', ')}\n`));
          }
        }
      }

      // 列出所有可用配置
      if (!configType) {
        const types = registry.getAvailableTypes();
        console.log(chalk.bold('可用配置类型:\n'));
        registry.getAll().forEach(gen => {
          console.log(`  ${chalk.cyan(gen.type.padEnd(15))} ${gen.description}`);
        });
        console.log(chalk.gray('\n使用: npx config-gen <type>\n'));
        return;
      }

      // 获取生成器
      const generator = registry.get(configType);
      if (!generator) {
        console.error(chalk.red(`❌ 未知的配置类型: ${configType}`));
        console.log(chalk.gray(`可用类型: ${registry.getAvailableTypes().join(', ')}`));
        process.exit(1);
      }

      // 显示生成器信息
      console.log(chalk.bold(`生成配置: ${generator.displayName}`));
      console.log(chalk.gray(generator.description + '\n'));

      // TODO: 实现问答逻辑
      if (options.defaults) {
        console.log(chalk.gray('使用默认值生成...\n'));
        const content = generator.generate({});
        console.log(chalk.green('✅ 配置已生成\n'));
        console.log(chalk.gray('---'));
        console.log(content);
        console.log(chalk.gray('---'));
      } else {
        console.log(chalk.yellow('⚠️  交互模式尚未实现，请使用 --defaults 选项'));
      }

    } catch (error) {
      console.error(chalk.red('❌ 错误:'), error);
      process.exit(1);
    }
  });

// 解析命令行参数
program.parse();
