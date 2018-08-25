import Chord from './Chord';

import createEl from '../helpers/createEl';

import { findFirstChildOfType, findChildrenOfType } from '../helpers/AST';

export default class Line {
  constructor({ chords, lyricsChunks }) {
    Object.assign(this, { chords, lyricsChunks });
  }

  toDOM({ cssClasses, key }) {
    const children = [];
    if (this.chords.length > 0) {
      children.push(createEl(`div.${cssClasses.chordLine}`, {
        children: this.chords.map(chord => chord.toDOM({ cssClasses, key })),
      }));
    }

    if (this.lyricsChunks.length > 0) {
      children.push(
        createEl(`div.${cssClasses.lyricLine}`, {
          children: this.lyricsChunks.map((t, i) => {
            if (i % 2 === 0) return t;
            return createEl(`span.${cssClasses.lyricsBeat}`, {
              children: [t || '&nbps;'],
            });
          }),
        })
      );
    }

    return createEl(`div.${cssClasses.line}`, { children });
  }

  static fromAST(lineNode) {
    const chordLineNode = findFirstChildOfType(lineNode, 'chord_line');
    const lyricsLineNode = findFirstChildOfType(lineNode, 'lyrics_line');

    return new Line({
      chords: chordLineNode? chordLineNode.children.map(Chord.fromAST): [],
      lyricsChunks: lyricsLineNode? lyricsLineNode.children.map(({ text }) => text): [],
    });
  }
}
