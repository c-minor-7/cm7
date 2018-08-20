import createEl from '../helpers/createEl';
import { findChildrenOfType, findFirstChildOfType } from '../helpers/AST';

const isValidRelativeNote = n => /^[1-7](#|b)?$/.test(n);
const isValidQuality = q => ['mM7', 'm7b5', 'm7', 'm', 'sus2', 'sus4', '7', 'M7', '6', '9', 'aug7', 'aug', 'dim7', 'dim'].includes(q);
const isValidAddition = a => /^add(#|b)?(2|4|6|9|11|13)/.test(a);

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
    // TODO: display this chord corresponds to that key
    return 'C';
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
