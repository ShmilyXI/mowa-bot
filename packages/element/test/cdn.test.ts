// @vitest-environment happy-dom
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { describe, expect, it } from 'vitest';

/*
 * The CDN file is a build product, so this needs `pnpm --filter @mowa-bot/element build`
 * to have run, as the React package needs the engine's `dist`.
 */

const file = join(import.meta.dirname, '../dist/mowa-bot.js');

describe('CDN bundle', () => {
  it('is one self-contained file', () => {
    expect(existsSync(file)).toBe(true);
    expect(readFileSync(file, 'utf8')).not.toMatch(/from\s*["']@mowa-bot/);
  });

  it('defines <mowa-bot> when it loads', async () => {
    expect(customElements.get('mowa-bot')).toBeUndefined();
    await import(/* @vite-ignore */ pathToFileURL(file).href);

    const Constructor = customElements.get('mowa-bot')!;
    expect(Constructor).toBeTypeOf('function');

    const el = document.createElement('mowa-bot');
    el.setAttribute('character', 'mochi');
    el.setAttribute('reduced-motion', '');
    document.body.appendChild(el);
    expect(el.shadowRoot!.querySelector('svg')).not.toBeNull();
    expect(el.getAttribute('aria-label')).toBe('Mochi');
    el.remove();
  });
});
