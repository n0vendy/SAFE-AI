# SAFE.AI (web prototype)

Privacy-conscious incident reporting for healthcare workers. Next.js (App Router) + TypeScript.

## Pages

- `/`: landing page
- `/report`: anonymous multi-step report form, which posts to `/api/report`
- `/impact`: staff impact dashboard (**placeholder data**)

## Where to change things

- Survey questions: `lib/survey.ts`. The form renders entirely from this file.
- Impact figures: `lib/impactData.ts`. Set `SAMPLE_DATA = false` to hide the "sample data" banner.
- Report handling: `app/api/report/route.ts`. It filters answers down to known question IDs. **Reports are not stored yet**, so add a database where the `TODO` is.
- Styles: `app/globals.css` (brand colours are at the top).

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
```

## Deploy to Vercel

```bash
vercel login
vercel          # preview deployment
vercel --prod   # production
```

You can also push this folder to GitHub and import it at vercel.com/new. If you import the parent folder, set the Root Directory to `web`.
