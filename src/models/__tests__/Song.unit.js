import parseCm7 from 'cm7-lang-parser';
import Song from '../Song';

describe('cm7', () => {
  const src = `key=C

:: verse ::
1 1M7/3
(L)ondon bridge is (f)alling down
2m 4madd4/7b
(F)alling (d)own
1
(F)alling down

1
(L)ondon bridge is falling down
2m
(F)alling down
1
(F)alling down`;

  it('should generate html that matches snapshot', async () => {
    const songDOM = Song.fromAST(parseCm7(src)).toDOM({
      cssClasses: {
        cm7: 'cm7',
        song: 'cm7_song',
        section: 'cm7_section',
        chord: 'cm7_chord',
        line: 'cm7_line',
        chords: 'cm7_line_chords',
        lyrics: 'cm7_line_lyrics',
        lyricsBeat: 'cm7_line_lyrics-beat',
      },
    });
    const innerHTML = songDOM.innerHTML;
    expect(innerHTML).toMatchSnapshot();
  });
});
