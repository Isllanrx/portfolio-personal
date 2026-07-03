# ADR-001 — Auditoria de frontend e limpeza estrutural

Data: 2026-07-03
Status: aceito

## Contexto
O projeto acumulou boilerplate do shadcn (50+ componentes sem uso), 4 seções órfãs sem
traduções (`about`, `blog`, `services`, `system-design`) que forçavam `ignoreBuildErrors: true`,
CSS global duplicado (`styles/globals.css` vs `app/globals.css`) e `package-lock.json`
convivendo com `pnpm-lock.yaml`.

## Decisão
- Deletar seções órfãs e componentes shadcn sem import; manter apenas badge, button,
  dialog, input, select, textarea.
- Podar `package.json` para 12 dependências reais (removidos recharts, react-hook-form,
  zod, vaul, cmdk, embla, react-day-picker, sonner, next-themes, date-fns, input-otp,
  react-resizable-panels, autoprefixer e 24 pacotes @radix-ui sem uso).
- Remover `ignoreBuildErrors` — o build volta a ser gate de tipo.
- pnpm é o único package manager (package-lock.json removido).

## Alternativas consideradas
- Completar as traduções das seções órfãs: rejeitado — as seções não eram renderizadas
  em nenhuma rota; conteúdo pode ser recuperado do git se necessário.
- Manter boilerplate shadcn "para o futuro": rejeitado — o CLI do shadcn re-adiciona
  qualquer componente sob demanda; dead code custa install/build na Vercel.
