# RikPOS Shadcn PWA — Final (Ready for Vercel)

This project is a React + Vite minimal starter using local shadcn-style components and prepared for PWA and Vercel deployment.

## Features
- Bottom navigation UI built with local shadcn-like components (src/components/ui).
- Projects page protected by barcode scan; barcode is verified against Firebase Realtime Database path `vip_codes/{code}`.
- Upload project source files to Firebase Storage; metadata pushed to Realtime Database path `projects`.
- PWA ready via vite-plugin-pwa.
- Vercel-ready (see vercel.json) — set environment variables in Vercel dashboard.

## Setup (locally)
1. Install Node.js >=18
2. `npm install`
3. `npm run dev`

## Build
- `npm run build` — produces production build in `dist/`

## Vercel deployment
1. Create a Vercel project and connect to this repo (or upload).
2. Set the Build Command: `npm run build`
   Output Directory: `dist`
3. Add Environment Variables (if you prefer to store Firebase config in env vars):
   - VITE_FIREBASE_API_KEY
   - VITE_FIREBASE_AUTH_DOMAIN
   - VITE_FIREBASE_DATABASE_URL
   - VITE_FIREBASE_PROJECT_ID
   - VITE_FIREBASE_STORAGE_BUCKET
   - VITE_FIREBASE_MESSAGING_SENDER_ID
   - VITE_FIREBASE_APP_ID
   - VITE_FIREBASE_MEASUREMENT_ID
4. Deploy.

## Notes
- Replace FontAwesome usage with your kit or @fortawesome packages if preferred.
- The barcode verification expects entries under `vip_codes` in Realtime Database. You can pre-populate codes via Firebase Console or use the simulated payment button in Projects page to create a code (for testing only).
- For a real payment gateway integration, create a server endpoint to handle payment creation and verification, then call `createVipCode(code)` on success.

