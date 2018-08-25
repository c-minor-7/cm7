import createEl from '../createEl';

describe.only('createEl', () => {
  describe('selector', () => {
    it('should create an element with tagName', () => {
      const el = createEl('div');
      expect(el.tagName.toLowerCase()).toBe('div');
    });

    it('should create an element with tagName.cls1.cls2', () => {
      const el = createEl('span.happy.sad');
      expect(el.tagName.toLowerCase()).toBe('span');
      expect(el.className.split(' ')).toEqual(['happy', 'sad']);
    });

    it('should create an element with tagName#id.cls1.cls2', () => {
      const el = createEl('section#wow.apple.banana');
      expect(el.tagName.toLowerCase()).toBe('section');
      expect(el.id).toBe('wow');
      expect(el.className.split(' ')).toEqual(['apple', 'banana']);
    });
  });

  describe('options', () => {
    /*
    it('should set the attributes based on opts.attrs', () => {
      const attrs = {
        yo: 'hi',
        mo: true,
      };

      const el = createEl('div', { attrs });

      expect(el.getAttribute('yo')).toBe('hi');
      expect(el.getAttribute('mo')).toBe('');
    });
    */

    it('should appendChild based on opts.children', () => {
      const child1 = createEl('div');
      const child2 = createEl('div');
      const text1 = 'hi';

      const el = createEl('div', {
        children: [child1, text1, child2],
      });

      expect(el.children.length).toBe(2);
      expect(el.children[0]).toEqual(child1);
      expect(el.children[1]).toEqual(child2);
      expect(el.textContent).toBe(text1);
    });
  });
});
