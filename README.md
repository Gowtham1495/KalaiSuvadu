# HueBees

HueBees is a Next.js 15 App Router project for an art business website and admin panel.

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Prisma ORM + Supabase PostgreSQL
- NextAuth credentials authentication (email/password)
- Supabase Storage for project and team media

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create your local environment file:

```bash
cp .env.example .env.local
```

3. Update `.env.local` with real values from Supabase and NextAuth.

4. Generate Prisma Client:

```bash
npm run prisma:generate
```

5. Run the app:

```bash
npm run dev
```

Open http://localhost:3000.

## Useful Scripts

- `npm run lint`
- `npm run lint:fix`
- `npm run format`
- `npm run format:check`
- `npm run prisma:generate`
- `npm run prisma:migrate`
- `npm run prisma:studio`

## Health Check

- `GET /api/health`
