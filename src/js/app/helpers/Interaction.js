import { Vector2 } from 'three';

export function getMousePosition(event) {
  const mousePosition = new Vector2();

  const mousePositionX = event.clientX / window.innerWidth * 2 - 1;
  const mousePositionY = -(event.clientY / window.innerHeight) * 2 + 1;

  mousePosition.set(mousePositionX, mousePositionY);

  return mousePosition;
}