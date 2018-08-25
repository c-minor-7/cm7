import Section from './Section';
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
        section => section.toDOM({ key, cssClasses })
      ),
    });
  }

  static fromAST(ast) {
    const configs = findFirstChildOfType(ast, 'configs')
      .text.split('\n')
      .map(config => config.split('='))
      .reduce((acc, [key, value]) => ({
        ...acc,
        [key.trim()]: value.trim(),
      }), {});

    const sections = findFirstChildOfType(ast, 'song').children.map(Section.fromAST);

    return new Song({ configs, sections });
  }
}
