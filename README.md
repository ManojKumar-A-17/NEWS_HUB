# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/7e4ebb01-6bec-426a-9355-ce8fe793e444

# NewsHub — React + Tailwind News Feed App

[![CI](https://github.com/ManojKumar-A-17/NEWS_HUB/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/ManojKumar-A-17/NEWS_HUB/actions/workflows/ci.yml)

Modern, responsive news feed built with React, Vite, TypeScript, Tailwind, shadcn/ui, and TanStack Query. It fetches live articles from the GNews API and includes search, category filters, loading/error states, theme toggle, and Read Aloud.

## Features

- Live news from GNews API
- Search by keyword
- Category filters: Technology, Business, Sports, Health, Entertainment, Science
- Read Aloud (TTS): play/pause/resume/stop per article
- Proper loading skeletons and error handling
- Light/Dark theme toggle (persists in localStorage)
- Clean, modern UI using Tailwind and shadcn/ui

## Quick start

1) Prerequisites
- Node.js 18+ and npm
- A free GNews API key: https://gnews.io/

2) Setup

```powershell
git clone <your_repo_url>
cd feed-chronicle-main
npm install

# Create your env file
Copy-Item .env.example .env
# Then open .env and paste your API key
# VITE_GNEWS_API_KEY=your_key_here
```

3) Run locally

```powershell
npm run dev
```

The app will start on a local Vite dev server (vite.config sets 8080).

## Environment variables

Create a `.env` file at the project root with:

```
VITE_GNEWS_API_KEY=your_key_here
```

Vite exposes variables prefixed with `VITE_` to the client. Never commit real keys; use `.env` locally and CI secrets in production.

## Ready to push to your GitHub

Create a new empty repo on GitHub, then run from the project folder:

```powershell
git init
git add .
git commit -m "Init: NewsHub – React News Feed app"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

## Deploy

You can deploy to Vercel or Netlify for free.

- Vercel
	- Import the GitHub repo in Vercel
	- Add Environment Variable: `VITE_GNEWS_API_KEY`
	- Deploy

- Netlify
	- New site from Git > select repo
	- Build command: `npm run build`
	- Publish directory: `dist`
	- Environment Variable: `VITE_GNEWS_API_KEY`
	- Deploy

	After deploy, add your live URL here:

	- Live: <YOUR_DEPLOYED_URL>
	- Repo: https://github.com/ManojKumar-A-17/NEWS_HUB

## Tech stack

- React 18 + Vite + TypeScript
- Tailwind CSS + shadcn/ui
- @tanstack/react-query for data fetching/cache
- lucide-react icons

## Project structure

- `src/pages/Index.tsx` — main page with search, filters, list, and states
- `src/lib/api.ts` — GNews API integration
- `src/components/*` — UI components (cards, header, loaders, errors, Read Aloud, etc.)

## Notes

- Free GNews tier has rate limits; if you see 429 errors, wait or upgrade.
- For “latest” with no category, the app uses the `top-headlines` endpoint. For keyword searches it uses the `search` endpoint.

## License

This project is for the AppDost assignment. Feel free to reuse with attribution.
