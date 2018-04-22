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

    const intersections = this.intersectObjects();

    this.currentIntersections = intersections.filter(intersection => intersection.object.geometry.__baf__type !== 'BuildingBox');
    this.currentBuildingBox = intersections[0].object.geometry.__baf__type === 'BuildingBox' ? intersections[0].object : undefined;
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

  isIntersectingFloor() {
    return this.isIntersectingObject() && this.currentIntersection.object.geometry.__baf__type === 'Floor';
  }

  isIntersectingFloorTop() {
    return this.isIntersectingFloor() && this.isIntersectingTopFace();
  }

  isIntersectingFloorSide() {
    return this.isIntersectingFloor() && this.isIntersectingSideFace();
  }

  intersectedFace() {
    const vertexA = this.currentIntersection.object.geometry.vertices[this.currentIntersection.face.a];
    const vertexB = this.currentIntersection.object.geometry.vertices[this.currentIntersection.face.b];
    const vertexC = this.currentIntersection.object.geometry.vertices[this.currentIntersection.face.c];

    return [vertexA, vertexB, vertexC];
  }

  isIntersectingTopFace() {
    return this.intersectedFace().every(vertex => Math.sign(vertex.y) === 1);
  }

  isIntersectingBottomFace() {
    return this.intersectedFace().every(vertex => Math.sign(vertex.y) === -1);
  }

  isIntersectingSideFace() {
    return !this.isIntersectingTopFace() && !this.isIntersectingBottomFace();
  }

  isIntersectingNorthOrSouthSideFace() {
    return this.isIntersectingSideFace() &&  !!this.intersectedFace().reduce((result, vertex) => {
      return result.z === vertex.z ? result : false;
    });
  }

  isIntersectingEastOrWestSideFace() {
    return this.isIntersectingSideFace() &&  !!this.intersectedFace().reduce((result, vertex) => {
      return result.x === vertex.x ? result : false;
    });
  }

  isIntersectingNorthFace() {
    return this.isIntersectingNorthOrSouthSideFace() && this.intersectedFace().every(vertex => Math.sign(vertex.z) === 1);
  }

  isIntersectingEastFace() {
    return this.isIntersectingEastOrWestSideFace() && this.intersectedFace().every(vertex => Math.sign(vertex.x) === 1);
  }

  isIntersectingSouthFace() {
    return this.isIntersectingNorthOrSouthSideFace() && this.intersectedFace().every(vertex => Math.sign(vertex.z) === -1);
  }

  isIntersectingWestFace() {
    return this.isIntersectingEastOrWestSideFace() && this.intersectedFace().every(vertex => Math.sign(vertex.x) === -1);
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
