import gsap from "gsap";
import * as THREE from "three";

export default class OverlayDark extends THREE.Mesh {
  constructor() {
    super(
      new THREE.PlaneGeometry(20, 20),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#b7bcc4"),
      })
    );
    this.position.set(0, 0, 0.49);
    this.material.transparent = true;
    this.material.opacity = 0;
    this.name = "OverlayDark";
  }

  show = () => {
    gsap.to(this.material, {
      duration: 1,
      opacity: 0.4,
    });
  };
}
