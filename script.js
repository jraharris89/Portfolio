//Mouse Graphics
const mouseOuter = document.querySelector(".mouse-outer");
const mouseInner = document.querySelector(".mouse-inner");

const mouseFunc = (x, y) => {
  mouseOuter.style.cssText = `top: ${y}px; left: ${x}px; opacity:1`;
};
document.body.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;

  mouseFunc(x, y);
  animatedCircles(e, x, y);
});
document.body.addEventListener("mouseleave", () => {
  mouseOuter.style.opacity = "0";
  mouseInner.style.opacity = "0";
});
//END OF Mouse Graphics

//ANIMATED CIRCLES
const circles = document.querySelectorAll(".circle");
const mainImg = document.querySelector(".main-circle img");

let mX = 0;
let mY = 0;
let move = 100;
const animatedCircles = (e, x, y) => {
  if (x < mX) {
    circles.forEach((circle) => {
      circle.style.left = `${move}px`;
    });
    mainImg.style.left = `${move}px`;
  } else {
    circles.forEach((circle) => {
      circle.style.left = `-${move}px`;
    });
    mainImg.style.left = `-${move}px`;
  }
  if (y < mY) {
    circles.forEach((circle) => {
      circle.style.top = `${move}px`;
    });
    mainImg.style.top = `${move}px`;
  } else {
    circles.forEach((circle) => {
      circle.style.top = `-${move}px`;
    });
    mainImg.style.top = `-${move}px`;
  }
  mX = e.clientX;
  mY = e.clientY;
};
//END OF ANIMATED CIRCLES
//MAIN BUTTON
const mainBtns = document.querySelectorAll(".main-btn");
mainBtns.forEach((btn) => {
  let ripple;
  btn.addEventListener("mouseenter", (e) => {
    const left = e.clientX - e.target.getBoundingClientRect().left;
    const top = e.clientY - e.target.getBoundingClientRect().top;
    ripple = document.createElement("div");
    ripple.classList.add("ripple");
    ripple.style.left = `${left}px`;
    ripple.style.top = `${top}px`;
    btn.prepend(ripple);
  });
  btn.addEventListener("mouseleave", () => {
    btn.removeChild(ripple);
  });
});

//END OF MAIN BUTTON
// About Me Text
const aboutMeText = document.querySelector(".about-me-text");
const aboutMeTextContent = "Test text for section-2. ";

Array.from(aboutMeTextContent).forEach((char) => {
  const span = document.createElement("span");
  span.textContent = char;
  aboutMeText.appendChild(span);
  span.addEventListener("mouseenter", (e) => {
    e.target.style.animation = "aboutmeTextAnim 5s infinite";
  });
});
//END OF About me text
