import { Raycaster as threeRaycaster } from 'three';
import { getMousePosition } from '../helpers/Interaction';

export default class Raycaster {
  constructor(interceptableObjects, camera) {
    this.camera = camera;
    this.raycaster = new threeRaycaster();
    this.interceptableObjects = interceptableObjects;
  }

  intersectObjects() {
    return this.raycaster.intersectObjects(this.interceptableObjects, false);
  }

  getIntersections(event) {
    const mousePosition = getMousePosition(event);

    this.raycaster.setFromCamera(mousePosition, this.camera);

    return this.intersectObjects();
  }

  addInterceptableObject(object) {
    return this.interceptableObjects.push(object.geometry.mesh);
  }
}
