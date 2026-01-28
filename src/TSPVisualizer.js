import React from 'react';
import { useState } from 'react';

const WIDTH = 600;
const HEIGHT = 600;
const PADDING = 40;

export default function TSPVisualizer({ points, path }) {
  const [showSolution, setShowSolution] = useState(false);
  if (points.length === 0) return null;

  const xs = points.map(p => p.x);
  const ys = points.map(p => p.y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const scaleX = (WIDTH - 2 * PADDING) / (maxX - minX);
  const scaleY = (HEIGHT - 2 * PADDING) / (maxY - minY);
  const scale = Math.min(scaleX, scaleY);

  const transform = p => ({
    x: PADDING + (p.x - minX) * scale,
    y: HEIGHT - (PADDING + (p.y - minY) * scale),
  });

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Wizualizacja problemu</h2>
      <button
        onClick={() => setShowSolution(s => !s)}
        style={{ marginTop: 10 }}
        >
        {showSolution ? 'Ukryj rozwiązanie' : 'Pokaż rozwiązanie'}
    </button>
    <br></br>


      <svg width={WIDTH} height={HEIGHT} style={{ border: '1px solid #ccc' }}>
  {/* połączenia rozwiązania */}
  {showSolution && path && path.length > 0 &&
    path.map((idx, i) => {
      const from = transform(points[idx]);
      const to = transform(points[path[(i + 1) % path.length]]);

      return (
        <line
          key={i}
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          stroke="crimson"
          strokeWidth={2}
        />
      );
    })}

  {/* punkty */}
  {points.map((p, i) => {
    const tp = transform(p);
    return (
      <circle
        key={i}
        cx={tp.x}
        cy={tp.y}
        r={4}
        fill="steelblue"
      />
    );
  })}
</svg>

    </div>
  );
}
