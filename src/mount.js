import zip from './helpers/zip';

export default ({ el, cm7HTML, cssClasses }) => {
  if (el && typeof el !== 'string') throw Error('Cm7: `el` should be a string.');
  if (typeof el === 'string' && el.trim().length <= 0) throw Error('Cm7: `el` is empty.');

  const $el = typeof el === 'string'? document.querySelector(el): el;
  $el.innerHTML = cm7HTML;

  const $lines = $el.querySelectorAll(`.${cssClasses.line}`);

  for (const $line of $lines) {
    const $chords = $line.querySelectorAll(`.${cssClasses.chord}`);
    const $beats = $line.querySelectorAll(`.${cssClasses.lyricsBeat}`);

    for (const [$chord, $beat] of zip($chords, $beats)) {
      Object.assign($chord.style, {
        position: 'relative',
        left: ($beat.offsetLeft - $chord.offsetLeft) + 'px',
      });

      Object.assign($beat.style, {
        display: 'inline-block',
        minWidth: $chord.offsetWidth + 'px',
      });
    }
  }
};
