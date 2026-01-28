export function parseTSP(text) {
  const lines = text.split('\n');
  const points = [];
  let reading = false;

  for (const line of lines) {
    if (line.startsWith('NODE_COORD_SECTION')) {
      reading = true;
      continue;
    }
    if (line.startsWith('EOF')) break;

    if (reading) {
      const parts = line.trim().split(/\s+/);
      if (parts.length === 3) {
        const [, x, y] = parts;
        points.push({
          x: parseFloat(x),
          y: parseFloat(y),
        });
      }
    }
  }
  return points;
}
