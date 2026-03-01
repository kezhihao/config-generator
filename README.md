# Config-Generator

> **Instant Dockerfiles for Engineers Who Hate DevOps** | CLI tool - generate Dockerfile, tsconfig, ESLint, CI/CD configs with best practices. No documentation reading required.

[![CI](https://github.com/kezhihao/config-generator/actions/workflows/ci.yml/badge.svg)](https://github.com/kezhihao/config-generator/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/config-generator.svg)](https://www.npmjs.com/package/config-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Config-Generator 是一个强大的命令行工具，通过简单的问答交互，快速生成各种项目配置文件。无需查阅文档，无需手动配置，30秒内即可获得生产就绪的配置文件。

## 为什么选择 Config-Generator？

| 问题 | 解决方案 |
|------|----------|
| 配置文件语法复杂，经常查阅文档 | 自动生成，无需记忆语法 |
| 不同项目需要重复配置 | 一次生成，多处复用 |
| 最佳实践难以掌握 | 内置行业标准配置 |
| 配置错误难以排查 | 经过验证的模板 |
| 新项目启动耗时 | 30秒完成基础配置 |

## 特性

- **智能检测**: 自动检测项目类型和技术栈，推荐最佳配置
- **问答式交互**: 回答几个简单问题即可生成定制化配置
- **极速生成**: 30秒内完成，无需查阅文档
- **最佳实践**: 每个配置都基于行业标准最佳实践
- **纯本地运行**: 无需注册，无数据收集，完全离线可用
- **多配置支持**: Dockerfile, TypeScript, ESLint, Prettier, CI/CD, 测试框架配置

## 支持的配置类型

| 配置类型 | 说明 | 状态 |
|---------|------|------|
| `Dockerfile` | 多阶段优化的 Docker 镜像配置 | ✅ |
| `tsconfig.json` | TypeScript 编译配置 | ✅ |
| `.eslintrc.js` | ESLint 代码规范配置 | ✅ |
| `.prettierrc` | Prettier 代码格式化配置 | ✅ |
| `.github/workflows/ci.yml` | GitHub Actions CI/CD 配置 | ✅ |
| `jest.config.js` | Jest 测试框架配置 | ✅ |
| `vite.config.ts` | Vite 构建工具配置 | ✅ |
| `.gitignore` | Git 忽略文件配置 | ✅ |

## 安装

### 使用 npx (推荐)

无需安装，直接使用：

```bash
npx config-gen
```

### 全局安装

```bash
npm install -g config-generator
config-gen
```

### 克隆运行

```bash
git clone https://github.com/kezhihao/config-generator.git
cd config-generator
npm install
npm run build
node dist/cli.js
```

## 使用方法

### 列出所有可用配置

```bash
npx config-gen
```

### 使用默认值快速生成

跳过问答，使用推荐配置：

```bash
# 生成 Dockerfile
npx config-gen dockerfile --defaults

# 生成 TypeScript 配置
npx config-gen tsconfig --defaults

# 生成 ESLint 配置
npx config-gen eslint --defaults
```

### 交互式生成

根据项目需求定制配置：

```bash
npx config-gen dockerfile
```

### 指定输出路径

```bash
npx config-gen dockerfile --output ./deploy/Dockerfile
```

### 预览配置（不写入文件）

```bash
npx config-gen dockerfile --dry-run
```

## CLI 选项

```
Usage: config-gen [config-type] [options]

Arguments:
  config-type          配置类型: dockerfile, tsconfig, eslint, prettier, ci, jest, vite, gitignore

Options:
  -d, --defaults       使用默认值，跳过问答交互
  -o, --output <path>  指定输出文件路径
  --no-detect          跳过项目类型自动检测
  -f, --force          覆盖已存在的文件
  --dry-run            预览配置内容，不实际写入文件
  -h, --help           显示帮助信息
  -V, --version        显示版本号
```

## 使用示例

### 示例 1：生成 Dockerfile

```bash
$ npx config-gen dockerfile --defaults

🚀 Config-Generator v1.0.0

生成配置: Dockerfile
多阶段优化的 Docker 镜像配置，包含生产环境最佳实践

使用默认值生成...

✅ 配置已生成: ./Dockerfile
```

生成的 Dockerfile：

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy node_modules from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy application code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "src/index.js"]
```

### 示例 2：生成 TypeScript 配置

```bash
npx config-gen tsconfig --defaults
```

生成 `tsconfig.json`，包含：
- ES2022 目标版本
- 严格模式启用
- Node.js 模块解析
- 完整的源码映射配置

### 示例 3：生成 CI/CD 配置

```bash
npx config-gen ci --defaults
```

生成 `.github/workflows/ci.yml`，包含：
- Node.js 多版本测试矩阵
- 自动依赖缓存
- Lint、Test、Build 流程

### 示例 4：查看所有生成的示例

```bash
# 查看示例目录
ls examples/

# 使用示例文件作为参考
cat examples/Dockerfile.nodejs
cat examples/tsconfig.json
```

## 使用场景

- **新项目初始化**: 快速搭建项目基础配置
- **Docker 容器化**: 生成生产级 Dockerfile，无需掌握多阶段构建语法
- **TypeScript 项目**: 生成严格的 tsconfig.json 配置
- **代码规范**: 配置 ESLint 和 Prettier 统一代码风格
- **CI/CD 搭建**: 快速配置 GitHub Actions 工作流
- **测试配置**: 生成 Jest 或 Vitest 测试框架配置
- **配置迁移**: 在不同工具间转换配置格式

## 真实场景

### 场景 1：新 Node.js 项目启动

```bash
# 创建新项目
mkdir my-app && cd my-app
npm init -y

# 一键生成所有配置
npx config-gen dockerfile --defaults
npx config-gen tsconfig --defaults
npx config-gen eslint --defaults
npx config-gen prettier --defaults
npx config-gen gitignore --defaults

# 项目配置完成！
```

### 场景 2：添加 CI/CD 到现有项目

```bash
# 进入项目目录
cd existing-project

# 生成 CI 配置
npx config-gen ci --defaults

# Git 提交
git add .github/workflows/ci.yml
git commit -m "Add CI/CD pipeline"
```

### 场景 3：Docker 化现有应用

```bash
# 生成优化的 Dockerfile
npx config-gen dockerfile --defaults

# 构建镜像
docker build -t myapp .

# 运行容器
docker run -p 3000:3000 myapp
```

### 场景 4：团队代码规范统一

```bash
# 生成团队共享配置
npx config-gen eslint --defaults
npx config-gen prettier --defaults

# 提交到团队仓库
git add .eslintrc.js .prettierrc
git commit -m "Add team code style config"
```

## 示例文件

查看 [`examples/`](./examples) 目录获取完整的配置示例：

- `Dockerfile.nodejs` - Node.js 应用 Docker 配置
- `tsconfig.json` - TypeScript 严格模式配置
- `.eslintrc.js` - ESLint 规则配置
- `.prettierrc` - Prettier 格式化配置
- `ci.yml` - GitHub Actions CI/CD 配置
- `vite.config.ts` - Vite 构建配置
- `jest.config.js` - Jest 测试配置
- `.gitignore` - 通用 Git 忽略规则

## 开发

```bash
# 克隆仓库
git clone https://github.com/kezhihao/config-generator.git
cd config-generator

# 安装依赖
npm install

# 构建
npm run build

# 运行
node dist/cli.js dockerfile --defaults
```

## 路线图

### v1.0 (MVP) - 当前版本
- [x] 基础 CLI 框架
- [x] 项目类型自动检测
- [x] Dockerfile 生成器
- [x] TypeScript 配置生成器
- [x] ESLint/Prettier 配置
- [x] GitHub Actions CI/CD 配置
- [ ] 交互式问答模式
- [ ] 更多配置类型支持

### v1.1
- [ ] 配置模板自定义
- [ ] `--update` 命令更新已有配置
- [ ] 配置验证和兼容性检查
- [ ] 配置预设（React, Vue, Node.js 等）

### v2.0
- [ ] 50+ 配置类型支持
- [ ] AI 智能推荐配置
- [ ] Web UI 界面
- [ ] VS Code 插件
- [ ] 配置文件同步更新

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License - 详见 [LICENSE](LICENSE)

## 关于我们

Built by [Auto Company](https://github.com/kezhihao) - 自主运行的 AI 软件公司，为开发者打造实用工具。

---

## 快速开始

**准备生成配置？** 立即尝试：

```bash
npx config-gen
```

## 关键词

config generator, dockerfile generator, tsconfig generator, eslint config, prettier config, github actions generator, ci/cd config, jest config, vite config, project scaffolding, boilerplate generator, devops tools, developer tools, configuration management, typescript config, docker config, code quality, automation, productivity
