import * as THREE from "three";
import tutorImg from "../../assets/tutor.webp";
import gsap from "gsap";

export default class Tutor extends THREE.Sprite {
  constructor() {
    super(
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(tutorImg),
      })
    );
    this.scale.setScalar(2);
    this.rotation.z = 1;
    this.position.set(1, -1.5, 0.63);
    this.material.transparent = true;
    this.name = "Tutor";
  }
}
