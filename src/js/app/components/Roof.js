import Material from '../helpers/Material';
import Geometry from '../helpers/Geometry';
import { stepRotation } from '../helpers/Rotation';

export default class Roof {
  constructor(scene) {
    this.material = new Material().material;
    this.geometry = new Geometry(scene, this.material);

    this.geometry.make('cone')(.7, .4, 4, 1, true);

    this.geometry.geo.__baf__type = 'Roof';
    this.geometry.geo.__baf__instance = this;
  }

  place(position = [0, .7, 0]) {
    this.geometry.place(position, [0, .79, 0]);
  }

  rotate() {
    this.geometry.mesh.rotation.y = stepRotation(this.geometry.mesh.rotation.y);
  }
}
