import parseCm7 from 'cm7-lang-parser';
import render from './render';
import mount from './mount';
import defaultCssClasses from './defaultCssClasses';

export default function({ el, src, cssClasses }) {
  if (typeof src !== 'string') throw Error('Cm7: `src` should be a string.');

  const ast = parseCm7(src);

  if (ast === null) throw Error('Cm7: `src` is not a valid cm7 source.');

  if (ast.errors.length > 0) {
    ast.errors.forEach(error => console.error(error));
    throw Error('Cm7: `src` is not a valid cm7 source. See the above errors.');
  }

  cssClasses = {
    ...defaultCssClasses,
    ...cssClasses,
  };

  const cm7HTML = render({ cssClasses, ast });

  if (el) mount({ el, cm7HTML, cssClasses });

  return {
    mount: (el) => mount({ el, cm7HTML, cssClasses }),
  };
}
