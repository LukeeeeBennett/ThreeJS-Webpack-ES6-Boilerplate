import { MeshLambertMaterial } from 'three';
import Geometry from '../helpers/Geometry';
import Wall from './Wall';
import Stairs from './Stairs';
import Roof from './Roof';
import Floor from './Floor';

export default class GhostBox {
  constructor(scene, interaction, raycaster) {
    this.interaction = interaction;
    this.raycaster = raycaster;

    this.currentPiece = undefined;
    this.currentMaterialType = 'wood';

    this.material = new MeshLambertMaterial({ color: 0x77feff, visible: true, transparent: true, opacity: .4 });
    this.geometry = new Geometry(scene, this.material);
    this.geometry.make('box')(1, 1, 1, 1, 1, 1);
  }

  init() {
    this.interaction.eventEmitter.on('move', this.move.bind(this));
    this.interaction.eventEmitter.on('build', this.build.bind(this));
    this.interaction.eventEmitter.on('select:piece', this.selectPiece.bind(this));
    this.interaction.eventEmitter.on('select:material', this.selectMaterial.bind(this));
    this.interaction.eventEmitter.on('rotate', this.rotate.bind(this));
  }

  move() {
    const intersections = this.raycaster.getIntersections(event);

    if (!intersections.length) return;

    // if (this.raycaster.isIntersectingTheGround()) return;
  }

  build() {}

  selectPiece(type) {
    this.empty();

    this.currentPiece = this.getNew(type);
    this.currentPiece.place();
    this.selectMaterial(this.currentMaterial);

    this.raycaster.addInterceptableObject(this.currentPiece);
  }

  selectMaterial(type) {
    this.currentMaterial = type;

    this.currentPiece.geometry.setMaterial(type);
  }

  rotate() {
    return this.currentPiece.rotate();
  }

  place() {
    this.geometry.place([.5, .5, .5], [0, 0, 0]);
  }

  empty() {
    if (!this.currentPiece) return;

    this.geometry.mesh.remove(this.currentPiece.geometry.mesh);
    this.currentPiece.geometry.geo.dispose();
    this.currentPiece.material.dispose();

    this.currentPiece = undefined;
  }

  getNew(type) {
    switch (type) {
      case 'wall':
        return new Wall(this.geometry.mesh);
      case 'stairs':
        return new Stairs(this.geometry.mesh);
      case 'roof':
        return new Roof(this.geometry.mesh);
      case 'floor':
      default:
        return new Floor(this.geometry.mesh);
    }
  }
}
