import {
  PlaneGeometry,
  SphereGeometry,
  PlaneBufferGeometry,
  BoxGeometry,
  ConeGeometry,
  Mesh,
} from 'three';
import Material from './Material';
import Config from '../../data/Config';

// This helper class can be used to create and then place geometry in the scene
export default class Geometry {
  constructor(scene, material) {
    this.scene = scene;
    this.geo = undefined;
    this.material = material;
  }

  make(type) {
    if(type === 'plane') {
      return (width, height, widthSegments = 1, heightSegments = 1) => {
        this.geo = new PlaneGeometry(width, height, widthSegments, heightSegments);
      };
    }

    if(type === 'sphere') {
      return (radius, widthSegments = 32, heightSegments = 32) => {
        this.geo = new SphereGeometry(radius, widthSegments, heightSegments);
      };
    }

    if (type === 'plane-buffer') {
      return (width = 1000, height = 1000, widthSegments = 1000, heightSegments = 1000) => {
        this.geo = new PlaneBufferGeometry(width, height, widthSegments, heightSegments);
      };
    }

    if (type === 'box') {
      return (width = 1, height = 1, depth = 1, widthSegments = 1, heightSegments = 1, depthSegments = 1) => {
        this.geo = new BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments);
      };
    }

    if (type === 'cone') {
      return (radius = .7, height = .4, radialSegments = 4, heightSegments = 1, openEnded = true) => {
        this.geo = new ConeGeometry(radius, height, radialSegments, heightSegments, openEnded);
      };
    }
  }

  place(position, rotation) {
    this.mesh = new Mesh(this.geo, this.material);

    // Use ES6 spread to set position and rotation from passed in array
    this.mesh.position.set(...position);
    this.mesh.rotation.set(...rotation);

    if(Config.shadow.enabled) {
      this.mesh.receiveShadow = true;
    }

    this.scene.add(this.mesh);
  }

  setMaterial(type) {
    this.material = new Material(type).material;
    this.mesh.material = this.material;
  }
}
