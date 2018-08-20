const parseSelector = (selector) => ({
  tagName: selector.split(/[#.]/g)[0],
  id: (selector.match(/#[^.]*/g) || []).map(id => id.slice(1))[0],
  classes: (selector.match(/\.[^.#]*/g) || []).map(cls => cls.slice(1)),
});

export default function createEl(selector, {
  attrs = {},
  children = [],
} = {}) {
  const { id, tagName, classes } = parseSelector(selector);
  const el = document.createElement(tagName);

  if (id) el.id = id;

  Object.entries(attrs).forEach(([key, value]) => {
    if (value === true) value = '';
    el.setAttribute(key, value);
  });

  el.className = classes.join(' ');

  children.forEach(child => {
    if (typeof child === 'string') child = document.createTextNode(child);
    el.appendChild(child);
  });

  return el;
}
