import Chord from './Chord';
import Line from './Line';

export default class Song {
  constructor({ configs, sections }) {
    Object.assign(this, { configs, sections });
  }

  toDOM() {
    return '<span class="cm7_song">' +
      this.sections.map(
        lines => lines.map(line => line.toDOM())
      ).join('\n') +
    '</span>';
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
      { text },
    ]}) => new Line({
      chords: chordLineNode.children.map(parseChordNode),
      text,
    });

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
      sections: parseSongNode(findFirstChildOfType(ast, 'song')),
    });
  }
}
