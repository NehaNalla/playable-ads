import * as THREE from "three";

const helperBox3 = new THREE.Box3();
const defaultBox3 = new THREE.Box3();

export const computeBoundingBox = (
  object,
  to = defaultBox3,
  exclude,
  reCreate
) => {
  to.makeEmpty();
  object.matrixWorld.identity();

  object.traverse((o) => {
    o.updateMatrix();

    if (o !== object) {
      o.matrixWorld.multiplyMatrices(o.parent.matrixWorld, o.matrix);
    }

    if (!o.geometry) {
      return;
    }

    if (exclude && exclude.indexOf(o.name) >= 0) {
      return;
    }

    if (reCreate || !o.geometry.boundingBox) {
      o.geometry.computeBoundingBox();
    }

    helperBox3.copy(o.geometry.boundingBox);
    helperBox3.applyMatrix4(o.matrixWorld);

    if (to.isEmpty()) {
      to.copy(helperBox3);
    } else {
      to.union(helperBox3);
    }
  });

  object.updateMatrixWorld(true);

  return to;
};
