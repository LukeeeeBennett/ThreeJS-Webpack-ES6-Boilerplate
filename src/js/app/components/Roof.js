import Material from '../helpers/Material';
import Geometry from '../helpers/Geometry';
import { stepRotation } from '../helpers/Rotation';

export default class Roof {
  constructor(parent, material, geometry, mesh) {
    this.material = material || new Material().material;
    this.geometry = new Geometry(parent, this.material);
    this.geometry.geo = geometry;
    this.geometry.mesh = mesh;

    if (!geometry) this.geometry.make('cone')(.7, .4, 4, 1, true);

    this.geometry.geo.__baf__type = 'Roof';
    this.geometry.geo.__baf__instance = this;
  }

  place(position = [0, -.3, 0]) {
    this.geometry.place(position, [0, .79, 0]);
  }

  rotate() {
    this.geometry.mesh.rotation.y = stepRotation(this.geometry.mesh.rotation.y);
  }

  clone(parent) {
    return new Roof(
      parent,
      this.material.clone(),
      this.geometry.geo.clone(),
      this.geometry.mesh.clone()
    );
  }
}
