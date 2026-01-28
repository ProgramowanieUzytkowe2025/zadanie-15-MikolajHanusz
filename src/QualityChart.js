import React from 'react';

const WIDTH = 600;
const HEIGHT = 300;
const PADDING = 40;
const TICKS = 5;

export default function Chart({ data }) {
  if (data.length === 0) return null;

  const maxX = data.length - 1;
  const minY = Math.min(...data);
  const maxY = Math.max(...data);

  const scaleX = x =>
    PADDING + (x / maxX) * (WIDTH - 2 * PADDING || 1);

  const scaleY = y =>
    HEIGHT - PADDING -
    ((y - minY) / (maxY - minY || 1)) * (HEIGHT - 2 * PADDING);

  const polylinePoints = data
    .map((y, x) => `${scaleX(x)},${scaleY(y)}`)
    .join(' ');

  return (
    <div style={{ marginTop: 30 }}>
      <h2>Jakość rozwiązania</h2>

      <svg width={WIDTH} height={HEIGHT} style={{ border: '1px solid #ccc' }}>
        {/* osie */}
        <line x1={PADDING} y1={PADDING} x2={PADDING} y2={HEIGHT - PADDING} stroke="black" />
        <line x1={PADDING} y1={HEIGHT - PADDING} x2={WIDTH - PADDING} y2={HEIGHT - PADDING} stroke="black" />

        {/* oś Y – wartości */}
        {Array.from({ length: TICKS + 1 }).map((_, i) => {
          const value = minY + (i / TICKS) * (maxY - minY);
          const y = scaleY(value);

          return (
            <g key={i}>
              <line
                x1={PADDING - 5}
                x2={PADDING}
                y1={y}
                y2={y}
                stroke="black"
              />
              <text
                x={PADDING - 8}
                y={y + 4}
                fontSize="10"
                textAnchor="end"
              >
                {value.toFixed(0)}
              </text>
            </g>
          );
        })}

        {/* oś X – iteracje */}
        {Array.from({ length: TICKS + 1 }).map((_, i) => {
          const value = Math.round((i / TICKS) * maxX);
          const x = scaleX(value);

          return (
            <g key={i}>
              <line
                y1={HEIGHT - PADDING}
                y2={HEIGHT - PADDING + 5}
                x1={x}
                x2={x}
                stroke="black"
              />
              <text
                x={x}
                y={HEIGHT - PADDING + 15}
                fontSize="10"
                textAnchor="middle"
              >
                {value}
              </text>
            </g>
          );
        })}

        {/* wykres */}
        <polyline
          fill="none"
          stroke="steelblue"
          strokeWidth="2"
          points={polylinePoints}
        />
      </svg>
    </div>
  );
}
