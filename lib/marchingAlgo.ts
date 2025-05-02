import { Skia } from "@shopify/react-native-skia";
import simplify from "simplify-js";
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
  return pixels[index] > 10 ? 1 : 0; // Check if the alpha value is greater than 0
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
  let path: { x: number; y: number }[] = []; //here [number, number] is a tuple of x and y coordinates
  let dir = 0; // Start direction (0: right, 1: down, 2: left, 3: up)
  if (!(pixels instanceof Uint8Array)) {
    console.log("No pixels found");
    return;
  }
  outer: for (let y = 0; y < height - 1; y++) {
    for (let x = 0; x < width - 1; x++) {
      const current = isAlpha(x, y, width, height, pixels);
      const right = isAlpha(x + 1, y, width, height, pixels);
      const down = isAlpha(x, y + 1, width, height, pixels);
      const diag = isAlpha(x + 1, y + 1, width, height, pixels);
      const sum = right + down + diag;
      if (sum > 0 && sum < 3 && current === 1) {
        console.log("Sum: ", sum);
        path.push({ x, y });
        console.log("First edge pixel found at: ", x, y);
        tx = x;
        ty = y;
        break outer;
      }
    }
  }
  if (path.length === 0) {
    console.log("No edge pixel found");
    return;
  }
  let { x, y } = path[0];
  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];
  let loopCounter = 0;
  const MAX_LOOPS = width * height; // Maximum number of loops to prevent infinite loop
  do {
    if (loopCounter > MAX_LOOPS) break;
    loopCounter++;
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
          path.push({ x: nx, y: ny });
          dir = ndir;
          x = nx;
          y = ny;
          break;
        }
      }
    }
  } while (x !== path[0].x || y !== path[0].y);
  console.log("Path work completed");
  const outline = Skia.Path.Make();
  // path = smoothPointsChaikin(path, 2); // Smooth the path using Chaikin's algorithm
  path = simplify(path, 1.0, true); // Simplify the path using the simplify-js library
  outline.moveTo(path[0].x, path[0].y);
  for (let i = 0; i < path.length - 2; i += 2) {
    const p0 = path[i];
    const p1 = path[i + 1];
    const p2 = path[i + 2];
    outline.cubicTo(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y);
  }

  outline.close();
  // outline.offset(-1.5, -1.1); // Offset the path to create a border effect

  return outline;
}
