import parseCm7 from 'cm7-lang-parser';
import Cm7 from './Cm7.js';
import defaultCssClasses from './defaultCssClasses';

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

  return Cm7({
    el,
    cssClasses: {
      ...defaultCssClasses,
      ...cssClasses,
    },
    ast,
  });
};
