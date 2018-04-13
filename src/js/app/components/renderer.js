import { WebGLRenderer, PCFSoftShadowMap } from 'three';
import Config from '../../data/config';

// Main webGL renderer class
export default class Renderer {
  constructor(scene, container) {
    // Properties
    this.scene = scene;
    this.container = container;

    // Create WebGL renderer and set its antialias
    this.threeRenderer = new WebGLRenderer({antialias: true});

    this.threeRenderer.setPixelRatio(window.devicePixelRatio); // For retina

    // Appends canvas
    container.appendChild(this.threeRenderer.domElement);

    // Shadow map options
    this.threeRenderer.shadowMap.enabled = true;
    this.threeRenderer.shadowMap.type = PCFSoftShadowMap;

    // Get anisotropy for textures
    Config.maxAnisotropy = this.threeRenderer.getMaxAnisotropy();

    // Initial size update set to canvas container
    this.updateSize();

    // Listeners
    document.addEventListener('DOMContentLoaded', () => this.updateSize(), false);
    window.addEventListener('resize', () => this.updateSize(), false);
  }

  updateSize() {
    this.threeRenderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
  }

  render(scene, camera) {
    // Renders scene to canvas target
    this.threeRenderer.render(scene, camera);
  }
}
