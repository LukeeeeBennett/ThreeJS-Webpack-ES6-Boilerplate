import Material from '../helpers/Material';
import Geometry from '../helpers/Geometry';
import { stepRotation } from '../helpers/Rotation';

export default class Floor {
  constructor(scene) {
    this.material = new Material().material;
    this.geometry = new Geometry(scene, this.material);

    this.geometry.make('box')(1, .1, 1, 1, 1, 1);

    this.geometry.geo.__fnb__type = 'Floor';
    this.geometry.geo.__fnb__instance = this;
  }

  place(position = [0, -.45, 0]) {
    this.mesh = this.geometry.place(position, [0, 0, 0]);
  }

  rotate() {
    this.mesh.rotation.y += stepRotation(this.mesh.rotation.y);
  }
}