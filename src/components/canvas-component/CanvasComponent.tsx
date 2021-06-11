import './Canvas.scss';
import { useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';

const operations = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
];

function CanvasComponent() {
  const config = useSelector((state: any) => state.config);
  const [running, setRunning] = useState(false);
  const [canvas, setCanvas] = useState(() => {
    return makeCanvas(false);
  });

  if (needsReRender()) {
    setCanvas(makeCanvas(true));
  }

  function makeCanvas(empty) {
    return Array.from(Array(config.y), () => Array.from(Array(config.x), () => empty ? false : Math.random() > 0.8))
  }

  function nextGeneration(c: boolean[][]) {
    if (needsReRender()) {
      setRunning(false);
      return makeCanvas(false);
    }
    let newCanvas = JSON.parse(JSON.stringify(c));
    for (let i = 0; i < c.length; i++) {
      for (let j = 0; j < c[i].length; j++) {
        let aliveBros = 0;
        operations.forEach(([x, y]) => {
          let neigbourX = i + x;
          let neigbourY = j + y;
          // Check bounds
          if (neigbourX >= 0 && neigbourX < config.y && neigbourY >= 0 && neigbourY < config.x) {
            aliveBros = c[neigbourX][neigbourY] ? aliveBros + 1 : aliveBros;
          }
        });

        // Update cell state
        if (aliveBros < 2 || aliveBros > 3) {
          newCanvas[i][j] = false;
        }
        else if (!canvas[i][j] && aliveBros === 3) {
          newCanvas[i][j] = true;
        }
      }
    }

    return newCanvas;
  }

  function mouseEnter(event: any, i: number, j: number) {
    const newCanvas = JSON.parse(JSON.stringify(canvas));

    if (event.buttons === 1) {
      newCanvas[i][j] = true;
    }

    if (event.buttons === 2) {
      newCanvas[i][j] = false;
    }

    setCanvas(newCanvas);
  }

  function needsReRender() {
    return (canvas.length !== config.y) || (canvas[0] && canvas[0].length !== config.x);
  }

  const runningRef = useRef(running);
  const speedRef = useRef(config.speed);
  runningRef.current = running;
  speedRef.current = config.speed;

  const simulate = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setCanvas(c => {
      return nextGeneration(c);
    });
    setTimeout(simulate, speedRef.current);
  }, []);

  return (
    <>
      <div className="CanvasComponent" draggable="false"
        onContextMenu={(e) => { e.preventDefault(); }}>
        <smart-hover query-selector=".cell" transition-time="100" transition-mode="ease-out" override-styles="true">
          {canvas.map((row, i) => {
            return (
              <div key={i} className="row" draggable="false">{
                row.map((col, j) => {
                  return <div
                    draggable="false"
                    key={`${i}-${j}`}
                    className={`cell ${col ? 'alive' : ''}`}
                    onMouseDown={() => {
                      const newCanvas = JSON.parse(JSON.stringify(canvas));
                      newCanvas[i][j] = !canvas[i][j];
                      setCanvas(newCanvas);
                    }}
                    onMouseEnter={(event) => { mouseEnter(event, i, j) }}> </div>
                })
              }</div>
            )
          })}
        </smart-hover>
        <button onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            simulate();
          }
        }}> {running ? 'stop' : 'play'} </button>
        <button onClick={() => {
          setRunning(false);
          setCanvas(makeCanvas(true));
        }}>clear</button>
      </div>
    </>
  );
}

export default CanvasComponent;