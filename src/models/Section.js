import Line from './Line';
import createEl from '../helpers/createEl';

import { findFirstChildOfType, findChildrenOfType } from '../helpers/AST';

export default class Section {
  constructor({ label, lines }) {
    Object.assign(this, { label, lines });
  }

  toDOM({ key, cssClasses }) {
    return createEl(`div.${cssClasses.section}`, {
      children: [
        createEl(`div.${cssClasses.sectionLabel}`, { children: [this.label] }),
        ...this.lines.map(
          line => line.toDOM({ key, cssClasses }),
        ),
      ],
    });
  }

  static fromAST(sectionNode) {
    const sectionLabel = findFirstChildOfType(sectionNode, 'section_label');
    const lines = findChildrenOfType(sectionNode, 'line').map(Line.fromAST);

    return new Section({
      label: sectionLabel? sectionLabel.text.trim(): '',
      lines,
    });
  }
}
