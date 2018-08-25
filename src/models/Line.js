import Chord from './Chord';

import createEl from '../helpers/createEl';

export default class Line {
  constructor({ chords, text }) {
    Object.assign(this, { chords, text });
  }

  toDOM({ cssClasses, key }) {
    return createEl(`div.${cssClasses.line}`, {
      children: [
        createEl(`div.${cssClasses.chords}`, {
          children: this.chords.map(chord => chord.toDOM({ cssClasses, key })),
        }),
        createEl(`div.${cssClasses.lyrics}`, {
          children: this.text.split(/[()]/g).map((t, i) => {
            if (i % 2 === 0) return t;
            return createEl(`span.${cssClasses.lyricsBeat}`, { children: [t || ' '] });
          }),
        }),
      ],
    });
  }

  static fromAST({ children: [
    chordLineNode,
    { text },
  ]}) {
    return new Line({
      chords: chordLineNode.children.map(Chord.fromAST),
      text,
    });
  }
}
