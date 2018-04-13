import Config from './data/Config';
import Detector from './utils/Detector';
import Main from './app/Main';

// Check environment and set the Config helper
if(__ENV__ === 'dev') {
  console.log('----- RUNNING IN DEV ENVIRONMENT! -----');

  Config.isDev = true;
}

function init() {
  // Check for webGL capabilities
  if(!Detector.webgl) {
    Detector.addGetWebGLMessage();
  } else {
    const container = document.getElementById('appContainer');
    const main = new Main(container);

    main.init();
  }
}

init();
