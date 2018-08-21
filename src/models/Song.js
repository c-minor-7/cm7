import Chord from './Chord';
import Line from './Line';
import createEl from '../helpers/createEl';

import { findFirstChildOfType } from '../helpers/AST';

export default class Song {
  constructor({ configs, sections }) {
    Object.assign(this, { configs, sections });
  }

  toDOM({ cssClasses }) {
    const { key } = this.configs;
    return createEl(`div.${cssClasses.song}`, {
      children: this.sections.map(
        lines => createEl(`div.${cssClasses.section}`, {
          children: lines.map(line => line.toDOM({ key, cssClasses })),
        }),
      ),
    });
  }

  static fromAST(ast) {
    const configs = findFirstChildOfType(ast, 'configs')
      .text.split('\n')
      .map(config => config.split('='))
      .reduce((acc, [key, value]) => ({
        ...acc,
        [key]: value,
      }), {});

    const sections = findFirstChildOfType(ast, 'song').children.map(
      sectionNode => sectionNode.children.map(Line.fromAST)
    );

    return new Song({ configs, sections });
  }
}
