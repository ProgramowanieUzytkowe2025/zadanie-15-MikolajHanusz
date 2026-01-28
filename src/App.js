import React, { useState } from 'react';
import TSPVisualizer from './TSPVisualizer';
import TSPSolution from './TSPSolution';
import MonteCarloControl from './MonteCarloControl';
import { parseTSP } from './tspParser';
import { randomPath } from './tspUtils';
import Chart from './QualityChart';

function App() {
  const [points, setPoints] = useState([]);
  const [bestPath, setBestPath] = useState([]);
  const [history, setHistory] = useState([]);



  const handleFile = e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = ev => {
      const pts = parseTSP(ev.target.result);
      setPoints(pts);
      setBestPath(randomPath(pts.length)); // rozwiązanie początkowe
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ padding: 20 }}>
      <input type="file" accept=".txt" onChange={handleFile} />

      <TSPVisualizer points={points} path={bestPath}/>

      <TSPSolution points={points} path={bestPath} />

      {points.length > 0 && (
        <>
          <MonteCarloControl
            points={points}
            bestPath={bestPath}
            setBestPath={setBestPath}
            addHistory={value =>
              setHistory(h => [...h, value])
            }
          />
          <Chart data={history} />
        </>
      )}
    </div>
  );
}

export default App;
