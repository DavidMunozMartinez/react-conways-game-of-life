import './Canvas.scss';
import { useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CanvasService } from './CanvasComponent.service';
const canvasService = new CanvasService();
export interface ICanvasCallables {
  /**
   * Turns simulation on/off
   */
  toggle: () => void,
  /**
   * Fills the canvas with random true/false values.
   * @param chance defines the posibility of getting a true value
   */
  randomize: (chance: number) => void,
  /**
   * Clear the entire canvas.
   */
  clear: () => void,
  /**
   * Calculates next generation
   */
  next: () => void,
  /**
   * Renders example patterns
   */
  example: (pattern: string) => void
}

export function CanvasComponent(props: { callablesSetter: any}) {
  const config = useSelector((state: any) => state.config);
  const dispatch = useDispatch();
  const [running, setRunning] = useState(false);
  const [canvas, setCanvas] = useState(() => {
    return canvasService.makeCanvas(config.x, config.y, () => Math.random() > 0.7);
  });

  // Define all our canvas callables to send to parent
  const toggle = () => {
    setRunning(!running);
    dispatch({type: 'update', data: { prop: 'running', value: !running }})
    if (!running) {
      runningRef.current = true;
      simulate();
    }
  }
  const randomize = (chance: number) => {
    let newCanvas = canvasService.makeCanvas(config.x, config.y, () => Math.random() < chance);
    setCanvas(newCanvas);
  };
  const clear = () => {
    setRunning(false);
    let newCanvas = canvasService.makeCanvas(config.x, config.y, () => false);
    setCanvas(newCanvas);
  }
  const next = () => {
    let newCanvas = canvasService.nextGeneration(canvas);
    setCanvas(newCanvas);
  }

  const example = (name: string) => {
    if (running) {
      setRunning(false);
      dispatch({type: 'update', data: {prop: 'running', value: false}});
    }
    dispatch({type: 'update', data: {prop: 'speed', value: 50}});
    let pattern = canvasService.getPattern(name);
    let newCanvas = canvasService.makeCanvas(config.x,config.y, (x, y) => {
      return pattern.indexOf(`${x}-${y}`) > -1;
    });
    console.log(newCanvas);
    setCanvas(newCanvas);
  }
  if (props.callablesSetter) {
    let callables: ICanvasCallables = {
      toggle: toggle,
      randomize: randomize,
      next: next,
      clear: clear,
      example: example
    }
    props.callablesSetter(callables);
  }

  // Check if config canvas size changed to re-render the canvas with different values
  if (needsReRender()) {
    const newCanvas = canvasService.makeCanvas(config.x, config.y, () => false);
    setCanvas(newCanvas);
  }

  function mouseDown(i: number, j: number) {
    const newCanvas = JSON.parse(JSON.stringify(canvas));
    newCanvas[i][j] = !canvas[i][j];
    console.log([j, i]);
    setCanvas(newCanvas);
  }

  function mouseEnter(event: any, i: number, j: number) {
    const newCanvas = canvasService.clone(canvas);
    // If mouse left click is pressed toggle cells to true
    if (event.buttons === 1) {
      newCanvas[i][j] = true;
    }
    // If mouse right click is pressed toggle cells to false
    if (event.buttons === 2) {
      newCanvas[i][j] = false;
    }
    setCanvas(newCanvas);
  }

  /**
   * Checks is the config size is different than the canvas size
   * @returns boolean value
   */
  function needsReRender() {
    let xChanged = canvas[0] && canvas[0].length !== config.x;
    let yChanged = canvas.length !== config.y;
    return xChanged || yChanged;
  }

  const runningRef = useRef(running);
  const speedRef = useRef(config.speed);
  runningRef.current = running;
  speedRef.current = config.speed;
  /**
   * Runs simulation recursively until the running value is set to false
   */
  const simulate = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setCanvas(c => {
      return canvasService.nextGeneration(c);
    });
    setTimeout(simulate, speedRef.current);
  }, []);

  // function printPattern() {
  //   let pattern = [];
  //   canvas.forEach((row, y) => {
  //     row.forEach((col, x) => {
  //       if (col) {
  //         pattern.push(`${x}-${y}`);
  //       }
  //     });
  //   });

  //   console.log(pattern);
  // }

  return (
    <>
      <div className="CanvasComponent" draggable="false"
        onContextMenu={(e) => { e.preventDefault(); }}>
        <smart-hover query-selector=".cell" transition-time="100" transition-mode="ease-out" override-styles="true" draggable="false">
          {canvas.map((row, i) => <div key={i} className="row" draggable="false">
            {row.map((col, j) => <div key={`${i}-${j}`} className={`cell ${col ? 'alive' : ''}`} draggable="false"
              onMouseDown={() => { mouseDown(i, j) }}
              onMouseEnter={(event) => { mouseEnter(event, i, j) }}> </div>
            )}</div>
          )}
        </smart-hover>
        {/* Only used to save patterns */}
        {/* <button onClick={() => { printPattern() }}>Print pattern</button> */}
      </div>
    </>
  );
}
