import { Vector3 } from 'three';
import Material from '../helpers/Material';
import Geometry from '../helpers/Geometry';

export default class Wall {
  constructor(parent, material, geometry, mesh, rotation, position) {
    this.direction = 'n';
    
    this.startingRotation = rotation ? [rotation.x, rotation.y, rotation.z] : undefined;
    this.startingPosition = position ? [position.x, position.y, position.z] : undefined;

    this.material = material || new Material().material;
    this.geometry = new Geometry(parent, this.material);
    this.geometry.geo = geometry;
    this.geometry.mesh = mesh;

    if (!geometry) this.geometry.make('box')(.1, 1, 1, 1, 1, 1);

    this.geometry.geo.__baf__type = 'Wall';
    this.geometry.geo.__baf__instance = this;
  }

  place() {
    const rotation = this.startingRotation || this.getDirectionRotation();
    const position = this.startingPosition || this.getDirectionPosition();

    this.startingRotation = undefined;
    this.startingPosition = undefined;

    this.geometry.place(position, rotation);
  }

  rotate() {
    this.direction = this.getNextDirection();

    this.geometry.mesh.position.copy(new Vector3(...this.getDirectionPosition()));
    this.geometry.mesh.rotation.setFromVector3(new Vector3(...this.getDirectionRotation()));
  }


  getNextDirection() {
    switch (this.direction) {
      case 'n':
        return 'e';
      case 'e':
        return 's';
      case 's':
        return 'w';
      case 'w':
      default:
        return 'n';
    }
  }

  getDirectionPosition() {
    switch (this.direction) {
      case 'e':
        return [.45, 0, 0];
      case 'w':
        return [-.45, 0, 0];
      case 's':
        return [0, 0, .45];
      case 'n':
      default:
        return [0, 0, -.45];
    }
  }

  getDirectionRotation() {
    switch (this.direction) {
      case 'e':
      case 'w':
        return [0, 0, 0];
      case 's':
      case 'n':
      default:
        return [0, 1.5708, 0];
    }
  }

  clone(parent) {
    return new Wall(
      parent,
      this.material.clone(),
      this.geometry.geo.clone(),
      this.geometry.mesh.clone(),
      this.geometry.mesh.rotation.clone(),
      this.geometry.mesh.position.clone()
    );
  }
}
