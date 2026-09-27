# Supabase setup (Obkladérie)

## 1. Vytvoř projekt na https://supabase.com

## 2. SQL
V SQL Editoru spusť obsah souboru:
`supabase/migrations/001_init.sql`

## 3. Env
Zkopíruj `env.example` → `.env.local` a doplň klíče z
Project Settings → API:
- Project URL
- anon public
- service_role (jen server/seed, nikdy do klienta)

## 4. Seed
```bash
npm run db:seed
```
Nahraje kategorie, typy, produkty, poptávky a vytvoří admina.

Login: **admin** / heslo z `ADMIN_PASSWORD` (default `aaaa`)

## 5. Auth
V Authentication → Providers nech Email zapnutý.
Vypni „Confirm email“ pro lokální vývoj (nebo nech seed s email_confirm: true).

## Bez Supabase
Bez `.env.local` web běží dál na mock datech z `content.ts`.
