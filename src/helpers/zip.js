export default function zip([x, ...xs], [y, ...ys]) {
  if (!x || !y) return [];
  return [[x, y], ...zip(xs, ys)];
}
