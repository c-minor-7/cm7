import Chord from './Chord';

export default class Song {
  constructor({ configs, song }) {
    this.configs = configs;
    this.song = song;
  }

  static fromAST(ast) {
    const findChildrenOfType = (node, type) => {
      return node.children.filter(child => child.type === type);
    };

    const findFirstChildOfType = (node, type) => {
      return node.children.find(child => child.type === type);
    };

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

      return new Chord({ root, quality, additions, base });
    };

    return new Song({
      configs: parseConfigsNode(findFirstChildOfType(ast, 'configs')),
      song: parseSongNode(findFirstChildOfType(ast, 'song')),
    });
  }
}
