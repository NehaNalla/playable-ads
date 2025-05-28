import * as THREE from "three";
import gsap from "gsap";
import body from "../../assets/shark_body.webp";
import nose from "../../assets/shark_nose.webp";
import mouth from "../../assets/shark_mouth.webp";

class SharkPart extends THREE.Mesh {
  constructor(position, scale, name, map, width, height, rotZ) {
    super(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(map),
      })
    );

    this.name = name;
    this.position.set(position.x, position.y, position.z);
    if (rotZ) {
      this.rotation.z = rotZ;
    }
    this.scale.setScalar(scale);
    this.material.transparent = true;
  }
}

export default class Shark extends THREE.Group {
  constructor(name) {
    super();
    this.name = name;
    this.position.z = 0.1;
    this.position.x = 4;
    this.mouth = new SharkPart(
      { x: -1.16, y: -0.23, z: 0 },
      5,
      "Mouth",
      mouth,
      0.3,
      0.3,
      0.2
    );
    this.body = new SharkPart(
      { x: 0, y: 0, z: 0 },
      5,
      "Body",
      body,
      0.69,
      0.33
    );
    this.nose = new SharkPart(
      { x: -1.54, y: 0.02, z: 0 },
      5,
      "Nose",
      nose,
      0.3,
      0.3
    );
    this.add(this.mouth);
    this.add(this.body);
    this.add(this.nose);
    this.scale.setScalar(1.05);
    this.firstTimeLine = gsap.timeline();
  }

  sharkAnim = () => {
    gsap.to(this.position, {
      duration: 2,
      x: 2.5,
      onStart: () => {
        gsap.to(this.mouth.rotation, {
          z: 0.8,
          duration: 0.3,
        });
      },
    });
    gsap
      .to(this.position, {
        duration: 1,
        y: -0.17,
      })
      .then(() => {
        gsap.to(this.mouth.rotation, {
          z: 0.2,
          duration: 0.6,
        });
        gsap.to(this.position, {
          y: 0.1,
          duration: 1,
          onComplete: () => {
            this._sharkCycleAnimation();
          },
        });
      });
  };

  _noseAnim = (increase) => {
    if (increase) {
      gsap.to(this.nose.scale, {
        x: 3,
        duration: 0.15,
        delay: 0.15,
      });
      gsap.to(this.nose.position, {
        x: -1.47,
        y: 0.03,
        duration: 0.15,
        delay: 0.15,
      });
    } else {
      gsap.to(this.nose.scale, {
        x: 5,
        duration: 0.1,
      });
      gsap.to(this.nose.position, {
        x: -1.54,
        y: 0.02,
        duration: 0.1,
      });
    }
  };
  _mouthAnim = () => {
    gsap
      .to(this.mouth.rotation, {
        z: 0.6,
        duration: 0.3,
      })
      .then(() =>
        gsap.to(this.mouth.rotation, {
          delay: 0.2,
          z: 0.2,
          duration: 0.3,
        })
      );
  };

  _sharkCycleAnimation = () => {
    gsap.to(this.position, {
      y: 0,
      duration: 1,
      repeat: 1,
      yoyo: true,
    });
    this.firstTimeLine
      .to(this.mouth.rotation, {
        z: 0.6,
        duration: 0.5,
      })
      .to(this.mouth.rotation, {
        delay: 1,
        duration: 0.5,
        z: 0.1,
      })
      .to(this.position, {
        duration: 0.7,
        x: 3,
        onStart: () => {
          this._mouthAnim();
        },
      })
      .to(this.position, {
        duration: 0.33,
        x: 1.82,
        onStart: () => {
          this._noseAnim(true);
        },
      })
      .to(this.position, {
        duration: 0.63,
        x: 2.5,
        onStart: () => {
          this._noseAnim(false);
        },
      })
      .to(this.position, {
        x: 3,
        duration: 0.6,
        onStart: () => {
          this._mouthAnim();
        },
      })
      .to(this.position, {
        duration: 0.3,
        x: 1.82,
        onStart: () => {
          this._noseAnim(true);
        },
      })
      .to(this.position, {
        duration: 0.5,
        x: 2.5,
        onStart: () => {
          this._noseAnim(false);
        },
      })
      .to(this.position, {
        y: 0,
        duration: 1,
        repeat: 4,
        yoyo: true,
      })
      .to(this.position, {
        y: 0.1,
        duration: 1,
        onComplete: () => {
          this._sharkCycleAnimation();
        },
      });
  };
}
