export const pieceCount = 60;

type Point = readonly [x: number, y: number];

export interface ProcessPiece {
  x: number;
  y: number;
  z: number;
  angle: number;
  width: number;
  height: number;
  depth: number;
}

function piece(x: number, y: number, z: number, angle: number, width: number, height = 0.22, depth = 0.23): ProcessPiece {
  return { x, y, z, angle, width, height, depth };
}

function discovery(index: number): ProcessPiece {
  if (index < 48) {
    const layer = Math.floor(index / 16);
    const angle = ((index % 16) + layer * 0.32) * Math.PI / 8;
    const radius = 1.36 - layer * 0.11;
    return piece(-0.42 + Math.cos(angle) * radius, 0.28 + Math.sin(angle) * radius,
      (layer - 1) * 0.34, angle + Math.PI / 2, 0.52 - layer * 0.04);
  }

  const handle = index - 48;
  return piece(0.64 + (handle % 6) * 0.2, -0.55 - (handle % 6) * 0.18,
    Math.floor(handle / 6) * 0.29 - 0.09, -Math.PI / 4, 0.34, 0.24);
}

function design(index: number): ProcessPiece {
  const layer = Math.floor(index / 20) - 1;
  const side = Math.floor((index % 20) / 5);
  const offset = ((index % 5) + 0.5) / 5;
  const corners: Point[] = [[-1.55, 1.0], [1.55, 1.0], [1.55, -1.0], [-1.55, -1.0]];
  const [x1, y1] = corners[side];
  const [x2, y2] = corners[(side + 1) % 4];
  return piece(x1 + (x2 - x1) * offset + layer * 0.52, y1 + (y2 - y1) * offset + layer * 0.37,
    layer * 0.43, Math.atan2(y2 - y1, x2 - x1), side % 2 === 0 ? 0.54 : 0.34, 0.17, 0.2);
}

function build(index: number): ProcessPiece {
  const x = (index % 5 - 2) * 0.65;
  const layer = Math.floor(index / 20);
  const row = Math.floor((index % 20) / 5);
  return piece(x + (layer - 1) * 0.15 - (row - 1.5) * 0.12,
    (layer - 1) * 0.72 + (row - 1.5) * 0.26, (row - 1.5) * 0.63, 0, 0.51, 0.33, 0.47);
}

function launch(index: number): ProcessPiece {
  const level = Math.floor(index / 20);
  const side = index % 20 < 10 ? -1 : 1;
  const t = (index % 10 + 0.35) / 10;
  return piece(side * t * (1.76 - level * 0.16), level * 0.83 - 0.39 - t * 0.93,
    (level - 1) * 0.42 + 0.22 * Math.sin(t * Math.PI), side * -0.51, 0.24, 0.26, 0.31);
}

function trace(points: readonly Point[], amount: number) {
  const lengths = points.slice(1).map(([x, y], i) => Math.hypot(x - points[i][0], y - points[i][1]));
  let remaining = lengths.reduce((sum, length) => sum + length, 0) * amount;
  let edge = 0;
  while (edge < lengths.length - 1 && remaining > lengths[edge]) remaining -= lengths[edge++];
  const [x, y] = points[edge];
  const dx = points[edge + 1][0] - x;
  const dy = points[edge + 1][1] - y;
  const t = remaining / lengths[edge];
  return { x: x + dx * t, y: y + dy * t, angle: Math.atan2(dy, dx) };
}

const shield: Point[] = [
  [-1.45, 0.95], [0, 1.59], [1.45, 0.95], [1.39, -0.12],
  [1.08, -0.83], [0, -1.51], [-1.08, -0.83], [-1.39, -0.12], [-1.45, 0.95],
];
const check: Point[] = [[-0.64, 0.06], [-0.2, -0.42], [0.74, 0.55]];

function support(index: number): ProcessPiece {
  if (index < 44) {
    const layer = Math.floor(index / 22);
    const { x, y, angle } = trace(shield, (index % 22 + 0.5) / 22);
    return piece(x * (1 - layer * 0.09), y * (1 - layer * 0.09), layer * 0.48 - 0.25,
      angle, 0.38, 0.23, 0.3);
  }
  const { x, y, angle } = trace(check, (index - 44 + 0.5) / 16);
  return piece(x, y, 0.31 + (index % 2) * 0.12, angle, 0.2, 0.27, 0.28);
}

const columnHeights = [2, 3, 4, 6];
const growth: Point[] = [[-1.67, -0.04], [-0.57, 0.29], [0.54, 0.73], [1.66, 1.57]];

function optimize(index: number): ProcessPiece {
  if (index >= 45) {
    const { x, y, angle } = trace(growth, (index - 45 + 0.5) / 15);
    return piece(x, y, 0.3, angle, 0.23, 0.16, 0.2);
  }

  let slot = Math.floor(index / 3);
  let column = 0;
  while (slot >= columnHeights[column]) slot -= columnHeights[column++];
  return piece((column - 1.5) * 1.09, -1.48 + slot * 0.39, (index % 3 - 1) * 0.27,
    0, 0.66, 0.3, 0.23);
}

export const formations = [discovery, design, build, launch, support, optimize].map((form) =>
  Array.from({ length: pieceCount }, (_, index) => form(index)),
);

export function pieceTone(stage: number, index: number, accent: string) {
  const isSignal = (stage === 4 && index >= 44) || (stage === 5 && index >= 45);
  if (isSignal || index % 13 < 3) return accent;
  return index % 5 === 0 ? "#7897b8" : "#d6e7f5";
}
