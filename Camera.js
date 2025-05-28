import * as THREE from "three";
import { clamp } from "./utils/clamp";

const helper = new THREE.Vector4();

export default class Camera extends THREE.OrthographicCamera {
  constructor(sizes, cameraFrustrum) {
    super(
      sizes.width / -cameraFrustrum,
      sizes.width / cameraFrustrum,
      sizes.height / cameraFrustrum,
      sizes.height / -cameraFrustrum,
      0,
      1000
    );
    this.lastZoom = this.zoom =
      sizes.height > 1000 || sizes.width > 1000 ? 2 : 1;
    this.min = 1;
    this.max = 1.95;
  }

  updateCamera = (sizes, cameraFrustrum) => {
    this.left = sizes.width / -cameraFrustrum;
    this.right = sizes.width / cameraFrustrum;
    this.top = sizes.height / cameraFrustrum;
    this.bottom = sizes.height / -cameraFrustrum;
    this.updateProjectionMatrix();
  };

  updateZoom = (renderer) => {
    renderer.getViewport(helper);
    const aspect = helper.width / helper.height;
    if (aspect > 0.74 && aspect < 1.35) {
      this.zoomMultiplier =
        helper.height > 1000 || helper.width > 1000 ? 2.5 : 1.5;
    } else {
      this.zoomMultiplier =
        helper.height > 1000 || helper.width > 1000 ? 2 : aspect > 1 ? 1 : 1.3;
    }
    const zoom = clamp(aspect, this.min, this.max);
    if (this.lastZoom !== zoom || !this.zoomCalculated) {
      this.zoom = this.lastZoom = zoom * this.zoomMultiplier;
      this.updateProjectionMatrix();
      this.zoomCalculated = true;
    }
  };
}
