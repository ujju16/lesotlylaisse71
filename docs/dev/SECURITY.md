# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please send an email to security@lesotlylaisse71.fr or create a private security advisory on GitHub.

**Please do not report security vulnerabilities through public GitHub issues.**

## Security Measures Implemented

### 🔒 Environment Variables

- ✅ All secrets stored in `.env.local` (gitignored)
- ✅ `.env.example` provided for reference
- ✅ No hardcoded credentials in source code
- ✅ Environment variables validated at runtime

### 🛡️ Dependencies

- ✅ Regular dependency updates via Dependabot
- ✅ Automated security audits in CI/CD
- ✅ Bun package manager for faster, more secure installs
- ✅ No known vulnerabilities (run `bun audit`)

### 🔐 API Security

- ✅ Hygraph API token secured (server-side only)
- ✅ CORS properly configured
- ✅ Rate limiting on API routes
- ✅ Input validation with Zod

### 🌐 Web Security

- ✅ HTTPS only in production
- ✅ Security headers configured
- ✅ XSS protection enabled
- ✅ CSRF protection via Next.js

### 📊 Data Protection

- ✅ RGPD/GDPR compliant (Axeptio)
- ✅ Cookie consent management
- ✅ Privacy policy available
- ✅ Data minimization principle

### 🔍 Code Security

- ✅ TypeScript strict mode
- ✅ ESLint security rules
- ✅ No `eval()` or dangerous functions
- ✅ Content Security Policy ready

## Environment Variables Reference

See `.env.example` for required environment variables.

**Never commit these files:**

- `.env`
- `.env.local`
- `.env.production`
- `.env.development`

## Security Checklist for Production

- [ ] All environment variables set in Vercel
- [ ] HYGRAPH*TOKEN is kept secret (not NEXT_PUBLIC*)
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] Dependencies up to date
- [ ] No console.logs with sensitive data
- [ ] Error messages don't reveal system info
- [ ] API routes have rate limiting
- [ ] CORS configured properly

## Contact

For security concerns: security@lesotlylaisse71.fr
