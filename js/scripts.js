import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 2,
  normalizeScroll: true,
  ignoreMobileResize: true,
  preventDefault: true
});

function getInitialOffset() {
  const track = document.querySelector(".gallery-track");
  const focusImg = track.querySelector('[data-index="1"] .img-focus');

  const focusLeft = focusImg.offsetLeft;
  const focusWidth = focusImg.offsetWidth;
  const focusCenter = focusLeft + focusWidth / 2;

  const targetCenter = window.innerWidth * (1 / 3);

  const offset = focusCenter - targetCenter;

  return offset;
}

function getOffsetForIndex(index) {
  const track = document.querySelector(".gallery-track");
  const focusImg = track.querySelector(`[data-index="${index}"] .img-focus`);

  console.log("index:", index, "focusImg found:", focusImg);

  const focusLeft = focusImg.offsetLeft;
  const focusWidth = focusImg.offsetWidth;
  const focusCenter = focusLeft + focusWidth / 2;

  const targetCenter = window.innerWidth * (1 / 3);

  return focusCenter - targetCenter;
}

function buildGalleryScroll() {
  const sequence = [1, 2, 3, 4, 0];
  const offsets = sequence.map(getOffsetForIndex);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#gallery",
      start: "top top",
      end: "+=4000",
      scrub: true,
      pin: true,
      anticipatePin: 1,
      markers: true
    }
  });

  tl.to(".gallery-track", { x: -offsets[1], duration: 1 }) // 1 → 2
    .to(".gallery-track", { x: -offsets[2], duration: 1 }) // 2 → 3
    .to(".gallery-track", { x: -offsets[3], duration: 1 }) // 3 → 4
    .to(".gallery-track", { x: -offsets[4], duration: 1 }); // 4 → 0

  return tl;
}

const offset = getInitialOffset();
gsap.set(".gallery-track", { x: -offset });

buildGalleryScroll();