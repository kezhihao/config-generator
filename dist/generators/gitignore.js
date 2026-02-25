/**
 * .gitignore Generator
 * 生成 Git 忽略文件配置
 */
import { BaseGenerator } from './base.js';
export class GitignoreGenerator extends BaseGenerator {
    type = 'gitignore';
    displayName = '.gitignore';
    description = 'Git 忽略文件配置';
    definePrompts() {
        return [
            {
                type: 'multiselect',
                message: '项目类型？',
                choices: [
                    { title: 'Node.js', value: 'nodejs' },
                    { title: 'Python', value: 'python' },
                    { title: 'Go', value: 'go' },
                    { title: 'Rust', value: 'rust' },
                    { title: 'IDE', value: 'ide' },
                    { title: 'OS', value: 'os' }
                ],
                default: ['nodejs', 'ide', 'os']
            }
        ];
    }
    generate(answers) {
        const types = answers.types || ['nodejs', 'ide', 'os'];
        const lines = ['# Config-Generator Generated .gitignore'];
        // Dependencies
        if (types.includes('nodejs')) {
            lines.push('', '# Dependencies', 'node_modules/', 'npm-debug.log*', 'yarn-debug.log*', 'yarn-error.log*', 'pnpm-debug.log*', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml');
        }
        if (types.includes('python')) {
            lines.push('', '# Python', '__pycache__/', '*.py[cod]', '*$py.class', '*.so', 'Python/', 'build/', 'develop-eggs/', 'dist/', 'downloads/', 'eggs/', '.eggs/', 'lib/', 'lib64/', 'parts/', 'sdist/', 'var/', 'wheels/', '*.egg-info/', '.installed.cfg', '*.egg', 'MANIFEST', 'pip-log.txt', 'pip-delete-this-directory.txt', '.venv/', 'venv/');
        }
        if (types.includes('go')) {
            lines.push('', '# Go', '*.exe', '*.exe~', '*.dll', '*.so', '*.dylib', '*.test', '*.out', 'go.work', 'vendor/');
        }
        if (types.includes('rust')) {
            lines.push('', '# Rust', '**/*.rs.bk', 'Cargo.lock', 'target/');
        }
        // IDE
        if (types.includes('ide')) {
            lines.push('', '# IDE', '.vscode/', '.idea/', '*.swp', '*.swo', '*~', '.DS_Store', '.env', '.env.local', '.env.*.local');
        }
        // OS
        if (types.includes('os')) {
            lines.push('', '# OS', 'Thumbs.db', '.DS_Store');
        }
        // Build outputs
        lines.push('', '# Build', 'dist/', 'build/', '*.tgz', '*.tar.gz', 'coverage/', '.nyc_output/');
        // Logs
        lines.push('', '# Logs', 'logs/', '*.log', 'npm-debug.log*', 'yarn-debug.log*', 'yarn-error.log*', 'lerna-debug.log*', 'pnpm-debug.log*');
        // Misc
        lines.push('', '# Misc', '.eslintcache', '.stylelintcache', '.cache/', '.parcel-cache/');
        return lines.join('\n');
    }
    validate(config) {
        return config.includes('node_modules') || config.length > 10;
    }
}
//# sourceMappingURL=gitignore.js.map