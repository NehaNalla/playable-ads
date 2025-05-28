import * as THREE from "three";
import gsap from "gsap";

import { blockersArr } from "./objects/blockersArr";
import { showEndCard } from "./objects/showEndcard";
import { dynamicSpriteWater } from "../index";
import { dynamicWater } from "../index";
import { lava_static } from "../index";

export const scenario = (scene, camera, renderer) => {
  const mainTimeLine = gsap.timeline();
  const endTimeLine = gsap.timeline();

  const help = scene.getObjectByName("HelpLogo");
  const shark = scene.getObjectByName("Shark");
  const cat = scene.getObjectByName("Cat");
  const tutor = scene.getObjectByName("Tutor");
  const overlay = document.querySelector(".overlay");
  const fail = scene.getObjectByName("Fail");
  const overlayDark = scene.getObjectByName("OverlayDark");
  const tutorOpenedBlocker = scene.getObjectByName("LeftBottom");
  const userOpenedBlocker = scene.getObjectByName("LeftTop");
  const leftStaticWater = scene.getObjectByName("LeftStaticWater");
  const dynamicWaterMesh = scene.getObjectByName("DynamicWater");
  const clicker = document.querySelector(".clicker");

  shark.sharkAnim();
  cat.catCircleAnimation();
  cat.catCircleEyesAnimation();

  const endScenario = () => {
    clicker.removeEventListener("pointerdown", (EO) => {
      clickListener(EO);
    });
    userOpenedBlocker.blockerLight.visible = false;
    userOpenedBlocker.openTimeLine.pause();
    lava_static.loop([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 0.7);
    endTimeLine
      .to(tutor.position, {
        x: -2,
        y: 1.8,
        duration: 0.7,
        ease: "none",
        onStart: () => {
          gsap.to(userOpenedBlocker.position, {
            x: -0.6,
            y: 0.6,
            duration: 0.7,
            ease: "none",
          });
          cat.burn();
        },
        onComplete: () => {
          gsap.to(tutor.material, {
            duration: 0.3,
            opacity: 0,
          });
        },
      })
      .fromTo(
        ".overlay",
        { opacity: "0" },
        {
          opacity: "1",
          duration: 0.8,
          repeat: 3,
          yoyo: true,
          onStart: () => {
            fail.show();
            lava_static.loop([14], 1.2);
            overlayDark.show();
          },
          onComplete: () => {
            overlay.style.display = "none";
            showEndCard(renderer);
          },
        }
      );
  };

  const clickListener = (EO) => {
    EO.stopPropagation();
    EO.preventDefault();
    mainTimeLine.pause();
    endScenario();
  };

  mainTimeLine
    .to(help.scale, {
      duration: 1,
      repeat: 4,
      delay: 1.5,
      x: help.scale.x + 0.2,
      y: help.scale.y + 0.2,
      yoyo: true,
      onStart: () => {
        blockersArr.forEach((blocker) => blocker.toggleLight(true, 4));
      },
      onComplete: () => {
        blockersArr.forEach((blocker) => blocker.toggleLight(false));
      },
    })
    .to(help.material, {
      duration: 0.8,
      opacity: 0,
      onComplete: () => {
        tutor.visible = true;
      },
    })
    .to(tutor.position, {
      x: -1.1,
      y: -2,
      duration: 0.6,
      onStart: () => {
        tutorOpenedBlocker.toggleLight(true, 0, false);
      },
    })
    .to(tutor.position, {
      x: -1.25,
      y: -2.15,
      duration: 0.5,
      repeat: 1,
      yoyo: true,
      ease: "none",
      onStart: () => {
        tutorOpenedBlocker.shortOpen(-0.15, -0.15, 1);
      },
    })
    .to(tutor.position, {
      x: -2.3,
      y: -3.2,
      duration: 1,
      repeat: 0,
      yoyo: false,
      ease: "none",
      onStart: () => {
        tutorOpenedBlocker.toggleLight(false, 0, false, 0.5);
        tutorOpenedBlocker.shortOpen(-1.2, -1.2, 0, false, 1);
        scene.remove(leftStaticWater);

        dynamicSpriteWater.sprite.visible = true;
        dynamicSpriteWater.loop(
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
          1
        );
        cat.goDown();
      },
      onComplete: () => {
        dynamicWaterMesh.visible = true;
        dynamicWater.loop([0, 1, 2, 3, 4, 5, 6, 7], 0.7);
        dynamicSpriteWater.sprite.visible = false;
      },
    })
    .to(tutor.position, {
      x: 0.8,
      y: -1.9,
    })
    .to(tutor.position, {
      x: -1.4,
      y: 1.2,
      duration: 1.2,
      onStart: () => {
        gsap.to(tutor.rotation, {
          z: 0.2,
          duration: 1.2,
        });
        userOpenedBlocker.toggleLight(true, Infinity, true);
      },
    })
    .to(tutor.position, {
      x: -1.5,
      y: 1.3,
      duration: 1,
      repeat: 5,
      yoyo: true,
      ease: "none",
      onStart: () => {
        userOpenedBlocker.shortOpen(-0.1, 0.1, 5, true, 1);
        clicker.addEventListener("pointerdown", (EO) => {
          clickListener(EO);
        });
      },
      onComplete: () => {
        endScenario();
      },
    });
};
