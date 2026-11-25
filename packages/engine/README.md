# @mowa-bot/engine

The character engine behind [Mowa Bot](https://mowa-bot.vercel.app): shapes and a named cast,
animation states, sixteen faces, the vector, pixel, kaomoji and ASCII style series, face fitting,
pose projection, a damped-spring state machine, effects and belts, HUD dials, particles and a
numeric emotion protocol. It needs no React, and the `/static` and `/agent` entries need no DOM.
Pick a character in the [console](https://mowa-bot.vercel.app/en/).

Most applications want [`@mowa-bot/react`](https://www.npmjs.com/package/@mowa-bot/react)
instead, which wraps this engine in components. Install the engine directly when you need
the geometry or animation without React.

## Install

```bash
pnpm add @mowa-bot/engine
```

## Animate a character

```ts
import { createCharacter } from '@mowa-bot/engine';

const host = document.querySelector('#avatar')!;
const character = createCharacter(host, { shape: 'mochi', state: 'thinking' });

character.update({ state: 'happy' });
character.update({ face: 'line', lineWeight: 1.1 }); // stroked nose and mouth
character.update({ hud: { kind: 'progress', value: 0.4 } }); // a dial in the ring
character.update({ followTarget: { x: 320, y: 180 } }); // eyes track a viewport point
character.spin(2);
character.destroy();
```

`createCharacter` mounts one SVG into the host and drives it from a single
`requestAnimationFrame` loop shared by every character on the page. Ink colour is a CSS
custom property, `--mowa-fg`, so the same running character can be tinted per instance;
`ink` overrides it with any paint. The HUD is drawn by `evaluateHud`, a pure function of
the spec, time and stroke weight, so hosts can also draw the dials themselves.

## Render without a DOM

```ts
import { renderStaticSvg, renderAvatarDataUrl, autoShapeForKey } from '@mowa-bot/engine/static';

const svg = renderStaticSvg({ shape: 'hex', color: 'green', state: 'happy' });
const url = renderAvatarDataUrl('ada@example.com');
const shape = autoShapeForKey('ada@example.com'); // deterministic: 'hex'
```

Everything exported from `@mowa-bot/engine/static` is safe to call on a server, in a
worker, or during static generation.

The ink follows the operating system's light/dark setting, which is right for `<img>`, data
URLs and files. When you inline the markup into a page that has its own theme switch, pass
`colorScheme: 'page'` so it follows the page's `color-scheme` instead.

For a terminal, a CLI or an agent log, `renderAsciiText` draws the `ascii` series as plain text rows;
`{ ansi: true }` adds 24-bit colour:

```ts
import { renderAsciiText } from '@mowa-bot/engine/static';

console.log(renderAsciiText({ shape: 'mochi', state: 'happy', ansi: true }));
```

## Simulate without drawing

```ts
import { createSimulation, getStyle } from '@mowa-bot/engine';

const sim = createSimulation({ shape: 'flower', state: 'thinking', seed: 'ada' });
sim.step(1 / 60);
const frame = sim.snapshot(); // points and numbers, no markup

const style = getStyle('vector');
const markup = style.renderStatic(frame, { color: 'blue', uid: 'a', styleOptions: {} });
```

`createSimulation` holds everything that decides what a character is doing and touches no
DOM, so it runs in Node and gives the same frames for the same seed. A style series turns a
`FrameSnapshot` into pixels: `createCharacter` pairs the simulation with the series' live
renderer, and `renderStaticSvg` with its static one. Pick a series with `style` and tune
it with `styleOptions`; `defineStyle` registers another.

## Drive a character from an agent

```ts
import { createArbiter, normalizeLine } from '@mowa-bot/engine/agent';

const arbiter = createArbiter({
  onApply: (result) => character.update({ state: result.state }),
});

arbiter.update({ sessionId: 'main', emotionId: '32', tips: 'Editing…' });
```

`/agent` is the same surface with no animation runtime: protocol ids, the
arbiter, adapters, the state channel, and sprite-manifest helpers.

## Documentation

- [Getting started](https://mowa-bot.vercel.app/en/guide/getting-started)
- [Shapes](https://mowa-bot.vercel.app/en/design/shapes) | [States](https://mowa-bot.vercel.app/en/design/states) | [Palette](https://mowa-bot.vercel.app/en/design/palette)

## License

[MIT](https://github.com/ShmilyXI/mowa-bot/blob/main/LICENSE), code and character designs alike. Based on [Aora Bot](https://github.com/sam70361/aora-bot) by sam70361 (MIT); see [NOTICE.md](https://github.com/ShmilyXI/mowa-bot/blob/main/NOTICE.md).
