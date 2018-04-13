import Material from '../helpers/Material';
import Geometry from '../helpers/Geometry';
import { stepRotation } from '../helpers/Rotation';

export default class Stairs {
  constructor(scene) {
    this.material = new Material().material;
    this.geometry = new Geometry(scene, this.material);

    this.geometry.make('box')(.1, 1.3, 1, 1, 1, 1);

    this.geometry.geo.__fnb__type = 'Stairs';
    this.geometry.geo.__fnb__instance = this;
  }

  place(position = [0, 0, 0]) {
    this.geometry.place(position, [0, 0, -10.22]);
  }

  rotate() {
    this.geometry.mesh.rotation.y = stepRotation(this.geometry.mesh.rotation.y);
  }
}
