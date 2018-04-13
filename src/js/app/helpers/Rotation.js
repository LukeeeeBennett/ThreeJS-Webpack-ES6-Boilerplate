export function stepRotation(rotation) {
  const nextY = rotation + -1.5708;

  if (nextY <= -(1.5708 * 4)) nextY = 0;

  return nextY;
}