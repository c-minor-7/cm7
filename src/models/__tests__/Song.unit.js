import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import pretty from 'pretty';

import parseCm7 from 'cm7-lang-parser';
import Song from '../Song';
import cssClasses from '../../defaultCssClasses';

describe('cm7', () => {
  const cm7sDir = join(__dirname, './cm7s');

  for (const filename of readdirSync(cm7sDir)) {
    if (filename[0] === '.') continue;

    describe(filename, () => {
      it('should generate html that matches snapshot', async () => {
        const src = readFileSync(join(cm7sDir, 'here-we-are.cm7'), 'utf8');

        const songDOM = Song.fromAST(parseCm7(src)).toDOM({ cssClasses });
        const innerHTML = songDOM.innerHTML;
        expect(pretty(innerHTML)).toMatchSnapshot();
      });
    });
  }
});
