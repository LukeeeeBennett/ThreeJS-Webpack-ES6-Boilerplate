import {
  Raycaster as threeRaycaster,
  Vector3,
} from 'three';
import {
  getMousePosition,
  gridPosition,
  gridYPosition,
} from '../helpers/Interaction';

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

    this.currentIntersections = this.intersectObjects();
    this.currentIntersection = this.currentIntersections[0];

    return this.currentIntersections;
  }

  addInterceptableObject(object) {
    this.interceptableObjects.push(object.geometry.mesh);
  }

  isIntersectingTheGround() {
    return this.currentIntersection.object.geometry.__baf__type === 'Ground';
  }

  currentGridPosition() {
    return new Vector3(
      gridPosition(this.currentIntersection.point.x),
      gridYPosition(this.currentIntersection.point.y),
      gridPosition(this.currentIntersection.point.z)
    );
  }
}
