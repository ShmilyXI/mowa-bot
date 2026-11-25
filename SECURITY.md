# Security policy

## Supported versions

Fixes land in the latest minor release of the `@mowa-bot/*` packages. Older versions
are not patched; upgrade to the latest release to get a fix.

## Reporting a vulnerability

Please do not open a public issue. Report it privately through GitHub instead:
[Report a vulnerability](https://github.com/ShmilyXI/mowa-bot/security/advisories/new)
on the Security tab of this repository.

Include what is affected (a package and version, the avatar endpoint, or the docs
site), how to reproduce it, and what an attacker could do with it. You will get an
acknowledgement within 7 days. Once a fix is released, the advisory is published with
credit to you, unless you would rather stay anonymous.

## Scope

- The `@mowa-bot/engine`, `@mowa-bot/react`, `@mowa-bot/surfaces` and
  `@mowa-bot/element` packages, for example markup injection through rendered SVG or
  labels.
- The avatar endpoint (`api/avatar.ts`) and the documentation site at
  https://mowa-bot.vercel.app.
