import { MeshLambertMaterial } from 'three';
import Geometry from '../helpers/Geometry';

export default class BuildingBox {
  constructor(parent, raycaster) {
    this.currentPiece = undefined;
    this.raycaster = raycaster;

    this.material = new MeshLambertMaterial({ color: 0x77feff, visible: true, transparent: true, opacity: .4 });
    this.geometry = new Geometry(parent, this.material);
    this.geometry.make('box')(1, 1, 1, 1, 1, 1);

    this.geometry.geo.__baf__type = 'BuildingBox';
    this.geometry.geo.__baf__instance = this;
  }

  place(position) {
    this.geometry.place(position, [0, 0, 0]);
  }

  addPiece(piece) {
    this.currentPiece = piece.clone(this.geometry.mesh);
    
    this.currentPiece.place();

    this.raycaster.addInterceptableObject(this.currentPiece);
  }

  empty() {
    if (!this.currentPiece) return;

    this.geometry.mesh.remove(this.currentPiece.geometry.mesh);

    this.currentPiece = undefined;
  }
}