import * as THREE from "three";
import background from "../../assets/background.webp";
import sceneBackground from "../../assets/sceneBackground.webp";

export const createBackground = (scene) => {
  const sceneBackTexture = new THREE.TextureLoader().load(sceneBackground);
  sceneBackTexture.repeat.x = 5;
  sceneBackTexture.repeat.y = 5;
  sceneBackTexture.wrapS = THREE.RepeatWrapping;
  sceneBackTexture.wrapT = THREE.RepeatWrapping;
  sceneBackTexture.magFilter = THREE.NearestFilter;
  const backTexture = new THREE.TextureLoader().load(background);
  const back = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshBasicMaterial({
      map: backTexture,
    })
  );
  back.name = "Back";
  back.material.transparent = true;
  scene.add(back);

  const sceneBack = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshBasicMaterial({
      map: sceneBackTexture,
    })
  );
  sceneBack.name = "SceneBack";
  scene.add(sceneBack);
};
