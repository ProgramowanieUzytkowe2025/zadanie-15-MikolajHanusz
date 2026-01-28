import React, { useEffect, useRef, useState } from 'react';
import { pathLength, randomPath } from './tspUtils';

export default function MonteCarloControl({ points, setBestPath, addHistory }) {
  const [running, setRunning] = useState(false);
  const [iterations, setIterations] = useState(0);

  const intervalRef = useRef(null);
  const bestPathRef = useRef(null);
  const bestLengthRef = useRef(Infinity);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const toggle = () => {
    if (running) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setRunning(false);
      return;
    }

    setRunning(true);

    intervalRef.current = setInterval(() => {
      setIterations(i => i + 1);

      const candidate = randomPath(points.length);
      const candidateLength = pathLength(points, candidate);
      addHistory(candidateLength);

      if (candidateLength < bestLengthRef.current) {
        bestLengthRef.current = candidateLength;
        bestPathRef.current = candidate;
        setBestPath(candidate);
      }
    }, 500);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <button onClick={toggle}>
        {running ? 'Przerwa' : 'Szukaj rozwiązania'}
      </button>

      <span style={{ marginLeft: 15 }}>
        Iteracje: {iterations}
      </span>
    </div>
  );
}
