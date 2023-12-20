const buttons = document.querySelectorAll("[data-carousel-button]");
const title = document.querySelector(".main");
const videoDiv = document.querySelector(".video");
const ytVideo = document.querySelector(".ytvideo");
const closeVideo = document.querySelector(".closeVideo");
const hamburger = document.querySelector(".hamburger");
const navSlider = document.querySelector(".nav-slider");
const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.5 } });
const tl2 = gsap.timeline({ defaults: { ease: "power2.in", duration: 0.8 } });

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");

    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});

function autoSlide() {
  const nextButton = document.querySelector("[data-carousel-button='next']");
  nextButton.click();
}

setInterval(autoSlide, 5000);

const playVideo = () => {
  title.style.opacity = "0";
  title.style.zIndex = "-1";
  videoDiv.style.backgroundImage = "none";
  ytVideo.style.opacity = "1";
  ytVideo.play();
  closeVideo.style.opacity = ".8";
};

const stopVideo = () => {
  ytVideo.style.opacity = "0";
  // ytVideo.pause()
  ytVideo.load();
  closeVideo.style.opacity = "0";
  videoDiv.style.backgroundImage =
    "url(Assets/ES-HomePage-Sec3-Video-banner-05-2023.jpg)";
  title.style.zIndex = "0";
  title.style.opacity = "1";
  videoDiv.style.zIndex = "0";
};

ytVideo.addEventListener("ended", stopVideo);

hamburger.addEventListener("click", () => navAnimation());

function navAnimation() {
  if (navSlider.classList.contains("active")) {
    hamburgerNonActiveAnimation();
    closeNav();
  } else {
    hamburgerActiveAnimation();
    openNav();
  }
}

function closeNav() {
  tl2.fromTo(
    ".nav-slider",
    {
      y: "0",
    },
    {
      y: "-150%",
    }
  );
  navSlider.classList.remove("active");
  document.body.classList.remove("active");
  document.documentElement.classList.remove("active");
}

function openNav() {
  tl.fromTo(
    ".nav-slider",
    {
      y: "-150%",
    },
    {
      y: "0%",
    }
  );

  tl2.fromTo(
    ".menu",
    {
      y: "100%",
      opacity: 0,
    },
    {
      opacity: 1,
      ease: "expo.out",
      duration: 1.5,
      y: "0%",
    },
    "+=1"
  );

  tl2.fromTo(
    ".menu a",
    {
      y: "250%",
      opacity: 0,
    },
    {
      opacity: 1,
      stagger: 0.1,
      ease: "expo.out",
      y: "0%",
      duration: 1.5,
    },
    "<"
  );
  navSlider.classList.add("active");
  document.body.classList.add("active");
  document.documentElement.classList.add("active");
}

function hamburgerActiveAnimation() {
  const hamburger = document.querySelector(".hamburger");
  const hamburgerBefore = window.getComputedStyle(hamburger, "::before");
  const hamburgerAfter = window.getComputedStyle(hamburger, "::after");

  // Create a new style rule for the pseudo-element
  const pseudoElementStyle = document.styleSheets[0].insertRule(
    `.hamburger::before { transform: rotate(-45deg); transform-origin: right;}`,
    0
  );

  const pseudoElementStyl = document.styleSheets[0].insertRule(
    `.hamburger::after { transform: rotate(45deg); transform-origin: right;}`,
    0
  );
  // Apply the new style rule to the pseudo-element
  hamburger.style.animation = "none";
  hamburger.offsetHeight; /* trigger reflow */
  hamburger.style.animation = null;
}

function hamburgerNonActiveAnimation() {
  const hamburger = document.querySelector(".hamburger");
  const hamburgerBefore = window.getComputedStyle(hamburger, "::before");
  const hamburgerAfter = window.getComputedStyle(hamburger, "::after");

  // Create a new style rule for the pseudo-element
  const pseudoElementStyle = document.styleSheets[0].insertRule(
    `.hamburger::before { transform: rotate(0deg); transform-origin: right;}`,
    0
  );

  const pseudoElementStyl = document.styleSheets[0].insertRule(
    `.hamburger::after { transform: rotate(0deg); transform-origin: right;}`,
    0
  );
  // Apply the new style rule to the pseudo-element
  hamburger.style.animation = "none";
  hamburger.offsetHeight; /* trigger reflow */
  hamburger.style.animation = null;
}
