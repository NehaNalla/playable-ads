import * as THREE from "three";

const helper = new THREE.Vector4();

export default class Logo extends THREE.Mesh {
  constructor(relative, width, height, map, scene, name) {
    super(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(map),
      })
    );
    this.position.z = 0.65;
    this.material.transparent = true;
    this.relative = relative;
    this.name = name;

    scene.add(this);
  }

  setSize = (renderer, small, big) => {
    renderer.getViewport(helper);
    const aspect = helper.width / helper.height;
    if (aspect > 1) {
      this.relative.y = small.y;
      this.relative.x = small.x;
      this.scale.setScalar(small.scale);
      this._calcScale(small.scale - 0.05, aspect, helper);
    } else {
      this.relative.y = big.y;
      this.relative.x = big.x;
      this.scale.setScalar(big.scale);
      this._calcScale(big.scale - 0.2, aspect, helper);
    }
  };

  _calcScale(scalar, aspect, helper) {
    if (aspect > 0.74 && aspect < 1.35) {
      if (helper.height < 1000 || helper.width < 1000) {
        this.scale.setScalar(scalar);
      }
    } else if (helper.height < 300 || helper.width < 300) {
      this.scale.setScalar(scalar);
    }
  }
}
