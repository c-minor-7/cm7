const parseSelector = (selector) => ({
  tagName: selector.split(/[#.]/g)[0],
  id: (selector.match(/#[^.]*/g) || []).map(id => id.slice(1))[0],
  classes: (selector.match(/\.[^.#]*/g) || []).map(cls => cls.slice(1)),
});

export default function createEl(selector, {
  children = [],
} = {}) {
  const { tagName, id, classes } = parseSelector(selector);
  const el = document.createElement(tagName);

  // populate the id
  if (id) el.id = id;

  // populate the class
  el.className = classes.join(' ');

  // append children
  children.forEach(child => {
    if (typeof child === 'string') child = document.createTextNode(child);
    el.appendChild(child);
  });

  return el;
}
