# Sip Journal

A personal coffee tasting notebook — paper-journal layout, how-to guides, bag photos, and a palate map. Built to live on GitHub Pages.

Tasting notes and photos stay in **your browser** (IndexedDB). Export a JSON backup from the Palate page if you switch machines.

## Local

```bash
npm install
npm run dev
```

## Put it on GitHub Pages

GitHub CLI (`gh`) was not available when this project was created. On your Mac:

```bash
brew install gh
gh auth login
cd ~/sip-journal
git add -A
git commit -m "Add Sip Journal tasting notebook"
gh repo create sip-journal --public --source=. --remote=origin --push
```

Then in the GitHub repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The site will publish at:

`https://<your-username>.github.io/sip-journal/`

If your GitHub username or repo name is different, change the `base` path in `vite.config.ts`.
