import * as THREE from "three";
import { computeBoundingBox } from "./computeBoundingBox";

const helperBox = new THREE.Box3();
const helperMatrix = new THREE.Matrix4();

export class RelativePosition {
  anchor = new THREE.Vector2();
  box = new THREE.Box3();

  constructor(object) {
    this.object = object;
    computeBoundingBox(object, this.box);
  }

  update = (camera) => {
    const { object, box } = this;

    const zoom = camera.zoom;
    const hdt = (camera.right - camera.left) / zoom;
    const vdt = (camera.bottom - camera.top) / zoom;

    let cx = false;
    let cy = false;

    if (!isNaN(object.relative.x)) {
      cx = true;
      object.position.x = (object.relative.x - 0.5) * hdt;
    }
    if (!isNaN(object.relative.y)) {
      cy = true;
      object.position.y = (object.relative.y - 0.5) * vdt;
    }

    helperBox.copy(box);

    if ((cx || cy) && !helperBox.isEmpty()) {
      helperMatrix.copy(object.matrixWorld);
      helperMatrix.setPosition(0, 0, 0);
      helperBox.applyMatrix4(helperMatrix);
    }
  };
}
