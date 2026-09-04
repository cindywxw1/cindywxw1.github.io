# cindywxw1.github.io
# Personal portfolio — Cindy Wang
Source for my portfolio site, built for CMU 15-113 Project 1.

**Live site:** https://cindywxw1.github.io/portfolio/ *(update this once Pages is on)*

## Files

| File | What it does |
| --- | --- |
| `index.html` | All the content. One page, sectioned. |
| `styles.css` | All the styling, grouped into nine commented blocks. |
| `script.js` | Three features: invert toggle, current-section nav, project filter. |
| `prompt-log.md` | Prompts and replies from the AI tools I used. |
| `images/` | Photo and project screenshots. |

## Deploying to GitHub Pages

1. Create a repository named `portfolio` on GitHub.
2. Put these files in the root of the repo and push to `main`.
3. Repo → **Settings** → **Pages** → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`. Save.
4. Wait a minute, then open `https://cindywxw1.github.io/portfolio/`. A hard refresh clears the cache if an old version shows.

To preview locally, open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit `http://localhost:8000`.

## Adding images

Create a folder called `images/` and drop files in. Then:

- **Photo:** in `index.html`, find `<div class="portrait portrait--empty">Photo</div>` and replace the whole element with
  `<img class="portrait" src="images/cindy.jpg" alt="Cindy Wang">`.
- **Screenshots:** each project has `<div class="shot shot--empty">images/….png</div>`. Replace it with
  `<img class="shot" src="images/order-book.png" alt="…">`, using the filename already written inside the placeholder.

Write a real `alt` description for each one — it's what a screen reader announces, and what shows if the image fails to load.

## Adding a project later

Copy one `<article class="project">` block, change the text, and set `data-tags` to one or more of `fpga`, `embedded`, `analog`, `web`. The filter buttons at the top of the projects section read that attribute; to add a new category, add a `<button class="filter" data-filter="yourtag">` alongside the others.

## Splitting into multiple pages later

Every section is a top-level `<section>` with its own id. To move one to its own page, cut the section into a new HTML file, keep the same `<head>` links to `styles.css` and `script.js`, and point the nav link at the new file instead of the `#anchor`.

## Credits

- Typeface: [Archivo](https://fonts.google.com/specimen/Archivo) by Omnibus-Type, SIL Open Font License, served by Google Fonts.
- No template or third-party CSS was used.
- The first draft was generated with Claude (Anthropic) and revised by me; see `prompt-log.md`.
