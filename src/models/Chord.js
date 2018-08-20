import createEl from '../helpers/createEl';
import { findChildrenOfType, findFirstChildOfType } from '../helpers/AST';

const isValidRelativeNote = n => /^[1-7](#|b)?$/.test(n);
const isValidQuality = q => ['mM7', 'm7b5', 'm7', 'm', 'sus2', 'sus4', '7', 'M7', '6', '9', 'aug7', 'aug', 'dim7', 'dim'].includes(q);
const isValidAddition = a => /^add(#|b)?(2|4|6|9|11|13)/.test(a);

const relativeToAbsoluteNote = (relativeNote, key) => {
  const resolveNote = note => {
    if (!/(bb|##)/.test(note)) return note;

    const accBaseNote = baseNote => {
      const a = String.fromCharCode(baseNote.charCodeAt(0) + 1);
      if (a === 'H') return 'A';
      return a;
    };

    const decBaseNote = baseNote => {
      const a = String.fromCharCode(baseNote.charCodeAt(0) - 1);
      if (a === '@') return 'G';
      return a;
    };

    const baseNote = note.match(/[A-G]/)[0];

    if (/##/.test(note)) return accBaseNote(baseNote);
    if (/bb/.test(note)) return decBaseNote(baseNote);
    throw Error(`Cm7: shouldn't have reached here... ermmmmm...`);
  };

  const SCALES = {
    'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    'Db': ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
    'D': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
    'Eb': ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
    'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
    'F': ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
    'F#': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'F'],
    'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
    'Ab': ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
    'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
    'Bb': ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
    'B': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
  };

  const relativeNeutralNote = Number.parseInt(relativeNote);
  const sharpOrFlatOrNone = (relativeNote.match(/[#b]/) || [''])[0];

  if (!relativeNeutralNote || relativeNeutralNote < 0) throw Error(
    `Cm7: relativeNote (${relativeNote}) is not valid.`
  );

  if (!(key in SCALES)) throw Error(
    `Cm7: key (${key}) is not valid key. Please choose from ` +
    Object.keys(SCALES).join(', ') + '.'
  );

  return resolveNote(SCALES[key][(relativeNeutralNote - 1) % 7] + sharpOrFlatOrNone);
};

export default class Chord {
  constructor({ root, quality, additions, base }) {
    if (!isValidRelativeNote(root)) {
      throw Error(`Cm7: root (${root}) is not a valid relative note.`);
    }

    if (quality !== '' && !isValidQuality(quality)) {
      throw Error(`Cm7: quality (${quality}) is not a valid quality.`);
    }

    for (const addition of additions) {
      if (!isValidAddition(addition)) {
        throw Error(`Cm7: addition (${addition}) is not a valid addition.`);
      }
    }

    if (base !== '' && !isValidRelativeNote(base)) {
      throw Error(`Cm7: base (${base}) is not a valid relative note.`);
    }

    Object.assign(this, { root, quality, additions, base });
  }

  display(key) {
    const { root, quality, additions, base } = this;

    const baseDisplay = base === ''
      ? ''
      : '/' + relativeToAbsoluteNote(base, key);

    return relativeToAbsoluteNote(root, key) +
      quality +
      additions.join('') +
      baseDisplay;
  }

  toDOM(key) {
    return createEl('span.cm7_chord', {
      children: [this.display(key)],
    });
  }

  static fromAST(chordNode) {
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
  }
}
