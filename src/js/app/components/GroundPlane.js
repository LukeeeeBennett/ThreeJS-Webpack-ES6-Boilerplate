import { MeshLambertMaterial, DoubleSide } from 'three';
import Geometry from '../helpers/Geometry';

export default class GroundPlane {
  constructor(scene) {
    this.material = new MeshLambertMaterial({ color: 0xd3f0cc, side: DoubleSide });
    this.geometry = new Geometry(scene, this.material);
    this.geometry.make('plane-buffer')(50, 50, 1, 1);
  }

  place() {
    this.geometry.place([0, 0, 0], [Math.PI / 2, 0, 0]);
  }
}
