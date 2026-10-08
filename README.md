# weave.vaked.dev — the constellation, drawn in stipple

> *The map is the weave; the weave is the loop.*

Live URL: **[https://weave.vaked.dev](https://weave.vaked.dev)**

---

## ✦ What this is

`weave.vaked.dev` renders every surface of the vaked.dev constellation as its
own **pattern fill** — stipple, hachure, dots, grid, cross — woven by the
[`stipple-maplibre`](https://github.com/francoisbl/stipple) engine
(MIT, by [francoisbl](https://github.com/francoisbl)). One deterministic
call draws each door:

```js
MaplibrePatternFills.makeTile(pattern, size, color, weight, angle)
// → { width, height, data: Uint8Array }  — a seamless RGBA tile
```

The tile is turned into a repeating canvas pattern and filled into each card,
so density reads as distance and weight as emphasis. Same seed → same weave.

---

## ✦ How it wires in

- **Engine:** the vendored IIFE build `stipple.global.js`
  (global `MaplibrePatternFills`), the same `stipple-maplibre` v0.4.0 output.
  `makeTile` is host-agnostic (browser canvas or Node `createMiniContext`).
- **8b-is-engine:** documented as the "cartography cousin" in
  `8b-is-engine/docs/stipple-bridge.md` — the fill half of the
  *one seed → one world → every host is a render* law, relevant to the
  world-core renderer's terrain / land-use polygon fills.
- **Constellation:** a door in the hub (`koan.vaked.dev`); a sibling surface
  in the `constellation-ops` fleet map.

---

## ✦ Deploy

Static site on **Cloudflare Pages** (project `weave-vaked-dev`):

```bash
wrangler pages deploy . --project-name weave-vaked-dev --branch main --commit-dirty=true
```

DNS: proxied `CNAME weave.vaked.dev → weave-vaked-dev.pages.dev` in the
`vaked.dev` zone; the Pages custom domain is attached.

---

## ✦ Constellation standards

- **robots.txt** — anti-AI scraper rules (GPTBot / ClaudeBot / PerplexityBot /
  Google-Extended / Bytespider disallowed).
- **_headers** — `no-cache` + `X-Robots-Tag: noai, noimageai` + a strict CSP.
- **Lovetta Lane footer** — sister-site backreferences to every live door.
- **Living background audio** — `music.vaked.dev` embedded as a fixed iframe.

---

## ✦ Layout

```
index.html        the board — hero + door grid, each woven from makeTile
stipple.global.js vendored stipple-maplibre engine (IIFE, MIT)
favicon.svg       stipple-field favicon
robots.txt        anti-AI scraper rules
_headers          cache + security headers
```

*0 + 1 · fine touch from within · vaked.dev*
