import './Canvas.scss';
import { useState } from 'react';

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];


function CanvasComponent(props: {x: number, y: number}) {
  
  const [intervalId, setIntervalId]: any = useState(null);
  const [canvas, setCanvas] = useState( () => {
    const rows = []
    for (let i = 0; i < props.x; i++) {
      rows.push(Array.from(Array(props.y), () => Math.random() > 0.5))
    }
    return rows;
  });

  function simulate() {
    let newCanvas = canvas.slice();
    canvas.forEach((row, i) => row.forEach((col, j) => {
      let aliveBros = 0;
      operations.forEach(([x, y]) => {
        let neighbourI = i + x;
        let neighbourJ = j + y;

        // Check bounds
        if (neighbourI >= 0 && neighbourI < props.x && neighbourJ >= 0 && neighbourJ < props.y) {
          aliveBros = canvas[neighbourI][neighbourJ] ? aliveBros + 1 : aliveBros;
        }

        // Update cell state
        if (aliveBros < 2 || aliveBros > 3) {
          newCanvas[i][j] = false;
        }
        else if (!canvas[i][j] && aliveBros === 3) {
          newCanvas[i][j] = true;
        }
      });
    }));

    setCanvas(newCanvas);
  }

  // Toggles simulation on or off
  function toggleSimulation() {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    else {
      // Execute once before interval for immediate feedback
      simulate();
      setIntervalId(setInterval(() => {
        simulate();
      }, 1000));
    }
  }

  function mouseEnter(event: any, i: number, j: number) {
    let newCanvas = canvas.slice();
    let status = canvas[i][j];

    if (event.buttons === 1 && !status) {
      newCanvas[i][j] = true;
    }

    if (event.buttons === 2 && status) {
      newCanvas[i][j] = false;
    }

    setCanvas(newCanvas);
  }

  return (
    <>
    <div className="CanvasComponent"
    onContextMenu={ (e) => {e.preventDefault();} }>
      {canvas.map((row, i) => {
        return (
          <div key={i} className="row">{
            row.map((col, j) => {
              return <div 
                key={`${i}-${j}`}
                className={`cell ${col ? 'alive' : ''}`}
                onClick={() => {
                  let newCanvas = canvas.slice();
                  newCanvas[i][j] = !canvas[i][j];
                  setCanvas(newCanvas);
                }}
                onMouseEnter={ (event) => { mouseEnter(event, i, j) } }> </div>
            })
          }</div>
          )
        })}
    </div>
    <button className="toggle-sim-btn" onClick={() => { 
        toggleSimulation();
      }}> {intervalId ? 'Stop' : 'Play'} </button>
    </>
  );
}

export default CanvasComponent;