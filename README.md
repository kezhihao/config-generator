# Config-Generator

> **30秒生成正确的配置文件，无需查阅文档**

配置文件生成 CLI 工具，通过简单的问答交互，快速生成各种项目配置文件。

## 特性

- 🔍 **智能检测**: 自动检测项目类型和技术栈
- 🎯 **问答式交互**: 回答几个简单问题即可生成配置
- ⚡ **极速生成**: 30秒内完成，无需查阅文档
- 🛠️ **最佳实践**: 每个配置都基于行业标准最佳实践
- 📦 **纯本地运行**: 无需注册，无数据收集，完全离线可用

## 支持的配置类型

| 配置类型 | 说明 | 状态 |
|---------|------|------|
| Dockerfile | 多阶段优化的 Docker 镜像 | ✅ |
| tsconfig.json | TypeScript 配置 | 🚧 |
| .eslintrc.js | ESLint 代码规范 | 🚧 |
| .prettierrc | Prettier 格式化 | 🚧 |
| .github/workflows/ci.yml | GitHub Actions CI/CD | 🚧 |
| jest.config.js | Jest 测试配置 | 🚧 |
| vite.config.ts | Vite 构建配置 | 🚧 |
| .gitignore | Git 忽略文件 | 🚧 |

## 安装

```bash
# 使用 npx (推荐)
npx config-gen

# 或全局安装
npm install -g config-generator
```

## 使用方法

### 列出所有可用配置

```bash
npx config-gen
```

### 生成特定配置

```bash
# 使用默认值生成 Dockerfile
npx config-gen dockerfile --defaults

# 交互式生成
npx config-gen dockerfile
```

### 查看项目检测信息

```bash
# 自动检测项目类型并推荐配置
npx config-gen
```

## 使用示例

### 生成 Dockerfile

```bash
$ npx config-gen dockerfile --defaults

🚀 Config-Generator v1.0.0

生成配置: Dockerfile
多阶段优化的 Docker 镜像配置

使用默认值生成...

✅ 配置已生成

---
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]
---
```

## 选项

```
Usage: config-gen [config-type] [options]

Arguments:
  config-type          配置类型 (如: dockerfile, tsconfig)

Options:
  -d, --defaults       使用默认值，跳过问答
  -o, --output <path>  输出文件路径
  --no-detect          跳过项目检测
  -f, --force          覆盖已存在的文件
  --dry-run            预览，不实际写入
  -h, --help           显示帮助
  -V, --version        显示版本号
```

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

### v1.0 (MVP)
- [x] 基础 CLI 框架
- [x] 项目检测
- [x] Dockerfile 生成器
- [ ] 10 个核心配置类型
- [ ] 交互式问答

### v1.1
- [ ] 配置模板自定义
- [ ] `--update` 命令
- [ ] 配置验证

### v2.0
- [ ] 50+ 配置类型
- [ ] AI 推荐
- [ ] Web UI
- [ ] VS Code 插件

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

---

**Auto Company** - 自主运行的 AI 软件公司

GitHub: https://github.com/kezhihao/config-generator
