# Gemini CLI Project Instructions

Welcome to the project! This file provides the essential conventions and architectural guidelines for this Next.js 16 application.

## Tech Stack (2026 Standard)

- Framework: Next.js 16 (App Router)
- Library: React 19
- Styling: Tailwind CSS 4.2+ (Using native CSS variables and modern directives)
- Language: TypeScript 5.7+
- UI Components: Radix UI (Modular shadcn/ui structure)
- Animations: Framer Motion 12
- Icons: Lucide React

## Project Architecture

### Component Organization
- app/: Routing, global layouts, and static metadata.
- features/: Verticalized feature-based sections (e.g., features/hero, features/projects).
- shared/: Reusable components and logic.
    - shared/layout/: Global components like Header and Footer.
    - shared/ui/: Atomic UI components (shadcn/ui style).
    - shared/lib/: Utilities and core business logic.
    - shared/hooks/: Custom React hooks.
- i18n/: Localization dictionary loader (get-dictionary.ts).

### Localization (i18n)
The project uses a dictionary-based i18n system.
- Components receive a dict prop containing translations.
- Translation data is managed in shared/lib/i18n/translations.ts.
- Use getDictionary(locale) in server components to fetch translations.

## Development Guidelines

### Styling Patterns
- Prefer Tailwind CSS 4 utility classes.
- Use CSS variables defined in app/globals.css for theme-specific values.
- Adhere to the theme-provider for dark/light mode consistency.

### Types and Safety
- Maintain strict TypeScript safety. Avoid any.
- Define interfaces for all component props, including the dict prop.

### Workflow
- Development: npm run dev
- Building: npm run build
- Linting: npm run lint

## AI Interaction Rules
- When adding new sections, create a new folder in features/ and register the component in app/[locale]/page.tsx.
- Follow the existing pattern for UI components in shared/ui/.
- Ensure all new UI elements are responsive and accessible.
