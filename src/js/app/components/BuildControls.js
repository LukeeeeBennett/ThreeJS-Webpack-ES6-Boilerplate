export default class BuildControls {
  constructor(interaction) {
    this.interaction = interaction;

    this.container = document.getElementById('build-menu');

    this.floorButton = document.getElementById('floor');
    this.wallButton = document.getElementById('wall');
    this.stairsButton = document.getElementById('stairs');
    this.roofButton = document.getElementById('roof');

    this.woodButton = document.getElementById('wood');
    this.stoneButton = document.getElementById('stone');
    this.metalButton = document.getElementById('metal');

    this.rotateButton = document.getElementById('rotate');

    this.currentPiece = undefined;
    this.currentMaterial = undefined;
  }

  init() {
    this.floorButton.addEventListener('click', this.selectPiece.bind(this, 'floor'));
    this.wallButton.addEventListener('click', this.selectPiece.bind(this, 'wall'));
    this.stairsButton.addEventListener('click', this.selectPiece.bind(this, 'stairs'));
    this.roofButton.addEventListener('click', this.selectPiece.bind(this, 'roof'));

    this.woodButton.addEventListener('click', this.selectMaterial.bind(this, 'wood'));
    this.stoneButton.addEventListener('click', this.selectMaterial.bind(this, 'stone'));
    this.metalButton.addEventListener('click', this.selectMaterial.bind(this, 'metal'));

    this.rotateButton.addEventListener('click', this.rotateCurrentPiece.bind(this));
  }

  selectFloor() {
    this.currentPiece = 'floor';
    this.floorButton.classList.add('active');
  }
  selectWall() {
    this.currentPiece = 'wall';
    this.wallButton.classList.add('active');
  }
  selectStairs() {
    this.currentPiece = 'stairs';
    this.stairsButton.classList.add('active');
  }
  selectRoof() {
    this.currentPiece = 'roof';
    this.roofButton.classList.add('active');
  }

  resetAllPieces() {
    this.currentPiece = undefined;

    this.floorButton.classList.remove('active');
    this.wallButton.classList.remove('active');
    this.stairsButton.classList.remove('active');
    this.roofButton.classList.remove('active');
  }


  selectPiece(type) {
    this.resetAllPieces();

    this.interaction.eventEmitter.emit('select:piece', type);

    switch (type) {
      case 'wall':
        return this.selectWall();
      case 'stairs':
        return this.selectStairs();
      case 'roof':
        return this.selectRoof();
      case 'floor':
      default:
        return this.selectFloor();
    }
  }

  selectWood() {
    this.currentMaterial = 'wood';
    this.woodButton.classList.add('active');
  }

  selectStone() {
    this.currentMaterial = 'stone';
    this.stoneButton.classList.add('active');
  }

  selectMetal() {
    this.currentMaterial = 'metal';
    this.metalButton.classList.add('active');
  }

  resetAllMaterials() {
    this.currentMaterial = undefined;

    this.woodButton.classList.remove('active');
    this.stoneButton.classList.remove('active');
    this.metalButton.classList.remove('active');
  }

  selectMaterial(type) {
    this.resetAllMaterials();

    this.interaction.eventEmitter.emit('select:material', type);

    switch (type) {
      case 'stone':
        return this.selectStone();
      case 'metal':
        return this.selectMetal();
      case 'wood':
      default:
        return this.selectWood();
    }
  }

  rotateCurrentPiece() {
    this.interaction.eventEmitter.emit('rotate');
  }
}
