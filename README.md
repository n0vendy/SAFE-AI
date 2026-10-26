# SAFE.AI web prototype

privacy-conscious incident reporting for healthcare workers. next.js + typeScript.

## pages

- `/`: landing page
- `/report`: anonymous multi-step report form; posts to `/api/report`
- `/impact`: staff impact dashboard (**placeholder data**)

## to change

- survey questions: `lib/survey.ts`
- impact figures: `lib/impactData.ts`. set `SAMPLE_DATA = false` to hide "sample data" banner.
- report handling: `app/api/report/route.ts`. filters answers down to known question IDs. **reports are not stored yet**; add database at `TODO` is.
- styles: `app/globals.css` (brand colours are at the top)

## run locally

```bash
npm install
npm run dev     # http://localhost:3000
```

## deploy to vercel

```bash
vercel login
vercel          # preview deployment
vercel --prod   # production
```
