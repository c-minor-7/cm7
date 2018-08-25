export default function zip([x, ...xs], [y, ...ys]) {
  if (typeof x === 'undefined' || typeof y === 'undefined') return [];
  return [[x, y], ...zip(xs, ys)];
}
