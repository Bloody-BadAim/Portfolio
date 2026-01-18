# Matin Khajehfard — Portfolio (Next.js)

Production-ready personal portfolio built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, and **Framer Motion**.

## ✨ Features
- Modern single-page layout, recruiter-friendly and fast
- Dark/light mode toggle (system aware)
- Framer Motion section reveals + hover micro-interactions
- Data-driven content from `/content` files
- SEO-ready metadata, sitemap, and robots
- Ready for Vercel deploy

## ✅ Requirements
- Node.js 18+
- pnpm or npm

## 🚀 Local development
```bash
npm install
npm run dev
```
Then open `http://localhost:3000`.

## 🧠 Update content
- **Profile / skills / experience**: `content/profile.ts`
- **Projects list**: `content/projects.ts`
- **Portrait image**: `public/images/portrait-placeholder.svg` (replace with your own)
- **OpenGraph image**: `public/images/og.svg` (replace when ready)
- **CV file**: add your own `public/cv.pdf` (not tracked in git to avoid binary PR errors)

## 🌍 Deploy to Vercel
1. Push repo to GitHub.
2. Go to [Vercel](https://vercel.com/) and import the repo.
3. Vercel will auto-detect Next.js and deploy.

## 🧩 Scripts
```bash
npm run dev
npm run build
npm run start
npm run lint
npm run format
```

## 🔧 Custom domain + SEO
- Update `metadataBase` and sitemap/robots base URL in `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`.
- Replace placeholder OpenGraph image in `public/images/og.svg`.

---
Built for Matin Khajehfard.

## 📎 Binary files (portraits & CV)
GitHub PRs in this workflow reject binary files. Keep images/CV out of git or use SVG placeholders.
