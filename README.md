# Astoria Motors, LLC — Website Remake

A cinematic single-page remake of the Astoria Motors, LLC dealership website (Long Island City, NY), designed like a collector-car auction catalog crossed with a film title sequence: true-black letterboxed cinemascope plates, Fraunces display serif, and two Remotion compositions — an orchestrated hero title sequence and a scroll-driven "plate" showcase.

**Live site:** https://oh-ashen-one.github.io/astoria-motors-remake/

## Stack

- Vite + React 18 + TypeScript, plain CSS (no Tailwind)
- `remotion` + `@remotion/player` — autoplay Ken Burns hero composition, and a scrollytelling showcase composition whose frames are driven by scroll progress (`playerRef.seekTo()`)
- Hand-rolled scroll effects: IntersectionObserver reveals, rAF parallax, sticky-header state, count-up stats
- `prefers-reduced-motion` respected throughout

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs to dist/, base path /astoria-motors-remake/
```

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) builds `dist/` and publishes to GitHub Pages on every push to `main`.
