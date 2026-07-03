# Coding Standards — armadilhas locais

- Framer Motion: importar `m` (não `motion`) — `LazyMotion strict` lança erro com `motion.`
- Novas strings de UI SEMPRE em `shared/lib/i18n/translations.ts` nos 3 locales (pt/en/es) com chaves idênticas — `as const` + tipo `Dictionary` quebra o build se divergirem
- Estilo padrão de seção:
  - label: `text-primary font-mono text-xs lg:text-sm tracking-[0.2em] font-bold uppercase mb-4 block`
  - título: `text-3xl lg:text-5xl font-bold mb-4 tracking-tight`
  - section: `py-16 lg:py-24 px-6 md:px-12 lg:px-24 border-t border-border` + `scroll-mt-20` se tiver id âncora
- `app/globals.css` é o único CSS global (não recriar `styles/globals.css`)
- Animações devem respeitar `prefers-reduced-motion` (CSS media query + MotionConfig já cobrem)
- Não reintroduzir `ignoreBuildErrors` no next.config — build deve passar tsc limpo
- Não adicionar componentes shadcn sem uso real (deps foram podadas em 2026-07)
