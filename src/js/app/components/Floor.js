import Material from '../helpers/Material';
import Geometry from '../helpers/Geometry';
import { stepRotation } from '../helpers/Rotation';

export default class Floor {
  constructor(parent, material, geometry, mesh) {
    this.material = material || new Material().material;
    this.geometry = new Geometry(parent, this.material);
    this.geometry.geo = geometry;
    this.geometry.mesh = mesh;

    if (!geometry) this.geometry.make('box')(1, .1, 1, 1, 1, 1);

    this.geometry.geo.__baf__type = 'Floor';
    this.geometry.geo.__baf__instance = this;
  }

  place(position = [0, -.45, 0]) {
    this.geometry.place(position, [0, 0, 0]);
  }

  rotate() {
    this.geometry.mesh.rotation.y += stepRotation(this.geometry.mesh.rotation.y);
  }

  clone(parent) {
    return new Floor(
      parent,
      this.material.clone(),
      this.geometry.geo.clone(),
      this.geometry.mesh.clone()
    );
  }
}
