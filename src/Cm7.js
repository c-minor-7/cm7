import Song from './models/Song';

export default ({ el, cssClasses, ast }) => {
  // pre: all arguments are checked!
  const song = Song.fromAST(ast);
  const $el = document.querySelector(el);

  // remove all children in $el
  while ($el.firstChild) $el.removeChild($el.firstChild);

  $el.appendChild(song.toDOM({ cssClasses }));
};
