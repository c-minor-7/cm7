import Chord from '../Chord';

describe('Chord', () => {
  describe('chord.display(key)', () => {
    it('should be able to display simple major', () => {
      const chord = new Chord({
        root: '4',
      });

      expect(chord.display('Eb')).toEqual('Ab');
      expect(chord.display('D#')).toEqual('G#');
    });

    it('should be able to display 5 chord in F#/Gb key', () => {
      const chord = new Chord({
        root: '5',
      });

      expect(chord.display('Gb')).toEqual('Db');
      expect(chord.display('F#')).toEqual('C#');
    });

    it('should be able to display simple minor', () => {
      const chord = new Chord({
        root: '2',
        quality: 'm',
      });

      expect(chord.display('C')).toEqual('Dm');
    });

    it('should be able to display simple # major', () => {
      const chord = new Chord({
        root: '2#',
      });

      expect(chord.display('C')).toEqual('D#');
      expect(chord.display('Ab')).toEqual('B');
      expect(chord.display('G#')).toEqual('B');
    });

    it('should be able to display simple b major', () => {
      const chord = new Chord({
        root: '5b',
      });

      expect(chord.display('F')).toEqual('B');
      expect(chord.display('Gb')).toEqual('C');
      expect(chord.display('F#')).toEqual('C');
    });

    it('adding quality to chord', () => {
      const chord = new Chord({
        root: '7b',
        quality: 'm7',
      });

      expect(chord.display('Gb')).toEqual('Em7');
      expect(chord.display('F#')).toEqual('Em7');
    });

    it('adding additions to chord', () => {
      const chord = new Chord({
        root: '5#',
        quality: 'm7b5',
        additions: ['add9', 'add11'],
      });

      expect(chord.display('Bb')).toEqual('F#m7b5add9add11');
      expect(chord.display('A#')).toEqual('F#m7b5add9add11');
    });

    it('adding base to chord', () => {
      const chord = new Chord({
        root: '5#',
        quality: 'm7b5',
        additions: ['add9', 'add11'],
        base: '4',
      });

      expect(chord.display('Bb')).toEqual('F#m7b5add9add11/Eb');
      expect(chord.display('A#')).toEqual('F#m7b5add9add11/D#');
    });
  });
});
