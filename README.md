# Wedding RSVP Platform

A polished wedding RSVP application built with Next.js, Tailwind CSS, and Framer Motion.

## Project structure

```text
.
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── rsvp/
│   │       └── page.tsx
│   ├── components/
│   │   └── rsvp-form.tsx
│   ├── data/
│   │   └── event.ts
│   ├── lib/
│   │   └── phone.ts
│   └── types/
│       └── rsvp.ts
├── public/
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Conventions

- App routes live under `src/app/`
- Reusable UI goes under `src/components/`
- Business logic and validators live under `src/lib/`
- Type contracts live under `src/types/`
- Static data and config values live under `src/data/`

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## RSVP storage (Google Sheets)

RSVP submissions are saved to a Google Sheet via `src/app/api/rsvp/route.ts`. To wire it up:

1. In [Google Cloud Console](https://console.cloud.google.com/), create a project (or reuse one), enable the **Google Sheets API**, and create a **Service Account**.
2. Create a JSON key for that service account and copy its `client_email` and `private_key`.
3. Create a Google Sheet with a tab named `RSVPs` and a header row, e.g. `Timestamp | Name | Attendance | Ceremonies | Phone | Guests | Notes`.
4. Share the sheet with the service account's email address (Editor access).
5. Copy `.env.local.example` to `.env.local` and fill in:
   - `GOOGLE_SHEET_ID` — the ID from the sheet's URL (`.../d/<SHEET_ID>/edit`)
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` — the service account's `client_email`
   - `GOOGLE_PRIVATE_KEY` — the service account's `private_key`, keeping the `\n` newline escapes as-is (wrap the whole value in quotes)
6. Add the same three variables to your hosting provider's environment settings (e.g. Vercel project settings) before deploying.

Without these variables set, RSVP submissions will fail with a "could not save your RSVP" error.

## Recommended next phase

1. Add Supabase schema and guest tokens
2. Add secure admin dashboard routes
3. Add Resend email service integration
4. Add RSVP persistence and status tracking
