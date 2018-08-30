import Chord from './Chord';

import createEl from '../helpers/createEl';

import { findFirstChildOfType } from '../helpers/AST';

export default class Line {
  constructor({ chords, lyrics }) {
    Object.assign(this, { chords, lyrics });
  }

  toDOM({ cssClasses, key }) {
    const children = [];
    children.push(createEl(`div.${cssClasses.chordLine}`, {
      children: [
        ...this.chords.map(chord => chord.toDOM({ cssClasses, key })),
        '\u00A0',
      ],
    }));

    if (this.lyrics.length > 0) {
      children.push(createEl(`div.${cssClasses.lyricLine}`, {
        children: [
          ...this.lyrics.map(({ type, text }) => {
            if (type === 'lyrics_beat') {
              return createEl(`span.${cssClasses.lyricsBeat}`, {
                children: [text.slice(1, -1)],
              });
            }

            return text;
          }),
          '\u00A0',
        ],
      })
      );
    }

    return createEl(`div.${cssClasses.line}`, { children });
  }

  static fromAST(lineNode) {
    const chordLineNode = findFirstChildOfType(lineNode, 'chord_line');
    const lyricLineNode = findFirstChildOfType(lineNode, 'lyrics_line');

    return new Line({
      chords: chordLineNode? chordLineNode.children.map(Chord.fromAST): [],
      lyrics: lyricLineNode? lyricLineNode.children.map(({ type, text }) => ({
        type,
        text,
      })): [],
    });
  }
}
