import parseCm7 from 'cm7-lang-parser';
import Cm7 from './Cm7.js';

export default ({ el, src, cssClasses }) => {
  if (!el) throw 'Cm7: `el` is not defined.';
  if (!src) throw 'Cm7: `src` is not defined.';
  if (typeof el !== 'string') throw 'Cm7: `el` should be a string.';
  if (typeof src !== 'string') throw 'Cm7: `src` should be a string.';

  const ast = parseCm7(src);

  if (ast === null) throw 'Cm7: `src` is not a valid cm7 source.';

  if (ast.errors.length > 0) {
    ast.errors.forEach(error => console.error(error));
    throw 'Cm7: `src` is not a valid cm7 source. See the above errors.';
  }

  cssClasses = {
    cm7: 'cm7',
    chord: 'cm7-chord',
    lyricsBeat: 'cm7-lyrics-beat',
    ...cssClasses,
  };

  return Cm7({
    el: document.querySelector(el),
    cssClasses,
    ast,
  });
};
