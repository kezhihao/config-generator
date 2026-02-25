/**
 * Dockerfile Generator
 * 生成多阶段优化的 Dockerfile
 */

import { BaseGenerator } from './base.js';
import type { PromptOptions, PromptResult } from '../types.js';

export class DockerfileGenerator extends BaseGenerator {
  readonly type = 'dockerfile';
  readonly displayName = 'Dockerfile';
  readonly description = '多阶段优化的 Docker 镜像配置';

  definePrompts(): PromptOptions[] {
    return [
      {
        type: 'select',
        message: '你的应用用什么运行？',
        choices: [
          { title: 'Node.js', value: 'nodejs' },
          { title: 'Python', value: 'python' },
          { title: 'Go', value: 'go' },
          { title: 'Rust', value: 'rust' }
        ],
        default: 'nodejs'
      },
      {
        type: 'input',
        message: '应用端口？',
        default: '3000'
      },
      {
        type: 'confirm',
        message: '使用多阶段构建？',
        default: true
      }
    ];
  }

  generate(answers: PromptResult): string {
    const runtime = answers.runtime || 'nodejs';
    const port = answers.port || '3000';
    const multiStage = answers.multiStage !== false;

    switch (runtime) {
      case 'nodejs':
        return this.generateNodeJS(port, multiStage);
      case 'python':
        return this.generatePython(port, multiStage);
      case 'go':
        return this.generateGo(port, multiStage);
      case 'rust':
        return this.generateRust(port, multiStage);
      default:
        return this.generateNodeJS(port, multiStage);
    }
  }

  private generateNodeJS(port: string, multiStage: boolean): string {
    if (multiStage) {
      return `# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE ${port}
CMD ["node", "src/index.js"]
`;
    }

    return `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE ${port}
CMD ["node", "src/index.js"]
`;
  }

  private generatePython(port: string, multiStage: boolean): string {
    return `FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE ${port}
CMD ["python", "app.py"]
`;
  }

  private generateGo(port: string, multiStage: boolean): string {
    if (multiStage) {
      return `# Build stage
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.* ./
RUN go mod download
COPY . .
RUN go build -o main .

# Production stage
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/main .
EXPOSE ${port}
CMD ["./main"]
`;
    }

    return `FROM golang:1.21-alpine
WORKDIR /app
COPY . .
RUN go build -o main .
EXPOSE ${port}
CMD ["./main"]
`;
  }

  private generateRust(port: string, multiStage: boolean): string {
    if (multiStage) {
      return `# Build stage
FROM rust:1.75-alpine AS builder
WORKDIR /app
RUN apk add --no-cache musl-dev
COPY . .
RUN cargo build --release

# Production stage
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/target/release/main .
EXPOSE ${port}
CMD ["./main"]
`;
    }

    return `FROM rust:1.75-alpine
WORKDIR /app
RUN apk add --no-cache musl-dev
COPY . .
RUN cargo build --release
EXPOSE ${port}
CMD ["./target/release/main"]
`;
  }

  validate(config: string): boolean {
    return config.includes('FROM') && config.includes('CMD');
  }
}
