import Material from '../helpers/Material';
import Geometry from '../helpers/Geometry';
import { stepRotation } from '../helpers/Rotation';

export default class Stairs {
  constructor(parent, material, geometry, mesh, position, rotation) {
    this.material = material || new Material().material;
    this.geometry = new Geometry(parent, this.material);
    this.geometry.geo = geometry;
    this.geometry.mesh = mesh;

    this.startingPosition = position ? [position.x, position.y, position.z] : undefined;
    this.startingRotation = rotation ? [rotation.x, rotation.y, rotation.z] : undefined;

    if (!geometry) this.geometry.make('box')(.1, 1.3, 1, 1, 1, 1);

    this.geometry.geo.__baf__type = 'Stairs';
    this.geometry.geo.__baf__instance = this;
  }

  place(position = [0, 0, 0], rotation = [0, 1.5708, -10.22]) {
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
    return new Stairs(
      parent,
      this.geometry.material.clone(),
      this.geometry.geo.clone(),
      this.geometry.mesh.clone(),
      this.geometry.mesh.position.clone(),
      this.geometry.mesh.rotation.clone()
    );
  }
}
