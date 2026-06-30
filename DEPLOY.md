# Ceilao Website — Deployment Guide

The customer website (Next.js) shares the **same Firebase project (`insureme-db`)** as the
staff app, so customer accounts and submitted quotes land directly in the Quotations tab.

## 1. Environment variables

Set these in **Vercel → Project → Settings → Environment Variables** (and keep a local
`.env.local` for `npm run dev`). They mirror `.env.local`:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | (from staff `.env`) |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `insureme-db.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `insureme-db` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `insureme-db.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `356062305753` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | (from staff `.env`) |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | `service_yz6mw9l` |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | `bYa9JNcVpGNhyqbMV` |
| `NEXT_PUBLIC_EMAILJS_CONFIRM_TEMPLATE_ID` | **create a new EmailJS template, paste its id** |
| `NEXT_PUBLIC_CUSTOMER_EMAIL_DOMAIN` | `customers.ceilaoib.lk` |

> `.env.local` is gitignored — the values are not in the repo.

## 2. Deploy to Vercel (own domain)

1. Import the **Ceilao-Website** GitHub repo into Vercel (framework auto-detected: Next.js).
2. Add the env vars above.
3. Deploy, then add the custom domain **`ceilaoib.lk`** (or a subdomain) in Vercel → Domains.

## 3. Firebase one-time setup (required for the customer flow)

1. **Upgrade the project to the Blaze plan** (needed for Phone Auth SMS / OTP).
2. **Authentication → Sign-in method →** enable **Phone**.
3. **Authentication → Settings → Authorized domains →** add the website domain
   (and `localhost` for dev) so reCAPTCHA + auth work.
4. **Deploy the security rules** (from `d:/Ceilao FInal`):
   ```
   firebase deploy --only firestore:rules,storage
   ```
   These add the `customers` collection, scope customer quote create/read, lock
   `customer_uploads/` per user, and prevent customers from gaining staff rights.

## 4. EmailJS confirmation template

Create a new template in EmailJS (reusing the existing service + public key). It receives:
`to_email`, `to_name`, `reference`, `product`. Paste its template id into
`NEXT_PUBLIC_EMAILJS_CONFIRM_TEMPLATE_ID`.

## 5. Hero image

Drop the banner image at `public/hero-banner.jpg`. Until then a warm orange fallback shows.
