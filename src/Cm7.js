import Song from './models/Song';
import createEl from './helpers/createEl';
import zip from './helpers/zip';

export default ({ cssClasses, ast }) => {
  // pre: all arguments are checked!
  const song = Song.fromAST(ast);

  const $cm7 = createEl(`div.${cssClasses.cm7}`, {
    children: [song.toDOM({ cssClasses })],
  });

  const $lines = $cm7.querySelectorAll(`.${cssClasses.line}`);

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

  return $cm7.innerHTML;
};
