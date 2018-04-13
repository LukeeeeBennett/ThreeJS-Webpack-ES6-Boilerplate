import { GridHelper } from 'three';

export default class Grid {
  constructor(scene) {
    this.scene = scene;

    this.gridHelper = new GridHelper(100, 100);
  }

  place() {
    this.scene.add(this.gridHelper);
  }
}