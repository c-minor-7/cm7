import Song from './models/Song';
import createEl from './helpers/createEl';
import zip from './helpers/zip';

export default ({ el, cssClasses, ast }) => {
  // pre: all arguments are checked!
  const song = Song.fromAST(ast);
  const $el = document.querySelector(el);

  // remove all children in $el
  while ($el.firstChild) $el.removeChild($el.firstChild);

  $el.appendChild(createEl(`div.${cssClasses.cm7}`, {
    children: [song.toDOM({ cssClasses })],
  }));


  const chords = $el.querySelectorAll(`.${cssClasses.chord}`);
  const beats = $el.querySelectorAll(`.${cssClasses.lyricsBeat}`);

  for (const [chord, beat] of zip(chords, beats)) {
    chord.style.position = 'relative';
    chord.style.left = beat.offsetLeft - chord.offsetLeft;
  }
};
