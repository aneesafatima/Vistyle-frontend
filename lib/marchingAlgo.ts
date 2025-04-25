import { Skia } from "@shopify/react-native-skia";
function smoothPointsChaikin(
  points: [number, number][],
  iterations = 2
): [number, number][] {
  for (let iter = 0; iter < iterations; iter++) {
    const newPoints: [number, number][] = [];

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];

      const Q: [number, number] = [
        0.75 * p0[0] + 0.25 * p1[0],
        0.75 * p0[1] + 0.25 * p1[1],
      ];

      const R: [number, number] = [
        0.25 * p0[0] + 0.75 * p1[0],
        0.25 * p0[1] + 0.75 * p1[1],
      ];

      newPoints.push(Q);
      newPoints.push(R);
    }

    points = newPoints;
  }

  return points;
}
function isAlpha(
  x: number,
  y: number,
  width: number,
  height: number,
  pixels: Float32Array<ArrayBufferLike> | Uint8Array<ArrayBufferLike>
) {
  if (x < 0 || x >= width || y < 0 || y >= height) return 0;
  const index = (y * width + x) * 4 + 3; // Alpha channel index
  return pixels[index] > 128 ? 1 : 0; // Check if the alpha value is greater than 0
}
let tx: number, ty: number;
export function traceOutline(
  pixels:
    | Float32Array<ArrayBufferLike>
    | Uint8Array<ArrayBufferLike>
    | null
    | undefined,
  width: number,
  height: number
) {
  console.log("Tracing outline...");
  console.log("Width: ", width, " Height: ", height);
  let isChecked = new Set<string>();
  let path: [number, number][] = []; //here [number, number] is a tuple of x and y coordinates
  let dir = 0; // Start direction (0: right, 1: down, 2: left, 3: up)
  if (!(pixels instanceof Uint8Array)) {
    console.log("No pixels found");
    return;
  }
  // console.log("pixels first thousand: ", pixels.slice(1300000, 1350000));
  outer: for (let y = 0; y < height - 1; y++) {
    for (let x = 0; x < width - 1; x++) {
      const current = isAlpha(x, y, width, height, pixels);
      const right = isAlpha(x + 1, y, width, height, pixels);
      const down = isAlpha(x, y + 1, width, height, pixels);
      const diag = isAlpha(x + 1, y + 1, width, height, pixels);
      const sum = right + down + diag;
      if (sum > 0 && sum < 3 && current === 1) {
        console.log("Sum: ", sum);
        const index = (y * width + x) * 4;
        console.log(
          pixels[index],
          pixels[index + 1],
          pixels[index + 2],
          pixels[index + 3]
        );
        // Check if the pixel is not transparent (alpha > 0)
        path.push([x, y]);
        console.log("First edge pixel found at: ", x, y);
        tx = x;
        ty = y;
        break outer;
      }
    }
  }
  if (path.length === 0) {
    console.log("No edge pixel found");
    console.log(pixels[0], pixels[1], pixels[2], pixels[3]);
    return;
  }
  let [x, y] = path[0];
  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];
  let loopCounter = 0;
  const MAX_LOOPS = width * height; // Maximum number of loops to prevent infinite loop
  do {
    // console.log("Looping...");
    loopCounter++;
    if (loopCounter > MAX_LOOPS) break;
    isChecked.add(`${x},${y}`);
    for (let i = 0; i < 4; i++) {
      const ndir = (dir + i) % 4;
      const ny = y + dy[ndir];
      const nx = x + dx[ndir];
      if (
        isAlpha(nx, ny, width, height, pixels) &&
        !isChecked.has(`${nx},${ny}`)
      ) {
        const hasTransparentNeighbor =
          (ny > 0 && !isAlpha(nx, ny - 1, width, height, pixels)) || // Top
          (ny < height - 1 && !isAlpha(nx, ny + 1, width, height, pixels)) || // Bottom
          (nx > 0 && !isAlpha(nx - 1, ny, width, height, pixels)) || // Left
          (nx < width - 1 && !isAlpha(nx + 1, ny, width, height, pixels)) || // Right
          (nx > 0 &&
            ny > 0 &&
            !isAlpha(nx - 1, ny - 1, width, height, pixels)) || // Top-left
          (nx < width - 1 &&
            ny > 0 &&
            !isAlpha(nx + 1, ny - 1, width, height, pixels)) || // Top-right
          (nx > 0 &&
            ny < height - 1 &&
            !isAlpha(nx - 1, ny + 1, width, height, pixels)) || // Bottom-left
          (nx < width - 1 &&
            ny < height - 1 &&
            !isAlpha(nx + 1, ny + 1, width, height, pixels)); // Bottom-right

        if (hasTransparentNeighbor) {
          path.push([nx, ny]);
          dir = ndir;
          x = nx;
          y = ny;
          break;
        }
      }
    }
  } while (x !== path[0][0] || y !== path[0][1]); // Loop until we return to the starting point
  console.log("Path: ", path.length);
  console.log("Path work completed");
  const outline = Skia.Path.Make();
  path = smoothPointsChaikin(path, 2); // Smooth the path using Chaikin's algorithm
  outline.moveTo(path[0][0], path[0][1]);
  for (let i = 0; i < path.length - 2; i += 3) {
    const p0 = path[i];
    const p1 = path[i + 1];
    const p2 = path[i + 2];
    outline.cubicTo(p0[0], p0[1], p1[0], p1[1], p2[0], p2[1]);
  }

  outline.close();
  outline.offset(-1.5, 1.5); // Offset the path to create a border effect

  return outline;
}
