import createEl from '../helpers/createEl';

export default class Line {
  constructor({ chords, text }) {
    Object.assign(this, { chords, text });
  }

  toDOM() {
    return createEl('div', {
      classes: ['cm7_line'],
      children: [
        createEl('div', {
          classes: ['cm7_line_chords'],
          children: this.chords.map(chord => chord.toDOM()),
        }),
        createEl('div', {
          children: this.text.split(/[()]/g).map((t, i) => {
            if (i % 2 === 0) return t;
            return createEl('span', {
              class: ['cm7_line_lyrics-beat'],
              children: [t],
            });
          }),
        }),
      ],
    });
    const lyricsLine = this.text
      .replace(/\(/g, '<span class="cm7_beat">')
      .replace(/\)/g, '</span>');
  }
}
