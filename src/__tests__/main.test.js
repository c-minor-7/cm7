import Cm7 from '../main';

describe('cm7', () => {
  const src = `key=C

1
(L)ondon bridge is falling down`;

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should replace the content of the target element', async () => {
    const id = 'my-chord-displayer';
    const content = 'original content';

    document.body.innerHTML = `<div id="${id}">${content}</div>`;

    Cm7({
      el: `#${id}`,
      src,
    });

    expect(document.querySelector(`#${id}`).innerHTML).not.toBe(content);
  });

  it('should put the song into the target element', async () => {
    const id = 'my-awesome-chord-displayer';

    document.body.innerHTML = `<div id="${id}"></div>`;

    Cm7({
      el: `#${id}`,
      src,
    });

    expect(document.querySelector(`#${id}`).textContent).toBe(`C
London bridge is falling down`);
  });
});
