import { Skia } from "@shopify/react-native-skia";
function isAlpha(
  x: number,
  y: number,
  width: number,
  height: number,
  pixels: Float32Array<ArrayBufferLike> | Uint8Array<ArrayBufferLike>
) {
  if (x < 0 || x >= width || y < 0 || y >= height) return 0;
  const index = (y * width + x) * 4 + 3; // Alpha channel index
  return pixels[index]; // Check if the alpha value is greater than 0
}

function traceOutline(
  pixels:
    | Float32Array<ArrayBufferLike>
    | Uint8Array<ArrayBufferLike>
    | null
    | undefined,
  width: number,
  height: number
) {
  let isChecked = new Set<string>();
  let path: [number, number][] = []; //here [number, number] is a tuple of x and y coordinates
  let dir = 0; // Start direction (0: right, 1: down, 2: left, 3: up)
  if (!pixels) return;
  outer: for (let y = 0; y < height - 1; y++) {
    for (let x = 0; x < width - 1; x++) {
      const current = isAlpha(x, y, width, height, pixels);
      const right = isAlpha(x + 1, y, width, height, pixels);
      const down = isAlpha(x, y + 1, width, height, pixels);
      const diag = isAlpha(x + 1, y + 1, width, height, pixels);
      const sum = current + right + down + diag;
      if (sum > 0 && sum < 255 * 4) {
        path.push([x, y]);
        break outer;
      }
    }
  }
  if (path.length === 0) return;
  let [x, y] = path[0];
  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];
  do {
    isChecked.add(`${x},${y}`);
    for (let i = 0; i < 4; i++) {
      const ndir = (dir + i) % 4;
      const ny = y + dy[ndir];
      const nx = x + dy[ndir];
      if (isAlpha(nx, ny, width, height, pixels)) {
        const neighbors = [
          ny > 0 && !isAlpha(nx, ny - 1, width, height, pixels), // Top
          ny < height - 1 && !isAlpha(nx, ny + 1, width, height, pixels), // Bottom
          nx > 0 && !isAlpha(nx - 1, ny, width, height, pixels), // Left
          nx < width - 1 && !isAlpha(nx + 1, ny, width, height, pixels), // Right
        ];
        if (neighbors.some((n) => n)) {
          path.push([x, y]);
          dir = ndir;
          x = nx;
          y = ny;
        }
      }
    }
  } while (x !== path[0][0] || y !== path[0][1]);

  const outline = Skia.Path.Make();
  outline.moveTo(path[0][0], path[0][1]);
  for (let i = 1; i < path.length; i++) {
    outline.lineTo(path[i][0], path[i][1]);
    outline.offset(3, 3); // Move the path slightly outward (a stroke effect)
  }
  outline.close();
  outline.offset(3, 3);
  return outline;
}
