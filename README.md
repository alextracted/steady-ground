# Steady Ground Coffee Service and Skilling — Website

A static, no-build-step website for Steady Ground Coffee Service and Skilling LLC. Plain HTML, CSS, and a few lines of JavaScript — no framework, no dependencies to install.

## What's in here

```
index.html          Home page (footer on this page is the "Contact Us" destination)
services.html        Field Service & Repairs / Routine Maintenance / New Installation Consultation / Skilling Sessions
about.html            About Us
assets/
  css/style.css       All styles
  js/main.js          Mobile menu toggle only
  img/                Logo variations (from steadygroundlogovariations), favicons, hero texture photo
CNAME                 Points the site at steadyground.co once DNS is configured
```

## Publishing with GitHub Pages

1. Create a new GitHub repository (public repos get free Pages hosting; private repos need GitHub Pro/Team/Enterprise).
2. Upload everything in this folder to the root of that repository (keep the `assets` folder structure intact).
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to "Deploy from a branch," choose the `main` branch and the `/ (root)` folder, then save.
5. GitHub will publish the site at `https://<your-username>.github.io/<repo-name>/` within a few minutes.

## Connecting steadyground.co

1. At your domain registrar, add these DNS records for the apex domain (`steadyground.co`):
   - `A` records pointing to GitHub's IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - If you also want `www.steadyground.co` to work, add a `CNAME` record for `www` pointing to `<your-username>.github.io`
2. Back in **Settings → Pages**, enter `steadyground.co` under **Custom domain** and save (this repo already includes a `CNAME` file with that value, so GitHub should detect it automatically).
3. Once DNS propagates, check **Enforce HTTPS** in the same settings panel.

## Updating content later

- Every page shares the same header/nav and footer markup — if you change contact info, hours, or the address, update it in the footer of all three HTML files (`index.html`, `services.html`, `about.html`).
- Logo files are in `assets/img/`. `Logo_web.png` is used in the header; `Logomark_white_web.png` is used in the footer and elsewhere. Other variations from the original logo pack were left out of the final build to keep the page fast, but they're worth keeping in your own design archive.
- Colors and fonts are all defined as CSS variables at the top of `assets/css/style.css` under `:root` — change a value there and it updates everywhere.
