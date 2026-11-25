<div align="center">

# Mowa Bot

**A procedural character engine for the web: a roster of generated characters with animated states, sixteen faces, four drawing styles and an SVG HUD, plus the UI components built on them.**

[Console](https://mowa-bot.vercel.app/en/) | [Documentation](https://mowa-bot.vercel.app/en/guide/getting-started) | [Scenarios](https://mowa-bot.vercel.app/en/scenarios/chat-stream) | [中文](./README.md)

[![npm](https://img.shields.io/npm/v/@mowa-bot/react?label=%40mowa-bot%2Freact)](https://www.npmjs.com/package/@mowa-bot/react) [![CI](https://github.com/ShmilyXI/mowa-bot/actions/workflows/ci.yml/badge.svg)](https://github.com/ShmilyXI/mowa-bot/actions/workflows/ci.yml) [![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

</div>

<p align="center">
  <img src=".github/media/hero.gif" width="860" alt="Six Mowa Bot characters, Dot the cream ball, a strawberry, a cat, a star, a robot and a cloud, moving through happy, excited, shy, surprised, curious, thinking, asleep, angry, celebrating and laughing">
</p>

---

## What this is

Mowa Bot's cartoon characters are drawn entirely by code, with no sprite sheets and no
Lottie files. Every body is an outline, with ears, leaves or an antenna drawn as separate
parts; every expression is a few numbers describing a curved stroke, eased by springs; and
every animation frame is written straight to SVG attributes by a `requestAnimationFrame`
loop.

The roster has 71 characters, from round blobs and rice cakes to fruit, treats, critters, objects, people and coal.
Here they all are, happy, each in its own face and colour, led by Dot, the cream-white ball:

<p align="center">
  <img src=".github/media/cast.png" width="760" alt="The whole cast of 71 members in a grid, each smiling, with its member id underneath, Dot first">
</p>

Seven holiday and seasonal themes add 122 more characters: Halloween, Christmas, Spring Festival, Mid-Autumn, Easter, Summer and Valentine's Day. Each theme is its own entry (`@mowa-bot/engine/themes/<id>`), loaded only when used, so it adds nothing to the main bundle. See every theme in the [Themes](https://mowa-bot.vercel.app/en/themes/) gallery.

<p align="center">
  <img src=".github/media/themes.png" width="760" alt="Seven themes, a row each, with six of each theme's characters smiling and their ids underneath">
</p>

Every character combines independent choices, all of which you can try in the
[console](https://mowa-bot.vercel.app/en/): the character itself, the style (`vector`, `pixel`,
`kaomoji` or `ascii`) and its variant, the ink colour, the face and the animation state.

<p align="center">
  <img src=".github/media/styles.gif" width="860" alt="Dot drawn in every style: the sixteen vector variants and every pixel, kaomoji and ascii variant, all moving together">
  <br>
  <sub>Dot in every style: <code>vector</code> (<code>solid</code>, <code>outline</code>, <code>glass</code>, <code>sticker</code>, <code>paper</code>, <code>soft</code>, <code>riso</code>, <code>pencil</code>, <code>marker</code>, <code>crayon</code>, <code>watercolor</code>, <code>neon</code>, <code>chalk</code>, <code>origami</code>, <code>relief</code>, <code>gothic</code>), <code>pixel</code> (<code>crisp</code>, <code>dot</code>, <code>block</code>) and <code>kaomoji</code> (<code>plain</code>, <code>bubble</code>).</sub>
</p>

On top of the engine sits a set of React components for what products usually need from
characters: a stable character for every user, derived from any id; shape and colour
pickers; an avatar studio with image cropping; group avatars; chat activity indicators; a
numeric emotion protocol for AI agents; a HUD that draws progress, timers, waveforms and
KPIs in the ring around the character; and a stage that lets hundreds of characters share a
handful of animations. Walkthroughs, restricted-state scenes, template publishing,
occupancy lists and cast lineups live in a separate package built on top of them.

The default face is `cute` (dot eyes, a small mouth and a blush). There are sixteen in all:
`eyes`, the **line face** `line` (a nose and mouth in the same ink and stroke weight as the
eyes) and thirteen drawn faces, chosen with `face`; see
[Face](https://mowa-bot.vercel.app/en/design/face).

## Quick start

```bash
pnpm add @mowa-bot/react
```

```tsx
import { CharacterMark } from '@mowa-bot/react';
import '@mowa-bot/react/styles.css';

<CharacterMark shape="mochi" state="happy" sizePx={96} />;
```

Requires React 19. The product components (walkthrough, scenes, template dialog,
occupancy list, cast lineup) are optional and installed separately:

```bash
pnpm add @mowa-bot/surfaces @mowa-bot/react
```

```tsx
import { RestrictedScene } from '@mowa-bot/surfaces';
import '@mowa-bot/react/styles.css';
import '@mowa-bot/surfaces/styles.css'; // after the react stylesheet
```

Without React, one script tag puts a character on any page:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@mowa-bot/element"></script>
<mowa-bot character="mochi" state="happy" size="96"></mowa-bot>
```

When all you need is an avatar image, put an [avatar API](https://mowa-bot.vercel.app/en/guide/avatar-api) URL in an `<img>`; the same id always gives the same character:

```html
<img src="https://mowa-bot.vercel.app/avatar/alice.svg" width="64" height="64" alt="alice" />
```

> The CDN script and the avatar endpoint cannot be reached from mainland China yet; installing from npm and bundling with your app is not affected. Access for users in mainland China is planned.

## Packages

| Package              | What it does                                                                                                                                                                                                                       |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@mowa-bot/engine`   | The engine: shapes and styles, face fitting, pose projection, a spring integrator, the state machine, belts, HUD dials, particles, the emotion protocol and the arbiter. No React; the `/static` and `/agent` entries need no DOM. |
| `@mowa-bot/element`  | The `<mowa-bot>` Web Component for pages without React, plus a single-file CDN build that bundles the engine.                                                                                                                      |
| `@mowa-bot/react`    | React components: `CharacterMark`, `CharacterStageProvider`, avatars and avatar groups, pickers, the avatar studio, activity badges, HUD plates, agent state, sprites, confetti and locales.                                       |
| `@mowa-bot/surfaces` | Product components built on `@mowa-bot/react`: the walkthrough, scenes, the template dialog and publishing, the occupancy list and the cast lineup. The engine and the React package are peer dependencies.                        |

Each package has its own README: [`packages/engine`](./packages/engine/README.md),
[`packages/element`](./packages/element/README.md),
[`packages/react`](./packages/react/README.md),
[`packages/surfaces`](./packages/surfaces/README.md).

## Repository layout

```
packages/engine/     from-scratch character engine (TypeScript)
packages/element/    Web Component for pages without React
packages/react/      React component layer
packages/surfaces/   product components on top of the React layer
docs/                Rspress documentation site
api/                 avatar endpoint (Vercel Function)
examples/            standalone samples, not part of the workspace build
```

## Based on Aora Bot

Mowa Bot is built on [Aora Bot](https://github.com/sam70361/aora-bot) by sam70361, released under the MIT License, starting from upstream commit `63c6c4f` (0.3.0). We changed the name, the npm packages, the CSS variable prefix, the logo and the docs site, and continue development from there. The character engine, the character designs and most of the documentation come from Aora Bot; thanks to its author for the work.

Mowa Bot is an independently maintained fork. It is not affiliated with, endorsed or sponsored by the Aora Bot project. The "Aora Bot" name and logo belong to their owner; see the upstream [trademark policy](https://github.com/sam70361/aora-bot/blob/main/TRADEMARKS.md).

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

Mowa Bot is open source under the [MIT License](./LICENSE), covering the source code, the character designs (shapes, colours, faces, animation states and their data), the documentation and the examples. The parts that come from Aora Bot are copyright sam70361 and used under MIT; the Mowa Bot modifications are copyright ShmilyXI and released under MIT as well. Keep every copyright and license notice in [LICENSE](./LICENSE) in copies you distribute. See [NOTICE.md](./NOTICE.md) for where the code comes from.
