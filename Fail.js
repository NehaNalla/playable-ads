import * as THREE from "three";
import fail from "../../assets/fail.webp";
import gsap from "gsap";

export default class Fail extends THREE.Sprite {
  constructor() {
    super(
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(fail),
      })
    );
    this.scale.setScalar(0);
    this.position.set(0, 0, 0.8);
    this.rotation.z = -Math.PI * 0.5;
    // this.visible = false;
    this.material.transparent = true;
    this.name = "Fail";
  }

  show = () => {
    gsap.to(this.scale, {
      x: 5.5,
      y: 5.5,
      duration: 1.5,
      delay: 0.5,
      repeat: 1,
      yoyo: true,
      ease: "elastic.out(1, 0.3)",
    });
    gsap.to(this.rotation, {
      z: 0,
      duration: 1.5,
      delay: 0.5,
      repeat: 1,
      yoyo: true,
      ease: "elastic.out(1, 0.3)",
    });
  };
}
