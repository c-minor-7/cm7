import parseCm7 from 'cm7-lang-parser';
import Cm7 from './Cm7.js';

export default ({ el, src, cssClasses }) => {
  if (!el) throw Error('Cm7: `el` is not defined.');
  if (!src) throw Error('Cm7: `src` is not defined.');
  if (typeof el !== 'string') throw Error('Cm7: `el` should be a string.');
  if (typeof src !== 'string') throw Error('Cm7: `src` should be a string.');

  const ast = parseCm7(src);

  if (ast === null) throw Error('Cm7: `src` is not a valid cm7 source.');

  if (ast.errors.length > 0) {
    ast.errors.forEach(error => console.error(error));
    throw Error('Cm7: `src` is not a valid cm7 source. See the above errors.');
  }

  cssClasses = {
    cm7: 'cm7',
    song: 'cm7_song',
    section: 'cm7_section',
    sectionLabel: 'cm7_section_label',
    chord: 'cm7_chord',
    line: 'cm7_line',
    chords: 'cm7_line_chords',
    lyrics: 'cm7_line_lyrics',
    lyricsBeat: 'cm7_line_lyrics-beat',
    ...cssClasses,
  };

  return Cm7({
    el,
    cssClasses,
    ast,
  });
};
