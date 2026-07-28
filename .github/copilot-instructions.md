# Copilot instructions — Malcriado BCN

Read and follow `../AGENTS.md` as the repository-wide operating contract.

## Before making changes

- Read `docs/ROADMAP.md`, `docs/BACKLOG.md` and the relevant QA/release documentation.
- Confirm the current branch, base SHA and scope.
- Never work directly on `main`.
- Do not assume production state from local code; verify it when the task is release-sensitive.

## Project constraints

- React 18 + TypeScript + Vite.
- GSAP motion must be lifecycle-safe, reversible where required and compatible with reduced motion.
- Reservations remain contact-based unless a separately approved roadmap changes the architecture.
- Do not add Supabase, persistence, SMTP, backend services, analytics, tracking or third-party embeds without explicit approval.
- Do not invent business content, prices, reviews, biographies, hours or legal claims.
- Maintain desktop stability when a task targets mobile/tablet, and vice versa.

## Quality expectations

Use the existing scripts rather than inventing alternative commands. A normal implementation should finish with:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run content:validate
npm run routes:validate
npm run seo:validate
npm run assets:verify
npm run bundle:budget
npm run test:run
npm run build
npm run test:e2e
npm audit
```

Do not claim success without reporting exact results. Keep the PR draft until the scoped implementation and independent review are complete. Never deploy from an implementation PR unless the deployment workflow explicitly authorizes it.
