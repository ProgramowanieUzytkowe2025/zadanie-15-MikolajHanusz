import React from 'react';
import { pathLength } from './tspUtils';

export default function TSPSolution({ points, path }) {
  if (!path || path.length === 0) return null;

  const length = pathLength(points, path).toFixed(2);

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Rozwiązanie</h2>

      <div style={{ fontFamily: 'monospace', marginBottom: 10 }}>
        {path.map(i => i + 1).join(' → ')}
      </div>

      <div>
        <strong>Długość trasy:</strong> {length}
      </div>
    </div>
  );
}
