import gsap from "gsap";
import * as THREE from "three";
import logoPicTexture from "../../assets/logo_picture.webp";
import logoTextTexture from "../../assets/end_text.png";
import buttonTexture from "../../assets/button.png";

export const showEndCard = (renderer) => {
  const helper = new THREE.Vector4();
  const endCard = document.querySelector(".endcard");
  const logoPicture = document.querySelector(".logo_picture");
  const logoText = document.querySelector(".logo_text");
  const button = document.querySelector(".button");
  const timeline = gsap.timeline();

  renderer.getViewport(helper);
  const aspect = helper.width / helper.height;

  button.src = buttonTexture;
  logoPicture.src = logoPicTexture;
  logoText.src = logoTextTexture;

  button.addEventListener("click", () => {
    location.href =
      "https://play.google.com/store/apps/details?id=com.awem.cradleofempires.andr&hl=en";
  });

  timeline
    .to(".endcard", {
      opacity: 1,
      duration: 0.7,
    })
    .to(".button", {
      width: aspect > 1 ? "40%" : "70%",
      ease: "elastic.out(1, 0.3)",
      duration: 1.5,
    })
    .to(".button", {
      duration: 1.5,
      scale: 1.1,
      repeat: Infinity,
      yoyo: true,
    });
};
