# Security Policy

## Supported Versions
Currently supported versions: | Version | Supported |
|---------|----------|
| 1.0.x | ✅ Yes |

## Reporting a Vulnerability

If you discover a security vulnerability, please email it to security@autocompany.dev

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact

We will respond within 48 hours and provide a timeline for fixing the issue.

## Security Best Practices

1. **Generated Configs**: This tool generates configuration files. Review generated content before deploying to production.
2. **File Writing**: The CLI tool writes files to your local filesystem. Ensure you have appropriate permissions.
3. **Templates**: Templates are sourced from within the project. Verify generated configs match your requirements.

## Dependency Updates

We regularly update dependencies to address security vulnerabilities. Use `npm audit` to check for issues.
