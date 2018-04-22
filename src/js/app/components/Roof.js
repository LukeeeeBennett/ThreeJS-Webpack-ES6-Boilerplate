import Material from '../helpers/Material';
import Geometry from '../helpers/Geometry';
import { stepRotation } from '../helpers/Rotation';

export default class Roof {
  constructor(parent, material, geometry, mesh, position, rotation) {
    this.material = material || new Material().material;
    this.geometry = new Geometry(parent, this.material);
    this.geometry.geo = geometry;
    this.geometry.mesh = mesh;

    this.startingPosition = position ? [position.x, position.y, position.z] : undefined;
    this.startingRotation = rotation ? [rotation.x, rotation.y, rotation.z] : undefined;

    if (!geometry) this.geometry.make('cone')(.7, .4, 4, 1, true);

    this.geometry.geo.__baf__type = 'Roof';
    this.geometry.geo.__baf__instance = this;
  }

  place(position = [0, -.3, 0], rotation = [0, .79, 0]) {
    const piecePosition = this.startingPosition || position;
    const pieceRotation = this.startingRotation || rotation;

    this.startingPosition = undefined;
    this.startingRotation = undefined;

    this.geometry.place(piecePosition, pieceRotation);
  }

  rotate() {
    this.geometry.mesh.rotation.y = stepRotation(this.geometry.mesh.rotation.y);
  }

  clone(parent) {
    return new Roof(
      parent,
      this.geometry.material.clone(),
      this.geometry.geo.clone(),
      this.geometry.mesh.clone(),
      this.geometry.mesh.position.clone(),
      this.geometry.mesh.rotation.clone()
    );
  }
}
