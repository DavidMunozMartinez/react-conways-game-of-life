export class CanvasService {
  /**Array of operations to calculate all 8 neighbour positions
   * in a 2d Array.
   */
  private operations = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ];

  /**
   * Creates a 2D array with a specific x and y length, with specified values.
   * @param x X value length for canvas
   * @param y Y value length for canvas
   * @param fillFn fill function that will assign values to each canvas position
   * @returns New 2D Array filled with values based on the fill fn, else it returns empty values
   */
  makeCanvas(x, y, fillFn: (x: number, y: number) => any) {
    return Array.from(Array(y), (val, i) => Array.from(Array(x), (val, j) => { return fillFn(j, i) }));
  }

  /**
   * Calculates next generation based on Conway's game of life rules
   * @param canvas 2D array that will be evaluated
   * @returns new canvas with updated values
   */
  nextGeneration(canvas: boolean[][]) {
    let newCanvas: boolean[][] = JSON.parse(JSON.stringify(canvas));

    for (let i = 0; i < canvas.length; i++) {
      for (let j = 0; j < canvas[i].length; j++) {
        let aliveBros = 0;
        this.operations.forEach(([x, y]) => {
          let neigbourX = i + x;
          let neigbourY = j + y;
          // Check bounds
          let inBoundsX = neigbourX >= 0 && neigbourX < canvas.length;
          let inBoundsY = neigbourY >= 0 && (canvas[0] && neigbourY < canvas[0].length);
          if (inBoundsX && inBoundsY) {
            aliveBros = canvas[neigbourX][neigbourY] ? aliveBros + 1 : aliveBros;
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

  /**
   * Clones a given object
   * @param source Object to clone
   * @returns new instance of source object
   */
  clone(source: any) {
    return JSON.parse(JSON.stringify(source));
  }
}