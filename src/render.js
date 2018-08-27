import Song from './models/Song';
import createEl from './helpers/createEl';

export default ({ cssClasses, ast }) => {
  // pre: all arguments are checked!
  const song = Song.fromAST(ast);

  const $cm7 = createEl(`div.${cssClasses.cm7}`, {
    children: [song.toDOM({ cssClasses })],
  });

  return $cm7.innerHTML;
};
