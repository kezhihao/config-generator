/**
 * Project Detector
 * 检测项目类型和技术栈
 */
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
export class ProjectDetector {
    /**
     * 检测当前目录的项目类型
     */
    async detect(cwd = process.cwd()) {
        const result = {
            projectType: 'unknown',
            hasTypeScript: false,
            hasTests: false,
            hasCI: false,
            recommendedConfigs: []
        };
        // 1. 检测 Node.js 项目
        if (existsSync(join(cwd, 'package.json'))) {
            result.projectType = 'nodejs';
            const pkg = JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf-8'));
            // 检测 TypeScript
            result.hasTypeScript = pkg.devDependencies?.typescript !== undefined ||
                pkg.dependencies?.typescript !== undefined;
            // 检测测试
            result.hasTests = pkg.devDependencies?.jest !== undefined ||
                pkg.devDependencies?.vitest !== undefined ||
                pkg.devDependencies?.mocha !== undefined ||
                pkg.scripts?.test !== undefined;
            // 检测 CI
            result.hasCI = existsSync(join(cwd, '.github', 'workflows'));
            // 推荐配置
            result.recommendedConfigs = this.getRecommendedConfigs(result);
        }
        // 2. 检测 Python 项目
        else if (existsSync(join(cwd, 'requirements.txt')) ||
            existsSync(join(cwd, 'pyproject.toml')) ||
            existsSync(join(cwd, 'setup.py'))) {
            result.projectType = 'python';
            result.recommendedConfigs = ['dockerfile', 'github-actions', 'gitignore'];
        }
        // 3. 检测 Go 项目
        else if (existsSync(join(cwd, 'go.mod'))) {
            result.projectType = 'go';
            result.recommendedConfigs = ['dockerfile', 'github-actions', 'gitignore'];
        }
        // 4. 检测 Rust 项目
        else if (existsSync(join(cwd, 'Cargo.toml'))) {
            result.projectType = 'rust';
            result.recommendedConfigs = ['dockerfile', 'github-actions', 'gitignore'];
        }
        return result;
    }
    /**
     * 根据检测结果推荐配置
     */
    getRecommendedConfigs(result) {
        const configs = [];
        if (result.projectType === 'nodejs') {
            configs.push('dockerfile', 'github-actions', 'gitignore');
            if (result.hasTypeScript) {
                configs.push('tsconfig', 'eslint');
            }
            else {
                configs.push('eslint');
            }
            if (result.hasTests) {
                configs.push('jest');
            }
            if (!result.hasCI) {
                configs.push('github-actions');
            }
        }
        return configs;
    }
}
//# sourceMappingURL=detector.js.map