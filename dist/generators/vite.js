/**
 * Vite Config Generator
 * 生成 Vite 构建配置
 */
import { BaseGenerator } from './base.js';
export class ViteGenerator extends BaseGenerator {
    type = 'vite';
    displayName = 'Vite Config';
    description = 'Vite 快速构建配置';
    definePrompts() {
        return [
            {
                type: 'select',
                message: '框架？',
                choices: [
                    { title: 'Vanilla', value: 'vanilla' },
                    { title: 'React', value: 'react' },
                    { title: 'React + TypeScript', value: 'react-ts' },
                    { title: 'Vue', value: 'vue' },
                    { title: 'Vue + TypeScript', value: 'vue-ts' },
                    { title: 'Svelte', value: 'svelte' },
                    { title: 'Svelte + TypeScript', value: 'svelte-ts' }
                ],
                default: 'react-ts'
            },
            {
                type: 'input',
                message: '端口？',
                default: '5173'
            }
        ];
    }
    generate(answers) {
        const framework = answers.framework || 'react-ts';
        const port = answers.port || '5173';
        let imports = "import { defineConfig } from 'vite'\n";
        let plugins = '';
        let configOptions = '';
        switch (framework) {
            case 'react':
                imports += "import react from '@vitejs/plugin-react'\n";
                plugins = '  plugins: [react()],';
                break;
            case 'react-ts':
                imports += "import react from '@vitejs/plugin-react'\n";
                plugins = '  plugins: [react()],';
                configOptions = '  resolve: {\n    alias: {\n      "@": "/src"\n    }\n  },';
                break;
            case 'vue':
                imports += "import vue from '@vitejs/plugin-vue'\n";
                plugins = '  plugins: [vue()],';
                break;
            case 'vue-ts':
                imports += "import vue from '@vitejs/plugin-vue'\n";
                plugins = '  plugins: [vue()],';
                configOptions = '  resolve: {\n    alias: {\n      "@": "/src"\n    }\n  },';
                break;
            case 'svelte':
                imports += "import { svelte } from '@sveltejs/vite-plugin-svelte'\n";
                plugins = '  plugins: [svelte()],';
                break;
            case 'svelte-ts':
                imports += "import { svelte } from '@sveltejs/vite-plugin-svelte'\n";
                plugins = '  plugins: [svelte()],';
                break;
        }
        return `${imports}
export default defineConfig({
${plugins}
  server: {
    port: ${port}
  }${configOptions ? '\n' + configOptions : ''}
})
`;
    }
    validate(config) {
        return config.includes('defineConfig') || config.includes('export default');
    }
}
//# sourceMappingURL=vite.js.map