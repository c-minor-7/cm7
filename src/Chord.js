const isValidNote = n => /^([ACDFG]#|[ABDEG]b|[A-G])$/.test(n);
const isValidRelativeNote = n => /^[1-7](#|b)?$/.test(n);
const isValidQuality = q => ['mM7', 'm7b5', 'm7', 'm', 'sus2', 'sus4', '7', 'M7', '6', '9', 'aug7', 'aug', 'dim7', 'dim'].includes(q);
const isValidAddition = a => /^add(#|b)?(2|4|6|9|11|13)/.test(a);

export default class Chord {
  constructor({ key, root, quality, additions, base }) {
    if (!isValidNote(key)) {
      throw Error(`Cm7: key (${key}) is not a valid note.`);
    }

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

    Object.assign(this, { key, root, quality, additions, base });
  }
}
