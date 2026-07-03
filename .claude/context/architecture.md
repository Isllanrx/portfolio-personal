# Arquitetura

## Stack
- Next.js 16 (App Router, `cacheComponents: true`, React Compiler via `babel-plugin-react-compiler`)
- React 19, TypeScript strict
- Tailwind CSS 4 (`@theme inline`, tokens OKLCH em `app/globals.css`)
- Framer Motion via `LazyMotion` (`m.` components, nunca `motion.`) + `MotionConfig reducedMotion="user"`
- shadcn/ui mínimo: apenas badge, button, dialog, input, select, textarea em `shared/ui/`
- Hospedado na Vercel (`@vercel/analytics` apenas em produção)

## Camadas
- `app/[locale]/` — rotas (pt/en/es), páginas server components
- `features/<nome>/` — seções da página (client components que recebem `dict`)
- `shared/` — ui, layout (header/footer), lib (i18n, utils), theme-provider custom
- `i18n/get-dictionary.ts` — usa `"use cache"`; traduções estáticas em `shared/lib/i18n/translations.ts`

## Padrões
- i18n por segmento de rota + `proxy.ts` (Next 16 renomeou middleware → proxy) que redireciona `/` → `/pt`
- Tema: provider custom (não next-themes) + `public/scripts/theme-init.js` beforeInteractive para evitar FOUC
- `<html lang>` é estático "pt"; `LangSetter` corrige no client para en/es (limitação: root layout não acessa params)
- Seções below-the-fold carregadas com `next/dynamic` em `app/[locale]/page.tsx`
- Package manager: pnpm (não criar package-lock.json)
