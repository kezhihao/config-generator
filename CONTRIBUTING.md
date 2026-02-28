# Contributing to Config-Generator

Thank you for your interest in contributing! This CLI tool generates 8 types of configuration files.

## Quick Start

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Run tests: `npm test`
5. Build: `npm run build`
6. Commit: `git commit -m "Add my feature"`
7. Push: `git push origin feature/my-feature`
8. Open a Pull Request

## Development

```bash
# Install dependencies
npm install

# Watch mode for development
npm run dev

# Run tests
npm test

# Run linter
npm run lint

# Format code
npm run format

# Build for production
npm run build
```

## Adding a New Config Generator

1. Create a template in `src/templates/<config-type>/`:
```typescript
export interface MyConfigOptions {
  // Define your options here
}

export function generateMyConfig(options: MyConfigOptions): string {
  // Your template logic here
  return result;
}
```

2. Register it in `src/generators/index.ts`

3. Add CLI command in `src/cli.ts`

4. Add tests in `test/`

## Code Style

- Use TypeScript for new files
- Follow Biome linting rules
- Add JSDoc comments for public functions
- Keep functions small and focused

## Questions?

Open an issue and we'll discuss!
