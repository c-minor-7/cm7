import zip from '../zip';

describe.only('zip', () => {
  it('should zip two arrays', () => {
    expect(zip([1,2,3], ['a', 'b', 'c'])).toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);
  });

  it('should zip two arrays', () => {
    expect(zip(
      Array.from({ length: 10 }, (_, i) => i),
      Array.from({ length: 10 }, (_, i) => i + 10)
    )).toEqual([
      [0, 10],
      [1, 11],
      [2, 12],
      [3, 13],
      [4, 14],
      [5, 15],
      [6, 16],
      [7, 17],
      [8, 18],
      [9, 19],
    ]);
  });

  it('should zip two arrays with different sizes', () => {
    expect(zip(
      Array.from({ length: 20 }, (_, i) => i),
      Array.from({ length: 10 }, (_, i) => i + 10)
    )).toEqual([
      [0, 10],
      [1, 11],
      [2, 12],
      [3, 13],
      [4, 14],
      [5, 15],
      [6, 16],
      [7, 17],
      [8, 18],
      [9, 19],
    ]);
  });
});
