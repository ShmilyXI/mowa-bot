# @mowa-bot/surfaces

Product components for [Mowa Bot](https://mowa-bot.vercel.app): the onboarding walkthrough,
restricted and loading scenes, the template dialog with publishing, the occupancy list and the
cast lineup. They are built from the primitives in
[`@mowa-bot/react`](https://www.npmjs.com/package/@mowa-bot/react), which keeps anything
product-specific out of its own API.

## Install

```bash
pnpm add @mowa-bot/surfaces @mowa-bot/react @mowa-bot/engine
```

`@mowa-bot/react`, `@mowa-bot/engine` and React 19 are peer dependencies, so the application
chooses one copy of each.

```tsx
import { RestrictedScene } from '@mowa-bot/surfaces';
import '@mowa-bot/react/styles.css';
import '@mowa-bot/surfaces/styles.css';

export function Blocked() {
  return <RestrictedScene tone="offline" />;
}
```

Import the surfaces stylesheet after the React one. It uses the library's design tokens, sits
in its own `mowa.surfaces` CSS layer after the library's layers, and every class is prefixed
`mowa-s-`.

## Surfaces

| Group       | Exports                                                                                      |
| ----------- | -------------------------------------------------------------------------------------------- |
| Walkthrough | `DemoDesktop`, `JobBubbles`, `SuggestionCards`, `LandingWait`, `HandOff`, `Composer`         |
| Scenes      | `RestrictedScene`, `DeviceBezel`, `BootLoop`, `LoadingCharacter`                             |
| Template    | `TemplateDialog`, `VisibilityControls`, `ShareCard`, `usePublishMark`                        |
| Occupancy   | `OccupancyList`, `OccupancyMark`                                                             |
| Cast        | `CastLineup`, `CastFigure`, `PortraitSlot`, `useCastScene`                                   |
| Locale      | `SurfaceLocaleProvider`, `useSurfaceLocale`, `SURFACE_LOCALES`, `surfaceEnUS`, `surfaceZhCN` |

## Copy and languages

The language follows the `LocaleProvider` from `@mowa-bot/react`. Override individual strings
with `SurfaceLocaleProvider`; the React provider's `overrides` only know the React package's keys.

```tsx
import { LocaleProvider } from '@mowa-bot/react';
import { SurfaceLocaleProvider } from '@mowa-bot/surfaces';

<LocaleProvider locale="zh-CN">
  <SurfaceLocaleProvider overrides={{ 'template.title': '新建模板' }}>{children}</SurfaceLocaleProvider>
</LocaleProvider>;
```

## Server rendering

`@mowa-bot/surfaces/static` has no `'use client'` banner and needs no DOM: `normalizeTemplateDraft`
with `TEMPLATE_LIMITS` and `TEMPLATE_ERROR_KEYS`, plus the two copy tables. A route can validate a
submitted draft with the same function the dialog runs.

## Documentation

- [Components](https://mowa-bot.vercel.app/en/components/overview)
- [Walkthrough](https://mowa-bot.vercel.app/en/components/walkthrough)

## License

[MIT](https://github.com/ShmilyXI/mowa-bot/blob/main/LICENSE), code and character designs alike. Based on [Aora Bot](https://github.com/sam70361/aora-bot) by sam70361 (MIT); see [NOTICE.md](https://github.com/ShmilyXI/mowa-bot/blob/main/NOTICE.md).
