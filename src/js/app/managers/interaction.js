import { EventEmitter3 } from 'eventemitter3';
import Keyboard from '../../utils/Keyboard';
import Helpers from '../../utils/Helpers';
import Config from '../../data/Config';
import Interaction from '../helpers/Interaction';

// Manages all input interactions
export default class Interaction {
  constructor(renderer) {
    // Properties
    this.renderer = renderer;

    this.timeout = null;
    this.mouseDownPosition = undefined;

    // Instantiate keyboard helper
    this.keyboard = new Keyboard();
    this.eventEmitted = new EventEmitter3();

    // Listeners
    // Mouse events
    this.renderer.domElement.addEventListener('mousemove', (event) => Helpers.throttle(this.onMouseMove(event), 250), false);
    this.renderer.domElement.addEventListener('mouseleave', (event) => this.onMouseLeave(event), false);
    this.renderer.domElement.addEventListener('mouseover', (event) => this.onMouseOver(event), false);
    this.renderer.domElement.addEventListener('mouseup', (event) => this.onMouseUp(event), false);
    this.renderer.domElement.addEventListener('mousedown', (event) => this.onMouseMouse(event), false);

    // Keyboard events
    this.keyboard.domElement.addEventListener('keydown', (event) => {
      // Only once
      if(event.repeat) {
        return;
      }

      if(this.keyboard.eventMatches(event, 'escape')) {
        console.log('Escape pressed');
      }
    });
  }

  onMouseOver(event) {
    event.preventDefault();

    Config.isMouseOver = true;
  }

  onMouseLeave(event) {
    event.preventDefault();

    Config.isMouseOver = false;
  }

  onMouseMove(event) {
    event.preventDefault();

    clearTimeout(this.timeout);

    this.timeout = setTimeout(function() {
      Config.isMouseMoving = false;
    }, 200);

    Config.isMouseMoving = true;

    this.eventEmitter.emit('move', intersections);
  }

  onMouseUp(event) {
    event.preventDefault();

    const mousePosition = Interaction.getMousePostion(event);

    if(!this.mouseDownPosition.equals(mousePosition)) return;

    this.eventEmitter.emit('click', event);
  }

  onMouseDown(event) {
    event.preventDefault();

    const mousePosition = Interaction.getMousePostion(event);

    this.mouseDownPosition = mousePosition;
  }
}
