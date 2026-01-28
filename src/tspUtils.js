export function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function pathLength(points, path) {
  let sum = 0;
  for (let i = 0; i < path.length - 1; i++) {
    sum += distance(points[path[i]], points[path[i + 1]]);
  }
  // powrót do punktu startowego
  sum += distance(points[path[path.length - 1]], points[path[0]]);
  return sum;
}

export function randomPath(n) {
  const arr = [...Array(n).keys()];
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
