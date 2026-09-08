# Allorca

**Archived.** An investing-education platform I designed and built in 2026. It is no longer an active product and is not accepting users. The deployment stays online as a portfolio piece, and this repo is here so the code can be read.

Demo: https://markets-app.vercel.app

---

## What it was

Most investment-education tools show every user the same content. Allorca started by profiling the user instead: a twelve-question onboarding survey fed a risk-scoring algorithm that sorted people into one of three investor profiles (Conservative, Balanced, Aggressive), and the profile determined which curriculum they saw and how their paper portfolio was allocated.

Everything was simulated. Users started with $10,000 in paper money, real quotes came from Finnhub, and no real trades or real accounts were ever involved.

## What's in here

- **Risk scoring** — twelve survey responses reduced to a 0-100 risk score, mapped to a portfolio type. `src/app/api/onboarding/route.ts`
- **Paper trading** — buy/sell against live quotes, with positions and cost basis tracked per portfolio. `src/app/api/trade/route.ts`, `src/app/api/stocks/route.ts`
- **Education** — 4 courses, 7 lessons, quizzes, per-course progress persisted to the database. `src/lib/courses.ts`, `src/app/education/`
- **AI tutor** — Claude Sonnet 4 answering questions in the context of the user's own portfolio and lesson. `src/app/api/ai-tutor/route.ts`
- **Auth** — Clerk, with middleware protecting everything except the landing and sign-in routes. `src/middleware.ts`

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, inline styles on the landing page |
| Backend | Next.js API routes |
| Database | PostgreSQL via Prisma |
| Auth | Clerk |
| AI | Claude API (`claude-sonnet-4`) |
| Market data | Finnhub |
| Hosting | Vercel |

## Running it locally

```bash
git clone https://github.com/milessmi/Allorca_.git
cd Allorca_
npm install
npm run dev
```

You'll need your own `.env.local`:

```
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
ANTHROPIC_API_KEY=
FINNHUB_API_KEY=
```

Then `npx prisma migrate dev` to set up the schema. Without keys the app builds but auth and the tutor won't run.

## Background

Built in 2026 while the project was going through USC's Stevens Center for Innovation. I wrote the application: the risk-scoring algorithm, the paper-trading engine, the curriculum system, the Claude integration, and the front end.

The project continued under other people afterward, and the Allorca name belongs to them. This repo and its demo deployment are an archive of the version I shipped, kept for portfolio purposes only. Nothing here is investment advice.

Built by Miles Smith.
