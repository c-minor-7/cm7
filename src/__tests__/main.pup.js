import { rollup } from 'rollup';
import rollupConfig from '../../rollup.config.js';

describe('puppeteer', () => {
  const src = `key=C

1 1M7/3
(L)ondon bridge is (f)alling down
2m 4madd4/7b
(F)alling (d)own
1
(F)alling down

1
(L)ondon bridge is falling down
2m
(F)alling down
1
(F)alling down`;
  let cm7Src;
  beforeAll(async () => {
    const bundle = await rollup(rollupConfig[0]);
    const { code } = await bundle.generate({
      ...rollupConfig[0].output,
      sourcemap: 'inline',
    });
    cm7Src = code;
  });

  beforeEach(async () => {
    await page.setContent(`<html><head></head><body>
<div id="display"></div>      
</body></html>`);
    await page.addScriptTag({ content: cm7Src });
  });

  it('should generate something in the element given', async () => {
    await page.evaluate(src => {
      Cm7({ // eslint-disable-line no-undef
        el: '#display',
        src,
      });
    }, src);

    expect(await page.evaluate(() => document.querySelector('#display').innerText)).not.toBe('');
  });

  it('should put chords in place', async () => {
    await page.evaluate(src => {
      Cm7({ // eslint-disable-line no-undef
        el: '#display',
        src,
      });
    }, src);

    expect(await page.evaluate(() => {
      return document.querySelectorAll('.cm7_chord').length;
    })).toBe(await page.evaluate(() => {
      return document.querySelectorAll('.cm7_line_lyrics-beat').length;
    }));

    expect(await page.evaluate(() => {
      const zip = ([x, ...xs], [y, ...ys]) => {
        if (!x || !y) return [];
        return [[x, y], ...zip(xs, ys)];
      };

      const chords = document.querySelectorAll('.cm7_chord');
      const lyricsBeats = Array.from(document.querySelectorAll('.cm7_line_lyrics-beat'));

      return zip(chords, lyricsBeats).map(([chord, lyricsBeat]) => {
        return chord.getBoundingClientRect().left === lyricsBeat.getBoundingClientRect().left;
      });
    })).toBe(true);
  });
});
