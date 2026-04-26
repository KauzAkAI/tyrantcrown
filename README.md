# tyrantcrown.com

Official site for **Tyrant Crown** — a heavy metal band, debut album *Throne of Bones*, A Kauzak Foundation Production.

Vanilla HTML / CSS / JS. No build step. Deploys directly from this repo to GitHub Pages or Cloudflare Pages.

---

## Stack

- HTML / CSS / vanilla JS (no framework, no compilation)
- Google Fonts: Cinzel, UnifrakturMaguntia, Rajdhani, Cormorant Garamond, Oswald
- GoatCounter analytics (separate counter at `tyrantcrown.goatcounter.com`)
- Formspree for newsletter (replace `your-form-id` in `index.html` with the real form ID)
- YouTube embed for full-album playback (channel: `@A.M. Sterling`)

Family DNA: matches the structural template used by `kauzak.foundation` and `amsterlingbooks.com` — same skeleton, distinct skin.

---

## File layout

```
tyrantcrown_site/
├── index.html              # English launch page (root)
├── KO/index.html           # 한국어 — Korean
├── JA/index.html           # 日本語 — Japanese
├── ZH/index.html           # 中文 — Simplified Chinese
├── ES/index.html           # Español — Spanish
├── DE/index.html           # Deutsch — German
├── style.css               # shared design tokens + components + sections
├── script.js               # shared mobile nav, hero video fallback, cursor glow
├── assets/                 # shared by all six locales (paths use ../ from localized files)
│   ├── images/
│   │   ├── album_cover.png # the Throne of Bones cover
│   │   └── favicon.png     # TODO — derive from album art
│   ├── videos/
│   │   ├── hero.mp4        # TODO — drop hero video here when ready
│   │   └── hero.webm       # TODO — optional AV1/VP9 sibling
│   └── audio/              # reserved (stems / previews if needed later)
├── docs/                   # reserved (research PDFs if hosted locally)
├── README.md
└── .gitignore
```

### Internationalization (i18n)

Six full localized versions ship at launch — English at root + five language directories matching the Kauzak Foundation pattern: `/KO/`, `/JA/`, `/ZH/`, `/ES/`, `/DE/`. Each localized `index.html`:

- Sets the appropriate `<html lang="...">` and `<title>` for SEO and screen readers.
- Loads the appropriate Google Fonts in `<head>` — KO/JA/ZH add Noto Sans + Noto Serif in their script as a body-font fallback layered behind Rajdhani / Cormorant Garamond.
- Uses `../style.css` and `../script.js` (shared stylesheet, shared script, no duplication).
- Uses `../assets/images/album_cover.png` etc. (shared assets, no duplication).
- Has its own `<span class="nav-flags">` linking to the other five localizations + back to English root.
- Has form fields tagged `lang=ko` / `lang=ja` / etc. so Formspree submissions can be filtered by language.
- Pull-quotes from *The Missing Bridge* are translated; CTA links go to the corresponding localized Kauzak research page (`https://kauzak.foundation/KO/music.html` etc.) and the language-specific PDF (`The_Missing_Bridge_KO.pdf` etc.).
- Lyric pull-quotes are kept in English with a parenthetical translation gloss below them — lyrics translate poorly by machine and the original-with-gloss reads cleaner.

The English root has an `auto-redirect` script in `<head>` that fires on first visit only (gated by `sessionStorage.getItem('lang_chosen')`). It maps `navigator.language` to the matching directory:

```js
var map = { 'ko': '/KO/', 'ja': '/JA/', 'zh': '/ZH/', 'es': '/ES/', 'de': '/DE/' };
```

After the first redirect, the choice is sticky for that browser session. Visitors switch languages anytime via the flag strip in the nav.

**Translation status:** All five localizations were done by Claude as drafts pending native review (per project policy — same pattern Brian uses for Kauzak's pages). Formal register everywhere (존댓말 / です・ます / 您 / usted / Sie). Proper nouns kept in original (band name, song titles, member stage names, "The Vault", "Kauzak Foundation", "Throne of Bones"). Legal identifiers (EIN, 501(c)(3), Florida USA) stay in English. Translators may patch idioms over time.

---

## What's wired up

### Hero
- Full-bleed album cover as the visible background
- Video element pre-wired — when you drop `assets/videos/hero.mp4` (and optionally `hero.webm`), it auto-plays over the image. If the video fails / is missing / the visitor prefers reduced motion, the image stays.
- Animated grain + vignette overlays.
- Title rendered in `UnifrakturMaguntia` blackletter to echo the album wordmark.

### Album section
- Album cover + metadata in a glass panel.
- Below it: an embedded YouTube playlist player tied to the album playlist (`PLL4VOgHeeeLUfEMYZSzJFjGfUpEDkGJoB`). When a new track is uploaded to the playlist, it shows up here automatically — no code change.

### Tracklist
- All 13 tracks listed in album order, each linking into the YouTube playlist at the right index. As tracks publish across launch day, the deep-links continue to work.
- Track 4 ("Tyrant's March") is wired to its specific video ID (`wALlbB5y1Jo`) since it's already public.

### Band
- Five-piece roster: Cassian Vex, Raze Thorne, Jericho Stone, Brunn Vasko, Tyr Karn — placeholder bios, ready to replace.

### Story / Foundation Lineage
- "Forged at The Vault" section with the Kauzak insignia, framing the band as Foundation-produced applied research.
- Pull-quote from *The Missing Bridge*: *"AI can identify what makes music therapeutic. Only human musicians can create music that is therapeutic."*
- CTAs link to `kauzak.foundation/music.html` and the research PDF.

### Foundation Roster
- Tyrant Crown (now) and Ami Kim (next) — public credit for the next artist the Foundation is courting to The Vault.

### Tour
- Placeholder card pointing to Summer 2027 dates and the newsletter.

### Newsletter
- Formspree form. Replace `your-form-id` with the real Formspree endpoint.

### Footer
- Honest mention of EIN, 501(c)(3) status, Foundation production lineage.
- Links to YouTube, Kauzak, A.M. Sterling Books, Telegram, WhatsApp.

---

## To replace before going live

1. **Formspree ID** — `index.html` → search for `your-form-id` and replace with the real endpoint.
2. **GoatCounter site code** — set up `tyrantcrown.goatcounter.com` (free) and verify the script tag in `<head>`.
3. **Favicon** — generate a 32×32 / 180×180 from the album art crown and save to `assets/images/favicon.png`.
4. **Hero video** — drop final video at `assets/videos/hero.mp4` (and ideally a `.webm` AV1/VP9 sibling).
5. **Track times** — runtimes in the tracklist are best estimates from the chapter timestamps in the YouTube launch kit. Verify against final masters.
6. **Email address in footer** — `tyrant@tyrantcrown.com` is a placeholder. Set up the real address.

---

## Deploy via GitHub

### Option A — GitHub Pages (free, instant)

1. Create a new repo (suggested name: `tyrantcrown` or `tyrant-crown-site`).
2. Push the contents of this folder to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Launch — Throne of Bones"
   git branch -M main
   git remote add origin git@github.com:YOUR_USERNAME/tyrantcrown.git
   git push -u origin main
   ```
3. Repo → **Settings → Pages → Source: Deploy from branch → Branch: main / root → Save**.
4. Set up custom domain: **Settings → Pages → Custom domain → tyrantcrown.com**, then add a `CNAME` record at your DNS pointing to `YOUR_USERNAME.github.io`.

### Option B — Cloudflare Pages (recommended, faster)

1. Push the repo to GitHub as above.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git → pick the repo**.
3. Build command: *(leave blank)*. Output directory: *(leave blank or `/`)*.
4. Add custom domain `tyrantcrown.com` → Cloudflare auto-issues SSL.
5. Cloudflare's email obfuscation (`/cdn-cgi/l/email-protection`) kicks in automatically for any `mailto:` links — same pattern as `kauzak.foundation`.

---

## How the YouTube tracklist auto-updates

The album section uses a **playlist embed**:

```html
<iframe src="https://www.youtube.com/embed/videoseries?list=PLL4VOgHeeeLUfEMYZSzJFjGfUpEDkGJoB"></iframe>
```

The tracklist below uses **playlist-indexed deep links**:

```
https://www.youtube.com/playlist?list=PLL4VOgHeeeLUfEMYZSzJFjGfUpEDkGJoB&index=N
```

You don't have to edit the site as new tracks publish today. As long as the playlist is set to **manual sort order** (per your launch kit) and tracks are uploaded in album sequence, every link resolves correctly the moment its track is public.

---

## Future enhancements (parked, see the build brief)

- Cross-document **View Transitions** so navigating between the Foundation family of sites feels cinematic.
- **WebGL Liquid Glass** refraction upgrade to `.glass-panel` (Apple iOS 26-style).
- **Audio-reactive sigil + ember field** on the hero — pulses to the kick drum when a track plays.
- **Stem-mixer microsite** for "Throne of Bones" — fans solo/mute drums / bass / guitars / vocals.
- Localized versions (KO / JA / ZH / ES / DE) mirroring `kauzak.foundation`'s i18n pattern.
- Codex / Bestiary page expanding the Throne of Bones lore as illuminated manuscript.

---

## Credits

Album: *Throne of Bones*
Band: Tyrant Crown
Written by: Brian Adrian
Produced, engineered, mixed & mastered by: The Kauzak Foundation
Recorded at: The Vault — Kauzak Foundation Private Studios, Florida
Album artwork: The Kauzak Foundation
© 2026 The Kauzak Foundation, Inc. · 501(c)(3) Nonprofit · EIN 41-3426116 · Florida, USA

A Kauzak Foundation Production.
