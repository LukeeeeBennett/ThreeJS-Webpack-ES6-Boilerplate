import { MeshLambertMaterial } from 'three';
import Config from '../../data/config';

// USe this class as a helper to set up some default materials
export default class Material {
  constructor(type) {
    this.material = new MeshLambertMaterial({
      color: this.getColor(type),
    });
  }

  getColor(type) {
    switch (type) {
      case 'stone':
        return 0xfd500b;
      case 'metal':
        return 0x6f6f6f;
      case 'wood':
      default:
        return 0xb3754f;
    }
  }
}

