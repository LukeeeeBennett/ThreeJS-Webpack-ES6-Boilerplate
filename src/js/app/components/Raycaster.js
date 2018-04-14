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

  currentGridPosition() {
    return new Vector3(
      gridPosition(this.currentIntersection.point.x),
      gridYPosition(this.currentIntersection.point.y),
      gridPosition(this.currentIntersection.point.z)
    );
  }

  isIntersectingGround() {
    return this.currentIntersection.object.geometry.__baf__type === 'Ground';
  }

  isIntersectingObject() {
    return !!this.currentIntersection.object.geometry.vertices;
  }

  isIntersectingBuildingBox() {
    return this.isIntersectingObject() && this.currentIntersection.object.geometry.__baf__type === 'BuildingBox';
  }

  isIntersectingBuildingBoxTop() {
    return this.isIntersectingBuildingBox() && this.intersectedFace().every(vertex => Math.sign(vertex.y) === 1);
  }

  isIntersectingBuildingBoxSide() {
    return this.isIntersectingBuildingBox() && !this.isIntersectingBuildingBoxTop();
  }

  isIntersectingBuildingBoxTopCenter() {
    const currentGridPosition = this.currentGridPosition();

    const xDelta = Math.abs(currentGridPosition.x - this.currentIntersection.point.x);
    const zDelta = Math.abs(currentGridPosition.z - this.currentIntersection.point.z);

    return this.isIntersectingBuildingBoxTop() && xDelta <= .4 && zDelta <= .4;
  }

  isIntersectingBuildingBoxTopEdge() {
    return this.isIntersectingBuildingBoxTop() && !this.isIntersectingBuildingBoxTopCenter();
  }

  intersectedFace() {
    const vertexA = this.currentIntersection.object.geometry.vertices[this.currentIntersection.face.a];
    const vertexB = this.currentIntersection.object.geometry.vertices[this.currentIntersection.face.b];
    const vertexC = this.currentIntersection.object.geometry.vertices[this.currentIntersection.face.c];

    return [vertexA, vertexB, vertexC];
  }

  intersectedFaceVertexDistances() {
    return this.intersectedFace().map((vertex) => {
      const absoluteVertex = vertex.clone().applyMatrix4(this.currentIntersection.object.matrixWorld);
      const distance = this.currentIntersection.point.distanceTo(absoluteVertex);

      return {
        distance,
        vertex,
      };
    });
  }
}
