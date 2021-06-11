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

  private patterns = {
    glider: [
      '2-0',
      '2-1',
      '2-2',
      '1-2',
      '0-1'
    ],
    'g-glider': [
      "24-0",
      "22-1",
      "24-1",
      "12-2",
      "13-2",
      "20-2",
      "21-2",
      "34-2",
      "35-2",
      "11-3",
      "15-3",
      "20-3",
      "21-3",
      "34-3",
      "35-3",
      "0-4",
      "1-4",
      "10-4",
      "16-4",
      "20-4",
      "21-4",
      "0-5",
      "1-5",
      "10-5",
      "14-5",
      "16-5",
      "17-5",
      "22-5",
      "24-5",
      "10-6",
      "16-6",
      "24-6",
      "11-7",
      "15-7",
      "12-8",
      "13-8"
    ],
    'cloverleaf': [
      "6-3",
      "8-3",
      "4-4",
      "5-4",
      "6-4",
      "8-4",
      "9-4",
      "10-4",
      "3-5",
      "7-5",
      "11-5",
      "3-6",
      "5-6",
      "9-6",
      "11-6",
      "4-7",
      "5-7",
      "7-7",
      "9-7",
      "10-7",
      "4-9",
      "5-9",
      "7-9",
      "9-9",
      "10-9",
      "3-10",
      "5-10",
      "9-10",
      "11-10",
      "3-11",
      "7-11",
      "11-11",
      "4-12",
      "5-12",
      "6-12",
      "8-12",
      "9-12",
      "10-12",
      "6-13",
      "8-13"
    ],
    pulsar: [
      "4-2",
      "5-2",
      "6-2",
      "10-2",
      "11-2",
      "12-2",
      "2-4",
      "7-4",
      "9-4",
      "14-4",
      "2-5",
      "7-5",
      "9-5",
      "14-5",
      "2-6",
      "7-6",
      "9-6",
      "14-6",
      "4-7",
      "5-7",
      "6-7",
      "10-7",
      "11-7",
      "12-7",
      "4-9",
      "5-9",
      "6-9",
      "10-9",
      "11-9",
      "12-9",
      "2-10",
      "7-10",
      "9-10",
      "14-10",
      "2-11",
      "7-11",
      "9-11",
      "14-11",
      "2-12",
      "7-12",
      "9-12",
      "14-12",
      "4-14",
      "5-14",
      "6-14",
      "10-14",
      "11-14",
      "12-14"
  ]
  }

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

  getPattern(pattern: string): Array<String> {
    if (this.patterns[pattern]) {
      return this.patterns[pattern];
    }
  }
}