# Next.js Migration Log

Date: 2026-05-10
Project: `8ThreadsQuizzy`

## Goal

Convert the frontend from Vite + React Router to Next.js App Router while preserving the current UI and layout as closely as possible. Remove obsolete files from the previous frontend setup and keep a record of the migration process.

## Summary of Changes

1. Replaced the old Vite entry flow with Next.js App Router.
2. Added `src/app` route structure for:
   - `/`
   - `/login`
   - `/register`
   - `/dashboard`
   - `/quizzes`
   - `/events`
   - `/students`
   - `/settings`
   - `/settings/[...slug]`
3. Updated the dashboard shell layout to use Next.js nested layouts instead of `react-router-dom`'s `Outlet`.
4. Replaced `NavLink` usage with `next/link` + `usePathname`.
5. Moved frontend page modules from `src/pages` to `src/views` to avoid collision with Next.js file-based routing.
6. Moved UI assets from `src/assets` to `public/assets`.
7. Marked interactive screens as client components where required by Next.js.
8. Added Next.js, PostCSS, TypeScript support files, and updated ESLint configuration.
9. Removed obsolete Vite files and duplicate unused auth files.
10. Fixed small lint/code hygiene issues discovered during validation.

## Files Added

- `next.config.mjs`
- `postcss.config.mjs`
- `jsconfig.json`
- `tsconfig.json`
- `next-env.d.ts`
- `src/app/layout.jsx`
- `src/app/page.jsx`
- `src/app/login/page.jsx`
- `src/app/register/page.jsx`
- `src/app/(dashboard)/layout.jsx`
- `src/app/(dashboard)/dashboard/page.jsx`
- `src/app/(dashboard)/quizzes/page.jsx`
- `src/app/(dashboard)/events/page.jsx`
- `src/app/(dashboard)/students/page.jsx`
- `src/app/(dashboard)/settings/page.jsx`
- `src/app/(dashboard)/settings/[...slug]/page.jsx`
- `src/app/globals.css`
- `NEXTJS_MIGRATION_LOG.md`

## Files Removed

- `index.html`
- `vite.config.js`
- `src/main.jsx`
- `src/App.jsx`
- `src/App.css`
- `src/index.css`
- `src/router/AppRouter.jsx`
- `src/router/`
- `public/vite.svg`
- `src/assets/react.svg`
- `pnpm-lock.yaml`
- `src/views/Auth/LoginForm.tsx`
- `src/views/Auth/LoginPage.tsx`

## Dependency Changes

Added or enabled for the Next.js frontend:

- `next`
- `typescript`
- `eslint-config-next`
- `@tailwindcss/postcss`
- `@types/node` (added automatically during first `next build`)

Removed old frontend dependencies no longer needed:

- `vite`
- `@vitejs/plugin-react`
- `@tailwindcss/vite`
- `react-router-dom`
- `axios`
- `react-redux`

## Compatibility Notes

- Plain `<img>` tags were intentionally kept in many UI components to avoid layout drift during the migration.
- Existing backend code under `server/` was preserved.
- Settings nested routing from the previous router was mapped to a catch-all Next.js route under `src/app/(dashboard)/settings/[...slug]/page.jsx`.
- Interactive pages/components were marked with `"use client"` only where required.

## Validation

Executed successfully:

- `npm install`
- `npm run build`
- `npm run lint`

## Result

The project now runs on Next.js App Router with the previous UI/layout preserved as closely as possible, and the obsolete Vite/router scaffolding has been removed.
