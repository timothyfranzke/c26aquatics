# Decap CMS placeholder

This directory is reserved for [Decap CMS](https://decapcms.org/) — a free, Git-backed admin UI for editing site content.

When ready to enable non-developer content editing:

1. Add `public/admin/index.html` with the Decap loader.
2. Add `public/admin/config.yml` mapping collections to the `src/content/` folders defined in `src/content/config.ts`.
3. Enable GitHub OAuth on Netlify (Site settings → Identity → External providers).

Until then, all content edits happen via PRs to this repo.
