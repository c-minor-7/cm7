import Chord from './Chord';

const findChildrenOfType = (node, type) => node.children.filter(child => child.type === type);
const findFirstChildOfType = (node, type) => node.children.find(child => child.type === type);

const parseAST = ast => {
  const parseConfigsNode = configNode => configNode
    .text.split('\n')
    .map(config => config.split('='))
    .reduce((acc, [key, value]) => ({
      ...acc,
      [key]: value,
    }), {});

  const parseSongNode = songNode => {
    return songNode.children.map(parseSectionNode);
  };

  const parseSectionNode = sectionNode => {
    return sectionNode.children.map(parseLineNode);
  };

  const parseLineNode = ({ children: [
    chordLineNode,
    lyricsLineNode,
  ]}) => ({
    chords: chordLineNode.children.map(parseChordNode),
    chordPositions: getChordPositions(lyricsLineNode.text),
    line: lyricsLineNode.text.replace(/[()]/g, ''),
  });

  const getChordPositions = (line) => {
    let counter = 0;
    return line.replace(/\)/g, '')
      .split(/\(/g).slice(0, -1)
      .map(({ length }) => {
        counter += length;
        return counter;
      });
  };

  const parseChordNode = (chordNode) => {
    console.log(chordNode);
    const { key } = configs;
    const root = findFirstChildOfType(chordNode, 'relative_note').text;
    const quality = (() => {
      try {
        return findFirstChildOfType(chordNode, 'quality').text;
      } catch (e) {
        return '';
      }
    })();
    const additions = findChildrenOfType(chordNode, 'addition')
      .map(({ text }) => text);

    const base = (() => {
      try {
        return findFirstChildOfType(
          findFirstChildOfType(chordNode, 'base'),
          'relative_note',
        ).text;
      } catch (e) {
        return '';
      }
    })();

    return new Chord({ key, root, quality, additions, base });
  };

  const configs = parseConfigsNode(findFirstChildOfType(ast, 'configs'));

  return {
    configs,
    song: parseSongNode(findFirstChildOfType(ast, 'song')),
  };
};

export default ({ el, cssClasses, ast }) => {
  // pre: all arguments are checked!
  const { song } = parseAST(ast);
};
