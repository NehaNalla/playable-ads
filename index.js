import * as THREE from "three";
import { createDrum } from './js/drum.js';

import logoImg from "./assets/logo.webp";
import helpImg from "./assets/help.webp";
import waterRSprite from "./assets/waterRSprite.webp";
import waterLSprite from "./assets/waterLSprite.webp";
import lava_staticTexture from "./assets/lava_sprite.webp";
import dynamicWaterTexture from "./assets/secondStaticWater.webp";
import dynamicWaterSpriteTexture from "./assets/dymamicWaterSprite.webp";
import dot from "./assets/dot.webp";

import Camera from "./js/Camera";
import Logo from "./js/objects/Logo";
import Cat from "./js/objects/Cat";
import Tutor from "./js/objects/Tutor";
import Fail from "./js/objects/Fail";
import Shark from "./js/objects/Shark";
import OverlayDark from "./js/objects/OverlayDark";
import { blockersArr } from "./js/objects/blockersArr";
import { RelativePosition } from "./js/utils/RelativePosition";
import { createBackground } from "./js/objects/createBackground";
import { SpriteFlipbook } from "./js/objects/SpriteFlipbook";
import { scenario } from "./js/scenario";


const canvas = document.querySelector("canvas.webgl");
const loader = document.querySelector(".loader");


const scene = new THREE.Scene();
scene.background = new THREE.Color("#19bffc");


blockersArr.forEach((block) => {
  scene.add(block);
});


const cat = new Cat();
scene.add(cat);


const shark = new Shark("Shark");
scene.add(shark);


const tutor = new Tutor();
scene.add(tutor);
tutor.visible = false;


const fail = new Fail();
scene.add(fail);


const logoCorner = new Logo(
  { x: 0.8, y: 0.075 },
  3,
  1.8,
  logoImg,
  scene,
  "CornerLogo"
);
const relativeLogo = new RelativePosition(logoCorner);


const helpLogo = new Logo(
  { x: 0.5, y: 0.5 },
  2,
  1.5,
  helpImg,
  scene,
  "HelpLogo"
);
const relativeHelp = new RelativePosition(helpLogo);
helpLogo.scale.set(0, 0, 1);
helpLogo.rotation.z = Math.PI * 0.1;


const overlayDark = new OverlayDark();
scene.add(overlayDark);




const drum = createDrum();
scene.add(drum);

createBackground(scene);


const dotCenter = new SpriteFlipbook(dot, 1, 1, scene, "Dot");
dotCenter.setScale(10);
dotCenter.setPosition(0, 0, 0.1);


const testSprite = new SpriteFlipbook(waterRSprite, 3, 3, scene, "RightWater");
testSprite.setScale(5);
testSprite.addPosition(2.67, -0.2, 0.1);
testSprite.loop([0, 1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2, 1, 0], 1.5);

const leftStaticSprite = new SpriteFlipbook(
  waterLSprite,
  3,
  3,
  scene,
  "LeftStaticWater"
);
leftStaticSprite.setScale(5);
leftStaticSprite.addPosition(-2.68, -0.65, 0.5);
leftStaticSprite.loop([0, 1, 2, 3, 4, 5, 6, 7, 8], 0.75);

export const lava_static = new SpriteFlipbook(
  lava_staticTexture,
  5,
  3,
  scene,
  "LavaStatic"
);
lava_static.setScale(4.3);
lava_static.addPosition(0, 0, 0);
lava_static.loop([0], 1);

export const dynamicWater = new SpriteFlipbook(
  dynamicWaterTexture,
  4,
  2,
  scene,
  "DynamicWater"
);
dynamicWater.setScale(7);
dynamicWater.setPosition(-2, 0, 0.6);
dynamicWater.sprite.visible = false;

export const dynamicSpriteWater = new SpriteFlipbook(
  dynamicWaterSpriteTexture,
  6,
  3,
  scene,
  "DynamicSpriteWater"
);

dynamicSpriteWater.setScale(10.7);
dynamicSpriteWater.setPosition(0, 0, 0.6);
dynamicSpriteWater.sprite.visible = false;

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const cameraFrustrum = 92;


const camera = new Camera(sizes, cameraFrustrum, renderer);
camera.position.set(0, 0, 1);
scene.add(camera);


window.addEventListener("resize", () => {
  resize(sizes, camera, renderer, cameraFrustrum);
});
const resize = (sizes, camera, renderer, cameraFrustrum) => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.updateCamera(sizes, cameraFrustrum);
  camera.updateZoom(renderer);

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  logoCorner.setSize(
    renderer,
    { x: 0.9, y: 0.12, scale: 0.5 },
    { x: 0.8, y: 0.075, scale: 0.9 }
  );
  helpLogo.setSize(
    renderer,
    { x: 0.25, y: 0.22, scale: 1 },
    { x: 0.25, y: 0.33, scale: 1.5 }
  );
};

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = "srgb-linear";

resize(sizes, camera, renderer, cameraFrustrum);


const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  camera.updateZoom(renderer);
  relativeLogo.update(camera);
  relativeHelp.update(camera);

  testSprite.update(deltaTime);
  leftStaticSprite.update(deltaTime);
  dynamicWater.update(deltaTime);
  dynamicSpriteWater.update(deltaTime);
  lava_static.update(deltaTime);

  
  renderer.render(scene, camera);

  
  window.requestAnimationFrame(tick);
};

tick();

window.onload = () => {
  setTimeout(() => {
    canvas.style.opacity = "1";
    loader.style.display = "none";
    scenario(scene, camera, renderer);
  }, 500);
};
