import Cm7 from '../main';

describe('cm7', () => {
  const src = `key=C

1 1M7/3
(L)ondon bridge is (f)alling down
2m 4madd4/7b
(F)alling (d)own
1
(F)alling down

1
(L)ondon bridge is falling down
2m
(F)alling down
1
(F)alling down`;

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should replace the content of the target element that match snapshot', async () => {
    const id = 'my-chord-displayer';
    const content = 'original content';

    document.body.innerHTML = `<div id="${id}">${content}</div>`;

    Cm7({
      el: `#${id}`,
      src,
    });

    const innerHTML = document.querySelector(`#${id}`).innerHTML;
    expect(innerHTML).not.toBe(content);
    expect(innerHTML).toMatchSnapshot();
  });
});
