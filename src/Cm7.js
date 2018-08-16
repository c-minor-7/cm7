const convertAST = (node) => ({
  [node.type]: {
    _text: node.text,
    ...node.children.reduce((acc, child) => ({
      ...acc,
      ...convertAST(child),
    }), {}),
  },
});

export default ({ el, cssClasses, ast }) => {
  // pre: all arguments are checked!
  const cm7 = convertAST(ast).cm7;
  const key = cm7.configs.key_config.note._text;
  const song = cm7.song;
  el.innerHTML = `C<br>
London bridge is falling down`;
};
