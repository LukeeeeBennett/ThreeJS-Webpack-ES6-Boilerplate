import * as THREE from 'three';
import TWEEN from 'tween.js';
import Renderer from './components/Renderer';
import Camera from './components/Camera';
import Light from './components/Light';
import Controls from './components/Controls';
import Geometry from './helpers/Geometry';
import Stats from './helpers/Stats';
import Interaction from './managers/Interaction';
import DatGUI from './managers/DatGUI';
import Config from './../data/Config';
import GroundPlane from './components/Controls';

// This class instantiates and ties all of the components together, starts the loading process and renders the main loop
export default class Main {
  constructor(container) {
    // Set container property to container element
    this.container = container;

    // Main scene creation
    this.scene = new THREE.Scene();
    this.renderer = new Renderer(this.scene, container);
    this.camera = new Camera(this.renderer.threeRenderer);
    this.light = new Light(this.scene);

    this.groundPlane = new GroundPlane(this.scene);
    this.grid = new Grid(this.scene);
  }

  init() {
    this.groundPlane.place();

    this.raycaster = new Raycaster([this.groundPlane.mesh], this.camera.threeCamera);
    this.interaction = new Interaction(this.renderer.threeRenderer, this.raycaster);
    this.ghostBox = new GhostBox(this.scene, this.interaction, this.raycaster);
    this.controls = new Controls(this.camera.threeCamera, this.container, this.interaction);

    this.grid.place();
    this.ghostBox.init();
    this.ghostBox.place();
    this.ghostBox.selectPiece('floor');
    this.placeLights();
    this.groundPlane.place();

    Config.isLoaded = true;

    if (Config.isDev) this.initDev();

    this.render();
  }

  initDev() {
    window.scene = this.scene;
    window.THREE = THREE;

    new DatGUI(this);

    if (Config.isShowingStats) this.initDevStats();
  }

  initDevStats() {
    this.stats = new Stats(this.renderer);
    this.stats.setUp();
  }

  placeLights() {
    const lights = ['ambient', 'directional', 'point', 'hemi'];

    lights.forEach((light) => {
      return this.lights.place(light);
    });
  }

  render() {
    this.renderer.render(this.scene, this.camera.threeCamera);

    TWEEN.update();
    this.controls.threeControls.update();

    requestAnimationFrame(this.render.bind(this));
  }
}
