import * as THREE from "three";
import Blocker from "./Blocker";
import blocker from "../../assets/blocker.webp";
import blocker_light from "../../assets/blocker_light.webp";
import gsap from "gsap";

class BlockerGroup extends THREE.Group {
  constructor(name, block, blockerLight) {
    super();
    this.name = name;
    this.add(block);
    this.add(blockerLight);
    this.blockerLight = blockerLight;
    blockerLight.material.opacity = 0;
    this.openTimeLine = gsap.timeline();
  }

  toggleLight = (isSwitch, repeats = 1, yoyo = true, swithOfDelay = 0) => {
    if (isSwitch) {
      gsap.to(this.blockerLight.material, {
        duration: 1,
        repeat: repeats,
        opacity: 1,
        yoyo: yoyo,
      });
    } else {
      gsap.to(this.blockerLight.material, {
        delay: swithOfDelay,
        duration: 0.8,
        opacity: 0,
      });
    }
  };

  shortOpen = (x, y, repeat = 1, yoyo = true, duration = 0.5) => {
    this.openTimeLine.to(this.position, {
      x: x,
      y: y,
      duration: duration,
      repeat: repeat,
      yoyo: yoyo,
      ease: "none",
    });
  };
}

export const blockersArr = [
  new BlockerGroup(
    "LeftTop",
    new Blocker(-1.1, 1.1, Math.PI * 0, "BlockLeftTop", blocker),
    new Blocker(-1.1, 1.1, Math.PI * 0, "BlockLightLeftTop", blocker_light)
  ),
  new BlockerGroup(
    "LeftBottom",
    new Blocker(-1.1, -1.1, Math.PI * 0.5, "BlockLeftBottom", blocker),
    new Blocker(
      -1.1,
      -1.1,
      Math.PI * 0.5,
      "BlockLightLeftBottom",
      blocker_light
    )
  ),
  new BlockerGroup(
    "RightTop",
    new Blocker(1.1, 1.1, Math.PI * 1.5, "BlockRightTop", blocker),
    new Blocker(1.1, 1.1, Math.PI * 1.5, "BlockLightRightTop", blocker_light)
  ),
  new BlockerGroup(
    "RightBottom",
    new Blocker(1.1, -1.1, Math.PI, "BlockRightBottom", blocker),
    new Blocker(1.1, -1.1, Math.PI, "BlockLightRightBottom", blocker_light)
  ),
];
