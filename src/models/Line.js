import Chord from './Chord';

import createEl from '../helpers/createEl';

export default class Line {
  constructor({ chords, text }) {
    Object.assign(this, { chords, text });
  }

  toDOM(key) {
    return createEl('div.cm7_line', {
      children: [
        createEl('div.cm7_line_chords', {
          children: this.chords.map(chord => chord.toDOM(key)),
        }),
        createEl('div.cm7_line_lyrics', {
          children: this.text.split(/[()]/g).map((t, i) => {
            if (i % 2 === 0) return t;
            return createEl('span.cm7_line_lyrics-beat', { children: [t] });
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
