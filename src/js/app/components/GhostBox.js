import { MeshLambertMaterial } from 'three';
import Geometry from '../helpers/Geometry';
import { emptyBox } from '../helpers/Box';
import Wall from './Wall';
import Stairs from './Stairs';
import Roof from './Roof';
import Floor from './Floor';
import BuildingBox from './BuildingBox';

export default class GhostBox {
  constructor(scene, interaction, raycaster) {
    this.scene = scene;
    this.interaction = interaction;
    this.raycaster = raycaster;

    this.currentPiece = undefined;
    this.currentMaterialType = 'wood';
    this.nextPosition = undefined;
    this.buildingBox = undefined;

    this.material = new MeshLambertMaterial({ color: 0x77feff, visible: true, transparent: true, opacity: .4 });
    this.geometry = new Geometry(scene, this.material);
    this.geometry.make('box')(1, 1, 1, 1, 1, 1);
  }

  init() {
    this.interaction.eventEmitter.on('move', this.move.bind(this));
    this.interaction.eventEmitter.on('build', this.build.bind(this));
    this.interaction.eventEmitter.on('select:piece', this.selectPiece.bind(this));
    this.interaction.eventEmitter.on('select:material', this.selectMaterial.bind(this));
    this.interaction.eventEmitter.on('rotate', this.rotatePiece.bind(this));
  }

  move() {
    const intersections = this.raycaster.getIntersections(event);

    if (!intersections.length) return;

    if (this.raycaster.isIntersectingTheGround()) return this.moveToGroundPosition();
  }

  build() {
    this.buildingBox = new BuildingBox(this.parent, this.raycaster);
    
    this.placeBuildingBox();
    this.buildingBox.setPiece(this.currentPiece);
  }

  placeBuildingBox() {
    this.buildingBox.place([this.nextPosition.x, this.nextPosition.y, this.nextPosition.z]);
  }

  selectPiece(type) {
    this.empty();

    this.currentPiece = this.getNewPiece(type);
    this.currentPiece.place();
    this.selectMaterial(this.currentMaterial);

    this.raycaster.addInterceptableObject(this.currentPiece);
  }

  selectMaterial(type) {
    this.currentMaterial = type;

    this.currentPiece.geometry.setMaterial(type);
  }

  rotatePiece() {
    return this.currentPiece.rotate();
  }

  place() {
    this.geometry.place([.5, .5, .5], [0, 0, 0]);
  }

  empty() {
    if (!this.currentPiece) return;

    emptyBox(this.geometry.mesh, this.currentPiece);

    this.currentPiece = undefined;
  }

  getNewPiece(type) {
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

  moveToGroundPosition() {
    this.nextPosition = this.raycaster.currentGridPosition();

    this.parent = this.scene;

    this.moveToNextPosition();
  }

  moveToNextPosition() {
    this.geometry.mesh.position.copy(this.nextPosition);
  }
}



// everything commented out is old interaction code,
// its the key to all of this bs, niw ot uoy tnaw tnod yeht🔑



      // const ghostBoxPosition = new Vector3(
      //   this.gridPosition(intersection.point.x),
      //   this.gridYPosition(intersection.point.y),
      //   this.gridPosition(intersection.point.z)
      // );

      // this.parent = intersection.object;

      // if (intersection.object.geometry.__baf__type === 'BuildingBox' && intersections[1] && intersections[1].object.geometry.__baf__type === 'Floor') {
      //   // issa middle, there is a floor immediately after a building box
      //   ghostBoxPosition.copy(intersection.object.getWorldPosition());

      //   this.newPosition = new Vector3(0, 0, 0);
      // } else if (intersection.object.geometry.vertices) {
      //   const pointA = intersection.object.geometry.vertices[intersection.face.a];
      //   const pointB = intersection.object.geometry.vertices[intersection.face.b];
      //   const pointC = intersection.object.geometry.vertices[intersection.face.c];

      //   const poly = [pointA, pointB, pointC];

      //   const distances = poly.map((vector) => {
      //     const absoluteVector = vector.clone().applyMatrix4(intersection.object.matrixWorld);
      //     const distance = intersection.point.distanceTo(absoluteVector);

      //     return {
      //       distance,
      //       vector,
      //     };
      //   });

      //   if (distances.every((distance) => Math.sign(distance.vector.y) === -1)) return this.canBuild = false;

      //   const y = distances.every((distance) => Math.sign(distance.vector.y) === 1) ? 1 : 0;

      //   if (y === 0) {
      //     // issa side
      //     ghostBoxPosition.copy(intersection.object.getWorldPosition());

      //     if (distances[0].vector.x === distances[1].vector.x && distances[0].vector.x === distances[2].vector.x) {
      //       if(Math.sign(distances[0].vector.x) === -1) {
      //         ghostBoxPosition.x -= 1;

      //         this.newPosition = new Vector3(-1, y, 0);
      //       } else {
      //         ghostBoxPosition.x += 1;

      //         this.newPosition = new Vector3(1, y, 0);
      //       }
      //     }

      //     if (distances[0].vector.z === distances[1].vector.z && distances[0].vector.z === distances[2].vector.z) {
      //       if (Math.sign(distances[0].vector.z) === -1) {
      //         ghostBoxPosition.z -= 1;

      //         this.newPosition =  new Vector3(0, y, -1);
      //       } else {
      //         ghostBoxPosition.z += 1;

      //         this.newPosition =  new Vector3(0, y, 1);
      //       }
      //     }
      //   } else {
      //     // issa top
      //     if (Math.abs(ghostBoxPosition.x - intersection.point.x) <= .4 && Math.abs(ghostBoxPosition.z - intersection.point.z) <= .4) {
      //       // issa middle
      //       ghostBoxPosition.y -= 1;

      //       this.newPosition = new Vector3(0, 0, 0);
      //     } else {
      //       this.isRoot = true;
      //       // issa edge
      //       distances.sort((a, b) => {
      //         if (a.distance < b.distance) return -1;
      //         if (a.distance > b.distance) return 1;
      //         if (a.distance === b.distance) return 0;
      //       }).splice(-1, 1);

      //       if (distances[0].vector.x === distances[1].vector.x) {
      //         if(Math.sign(distances[0].vector.x) === -1) {
      //           ghostBoxPosition.x -= 1;

      //           this.newPosition = new Vector3(-1, y, 0);
      //         } else {
      //           ghostBoxPosition.x += 1;

      //           this.newPosition = new Vector3(1, y, 0);
      //         }
      //       }

      //       if (distances[0].vector.z === distances[1].vector.z) {
      //         if (Math.sign(distances[0].vector.z) === -1) {
      //           ghostBoxPosition.z -= 1;

      //           this.newPosition =  new Vector3(0, y, -1);
      //         } else {
      //           ghostBoxPosition.z += 1;

      //           this.newPosition =  new Vector3(0, y, 1);
      //         }
      //       }
      //     }
      //   }
      // } else {
      //   this.parent = this.scene;
      //   this.newPosition = ghostBoxPosition;
      // }

      // if (this.canBuild) this.ghostBox.mesh.position.copy(ghostBoxPosition);






// And old build placement code, above is only moving ghostbox and calcing positions


      // if (!this.canBuild) return;

      // const isRoot = (this.parent instanceof Scene) || this.isRoot;

      // let box;
      // if (isRoot) {
      //   box = new BuildingBox(this.parent);
      //   box.place([this.newPosition.x, this.newPosition.y, this.newPosition.z]);
      // }

      // const parent = box ? box.mesh : this.parent;

      // if (this.buildControls.currentPiece === 'floor') {
      //   const floor = new Floor(parent);
      //   floor.place();
      //   this.raycaster.interceptableObjects.push(floor.mesh);
      // } else if (this.buildControls.currentPiece === 'wall') {
      //   const wall = new Wall(parent);
      //   wall.place();
      //   this.raycaster.interceptableObjects.push(wall.mesh);
      // } else if (this.buildControls.currentPiece === 'stairs') {
      //   const stairs = new Stairs(parent);
      //   stairs.place();
      //   this.raycaster.interceptableObjects.push(stairs.mesh);
      // }

      // if (!isRoot) return;

      // this.raycaster.interceptableObjects.push(box.mesh);