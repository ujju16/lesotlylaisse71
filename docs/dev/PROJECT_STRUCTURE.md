# Project Structure - LeSotLyLaisse71

## 📁 Directory Organization

This project follows **Next.js 15 App Router** best practices with a clean, scalable structure.

### Root Structure
```
lesotlylaisse71/
├── app/                    # Next.js App Router directory
├── docs/                   # Project documentation
├── lib/                    # Shared utilities and configurations
├── public/                 # Static assets
├── scripts/                # Build and deployment scripts
├── .github/                # GitHub Actions CI/CD workflows
└── grafana/                # Monitoring configuration
```

## 🎯 App Directory Structure

```
app/
├── components/             # React components (App Router standard)
│   ├── admin/             # Admin panel components
│   │   ├── AdminDashboard.tsx
│   │   ├── ConfirmDialog.tsx
│   │   ├── Modal.tsx
│   │   ├── ToastProvider.tsx
│   │   └── use*.ts        # Custom hooks
│   ├── auth/              # Authentication components
│   │   ├── AuthLayout.tsx
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   └── [shared]/          # Shared UI components
│       ├── Footer.tsx
│       ├── Navigation.tsx
│       ├── PageTemplate.tsx
│       └── ThemeToggle.tsx
│
├── admin/                 # Admin panel routes
│   ├── categories/
│   ├── dishes/
│   ├── menus/
│   ├── qrcode/
│   ├── layout.tsx         # Admin layout with navigation
│   └── page.tsx           # Dashboard
│
├── auth/                  # Authentication routes
│   ├── login/
│   └── register/
│
├── api/                   # API routes
│   ├── categories/
│   ├── dishes/
│   ├── menus/
│   └── upload/
│
├── layout.tsx             # Root layout
├── page.tsx               # Homepage
└── globals.css            # Global styles
```

## 📦 Library Structure

```
lib/
├── hygraph.ts             # Hygraph CMS client configuration
├── queries.ts             # Public GraphQL queries
├── queries-admin.ts       # Admin GraphQL queries & mutations
├── theme.ts               # Material-UI theme configuration
├── types.ts               # TypeScript type definitions
├── qrcode.ts              # QR code generation utilities
├── validations/           # Zod validation schemas
│   └── auth.ts
└── monitoring/            # Observability setup
    └── faro.ts            # Grafana Faro configuration
```

## 🎨 Component Architecture

### Component Types

1. **Page Components** (`app/*/page.tsx`)
   - Server Components by default
   - Use `"use client"` when needed (forms, interactivity)
   - Handle data fetching and page layout

2. **Layout Components** (`app/*/layout.tsx`)
   - Wrap page content
   - Provide navigation and context
   - Can be nested

3. **UI Components** (`app/components/`)
   - Reusable across the application
   - Follow Material Design guidelines
   - Include ARIA labels for accessibility

### Import Conventions

```typescript
// ✅ Correct - Use aliased imports
import { AdminDashboard } from '@/app/components/admin/AdminDashboard';
import { hygraphClient } from '@/lib/hygraph';
import type { Category } from '@/lib/types';

// ❌ Avoid - Relative imports for shared code
import { AdminDashboard } from '../../../components/admin/AdminDashboard';
```

## 🔧 Configuration Files

### Key Configuration Files

- **`next.config.ts`** - Next.js configuration
- **`tailwind.config.cjs`** - Tailwind CSS configuration
- **`tsconfig.json`** - TypeScript configuration
- **`eslint.config.mjs`** - ESLint rules
- **`.prettierrc`** - Code formatting rules
- **`vercel.json`** - Vercel deployment configuration
- **`.lighthouserc.json`** - Lighthouse CI configuration

### Environment Variables

```bash
# Required in .env.local
NEXT_PUBLIC_HYGRAPH_URL=...        # Hygraph API endpoint
HYGRAPH_TOKEN=...                   # Hygraph authentication token
NEXT_PUBLIC_BASE_URL=...           # Application base URL
CODECOV_TOKEN=...                   # Codecov integration
```

## 🚀 Deployment Structure

### Vercel Deployments

- **Production** (`main` branch) → `https://lesotlylaisse71.fr`
- **Preview** (`dev` branch) → Auto-generated Vercel URL
- **PR Previews** → Unique URL per Pull Request

### Environment Configuration

```json
{
  "git": {
    "deploymentEnabled": {
      "main": true,
      "dev": true
    }
  }
}
```

## 📊 Quality Assurance

### CI/CD Pipeline

```
Pull Request → CI Pipeline
    ├── Lint Check
    ├── Type Check
    ├── Unit Tests
    ├── Security Audit
    ├── Build
    └── Lighthouse Audit
```

### Code Quality Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **Jest** - Unit testing
- **Lighthouse** - Performance auditing
- **GitGuardian** - Security scanning

## 🎯 Best Practices

### 1. Component Organization

```typescript
// ✅ Good - Clear component structure
'use client';

import { useState } from 'react';
import { Button, Box } from '@mui/material';
import type { ComponentProps } from '@/lib/types';

export default function MyComponent({ data }: ComponentProps) {
  const [state, setState] = useState();
  
  return (
    <Box role="region" aria-label="Description">
      <Button onClick={...}>Action</Button>
    </Box>
  );
}
```

### 2. API Routes

```typescript
// app/api/example/route.ts
import { NextResponse } from 'next/server';
import { adminHygraphClient } from '@/lib/hygraph';

export async function GET() {
  try {
    const data = await adminHygraphClient.request(query);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error message' },
      { status: 500 }
    );
  }
}
```

### 3. Accessibility

- Always include `aria-label` on interactive elements
- Use semantic HTML elements
- Ensure keyboard navigation works
- Test with screen readers

### 4. Performance

- Use Next.js Image component for images
- Implement lazy loading for heavy components
- Optimize bundle size with dynamic imports
- Cache API responses appropriately

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI Documentation](https://mui.com/)
- [Hygraph Documentation](https://hygraph.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

## 🔄 Migration Notes

### Recent Changes (v2.0)

- ✅ Migrated from `/components` to `/app/components`
- ✅ Updated all import paths
- ✅ Added proper ARIA labels
- ✅ Enhanced Material Design implementation
- ✅ Fixed Hygraph authentication for admin queries
- ✅ Improved TypeScript type safety

### Breaking Changes

None - All changes are backward compatible within the Next.js 15 App Router paradigm.
