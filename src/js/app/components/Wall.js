import Material from '../helpers/Material';
import Geometry from '../helpers/Geometry';
import { stepRotation } from '../helpers/Rotation';

export default class Wall {
  constructor(scene) {
    this.material = new Material().material;
    this.geometry = new Geometry(scene, this.material);

    this.geometry.make('box')(.1, 1, 1, 1, 1, 1);

    this.geometry.geo.__fnb__type = 'Wall';
    this.geometry.geo.__fnb__instance = this;
  }

  place() {
    this.mesh = this.geometry.place(this.getDirectionPosition(), this.getDirectionRotation());
  }

  rotate() {
    this.direction = this.getNextDirection();

      this.mesh.position.copy(new Vector3(this.getDirectionPosition()));
      this.mesh.rotation.setFromVector3(new Vector3(this.getDirectionRotation()));
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
}