import { rollup } from 'rollup';
import rollupConfig from '../../rollup.config';
import cssClasses from '../defaultCssClasses';

describe('puppeteer', () => {
  const src = `key=C

1 1M7/3
(London) bridge is (falling) down
2m 4madd4/7b
(Falling) (down)
1
(Falling) down

1
(London) bridge is falling down
2m
(Falling) down
1
(Falling) down`;
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
    await page.evaluate((src, cssClasses) => {
      Cm7({ // eslint-disable-line no-undef
        el: '#display',
        src,
      });

      window.cssClasses = cssClasses;
    }, src, cssClasses);

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
      return document.querySelectorAll(`.${window.cssClasses.chord}`).length;
    })).toBeGreaterThan(0);

    expect(await page.evaluate(() => {
      return document.querySelectorAll(`.${window.cssClasses.chord}`).length;
    })).toBe(await page.evaluate(() => {
      return document.querySelectorAll(`.${window.cssClasses.lyricsBeat}`).length;
    }));

    expect(await page.evaluate(() => {
      return document.querySelectorAll(window.cssClasses.chord).offsetLeft;
    })).toBe(await page.evaluate(() => {
      return document.querySelectorAll(window.cssClasses.lyricsBeat).offsetLeft;
    }));
  });
});
