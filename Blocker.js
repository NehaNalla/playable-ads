import * as THREE from "three";

export default class Blocker extends THREE.Sprite {
  constructor(posX, posY, rot, name, blocker) {
    super(
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(blocker),
      })
    );
    this.scale.setScalar(2.25);
    this.position.z = 0.62;
    this.position.x = posX;
    this.position.y = posY;
    this.rotation.z = rot;
    this.name = name;
    this.material.transparent = true;
  }
}
