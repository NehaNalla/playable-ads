import * as THREE from "three";
import cat from "../../assets/cat.webp";
import gsap from "gsap";
import whiteEyeTexture from "../../assets/white_eye.webp";
import colorEyeTexture from "../../assets/color_eye.webp";

const createCatPart = (partTexture) => {
  const obj = new THREE.Sprite(
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(partTexture),
      transparent: true,
    })
  );
  return obj;
};

export default class Cat extends THREE.Group {
  constructor() {
    super();
    this.whiteEye = createCatPart(whiteEyeTexture);
    this.body = createCatPart(cat);
    this.colorEye = createCatPart(colorEyeTexture);
    this.scale.setScalar(2);
    this.position.set(-2.5, 0, 0.08);
    this.name = "Cat";
    this.add(this.whiteEye);
    this.add(this.body);
    this.add(this.colorEye);
    this.body.position.z = 0.1;
    this.colorEye.position.set(0.01, 0.01, 0.09);
    this.whiteEye.position.z = 0.08;
    this.startTimeline = gsap.timeline();
    this.eyesTimeline = gsap.timeline();
    this.downTimeline = gsap.timeline();
  }

  catCircleEyesAnimation = () => {
    this.circleEyeAnimation = gsap
      .to(this.colorEye.position, {
        x: 0,
        duration: 0.8,
      })
      .then(() => {
        this._repeatingEyesAnimation();
      });
  };

  catCircleAnimation = () => {
    this.startTimeline
      .to(this.position, {
        y: -0.08,
        duration: 0.5,
        yoyo: true,
        repeat: 1,
        onStart: () => {
          gsap.to(this.position, {
            x: -1.4,
            duration: 1,
          });
        },
      })
      .to(this.position, {
        y: -0.1,
        yoyo: true,
        repeat: Infinity,
        duration: 2,
      });
  };

  goDown = () => {
    this.eyesTimeline.pause();
    this.startTimeline.pause();
    this.downTimeline
      .to(this.position, {
        x: -1,
        y: -0.5,
        duration: 0.5,
        ease: "none",
        onStart: () => {
          gsap.to(this.rotation, {
            z: -0.2,
            duration: 0.5,
          });
          gsap.to(this.colorEye.position, {
            x: 0.01,
            y: -0.01,
            duration: 0.5,
          });
        },
      })
      .to(this.position, {
        x: -0.5,
        y: -1,
        duration: 0.5,
        ease: "none",
      })
      .to(this.position, {
        x: -0.2,
        y: -1.1,
        duration: 0.5,
        ease: "none",
        onStart: () => {
          gsap.to(this.rotation, {
            z: 0.1,
            duration: 0.5,
          });
        },
        onComplete: () => {
          this.eyesTimeline.resume();
        },
      })
      .to(this.position, {
        y: -0.85,
        x: -0.15,
        duration: 0.7,
      });
  };

  _repeatingEyesAnimation = () => {
    this.eyesTimeline
      .to(this.colorEye.position, {
        x: -0.02,
        y: 0.01,
        duration: 0.5,
        delay: 1.5,
      })
      .to(this.colorEye.position, {
        x: 0,
        y: 0,
        duration: 1,
      })
      .to(this.colorEye.position, {
        x: 0.01,
        y: 0.01,
        duration: 1,
      })
      .to(this.colorEye.position, {
        x: 0,
        y: 0.01,
        duration: 1,
        onComplete: () => {
          this._repeatingEyesAnimation();
        },
      });
  };

  burn = () => {
    this.eyesTimeline.pause();
    gsap.to(this.position, {
      y: -1.1,
      duration: 1,
    });
    gsap.to(this.rotation, {
      z: -0.2,
      duration: 1,
    });
    gsap.to(this.body.material.color, {
      r: 0,
      g: 0,
      b: 0,
      delay: 0.5,
      duration: 1.5,
    });
  };
}
