// @vitest-environment happy-dom
import { isThemeInstalled, loadTheme } from '@mowa-bot/engine';
import { beforeAll, describe, expect, it } from 'vitest';
import { defineMowaBot, type MowaBotElement } from '../src/index.js';

/*
 * An element that names a theme's character, member or skin holds its box,
 * loads the theme and draws when it arrives.
 */

beforeAll(() => {
  defineMowaBot();
});

const mark = (el: MowaBotElement) => el.shadowRoot!.querySelector<HTMLElement>('.mark')!;

describe('<mowa-bot> naming a theme', () => {
  it('holds its size, loads the theme and then draws', async () => {
    expect(isThemeInstalled('halloween')).toBe(false);
    const el = document.createElement('mowa-bot') as MowaBotElement;
    el.setAttribute('reduced-motion', '');
    el.setAttribute('character', 'coal');
    el.setAttribute('variant', 'doodle');
    el.setAttribute('size', '64px');
    document.body.appendChild(el);
    expect(mark(el).querySelector('svg')).toBeNull();
    expect(el.shadowRoot!.querySelector('style')!.textContent).toContain('width: 64px');

    await loadTheme('halloween');
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(mark(el).querySelector('svg')).not.toBeNull();
    expect(el.getAttribute('aria-label')).toBe('Coal');
  });
});
