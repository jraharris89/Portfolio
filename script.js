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
//Progress bar
const progressBar = document.querySelector(".progress-bar");
const sections = document.querySelectorAll("section");
const halfCircles = document.querySelectorAll(".half-circle");
const halfCircleTop = document.querySelector(".half-circle-top");
const progressBarCircle = document.querySelector(".progress-bar-circle");

const progressBarFn = () => {
  const pageViewportHeight = window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;
  const scrolledPortion = window.pageYOffset;

  const scrolledPortionDegree =
    (scrolledPortion / (pageHeight - pageViewportHeight)) * 360;
  halfCircles.forEach((el) => {
    el.style.transform = `rotate(${scrolledPortionDegree}deg)`;
    if (scrolledPortionDegree >= 180) {
      halfCircles[0].style.transform = "rotate(180deg)";
      halfCircleTop.style.opacity = "0";
    } else {
      halfCircleTop.style.opacity = "1";
    }
  });
  const scrollBool = scrolledPortion + pageViewportHeight === pageHeight;
  //Progress Bar Click
  progressBar.onclick = (e) => {
    e.preventDefault();

    const sectionPositions = Array.from(sections).map(
      (section) => scrolledPortion + section.getBoundingClientRect().top
    );

    const position = sectionPositions.find((sectionPosition) => {
      return sectionPosition > scrolledPortion;
    });
    scrollBool ? window.scrollTo(0, 0) : window.scrollTo(0, position);
    console.log(position);
  };
  //END OF Progress Bar Click
  //Arrow Rotation
  if (scrollBool) {
    progressBarCircle.style.transform = "rotate(180deg)";
  } else {
    progressBarCircle.style.transform = "rotate(0deg)";
  }
  //END OF Arrow Rotation
};
progressBarFn();
//END OF Progress bar
//Navigation
const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");
document.addEventListener("scroll", () => {
  menuIcon.classList.add("show-menu-icon");
  navbar.classList.add("hide-navbar");

  if (window.scrollY === 0) {
    menuIcon.classList.remove("show-menu-icon");
    navbar.classList.remove("hide-navbar");
  }
  progressBarFn();
});
menuIcon.addEventListener("click", () => {
  menuIcon.classList.remove("show-menu-icon");
  navbar.classList.remove("hide-navbar");
});
//END OF Navigation
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

//Projects
const projects = document.querySelectorAll(".project a");
projects.forEach((project) => {
  project.addEventListener("mouseenter", () => {
    project.firstElementChild.style.top = `-${
      project.firstElementChild.offsetHeight - project.offsetHeight + 20
    }px`;
  });
  project.addEventListener("mouseleave", () => {
    project.firstElementChild.style.top = "2rem";
  });
});
//End of Projects
// Section 4
document.querySelectorAll(".service-btn").forEach((service) => {
  service.addEventListener("click", (e) => {
    e.preventDefault();

    const serviceText = service.nextElementSibling;
    serviceText.classList.toggle("change");

    const rightPosition = serviceText.classList.contains("change")
      ? `calc(100% - ${getComputedStyle(service.firstElementChild).width})`
      : 0;

    service.firstElementChild.style.right = rightPosition;
  });
});
// End of Section 4

// Section 5
//Form
const formHeading = document.querySelector(".form-heading");
const formInputs = document.querySelectorAll(".contact-form-input");

formInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    formHeading.style.opacity = "0";
    setTimeout(() => {
      formHeading.textContent = `Your ${input.placeholder}`;
      formHeading.style.opacity = "1";
    }, 300);
  });
  input.addEventListener("blur", () => {
    formHeading.style.opacity = "0";
    setTimeout(() => {
      formHeading.textContent = "Let's Connect";
      formHeading.style.opacity = "1";
    }, 300);
  });
});
//END OF form
// Slideshow
const slideshow = document.querySelector(".slideshow");

setInterval(() => {
  const firstIcon = slideshow.firstElementChild;

  firstIcon.classList.add("faded-out");

  const thirdIcon = slideshow.children[3];

  thirdIcon.classList.add("light");

  thirdIcon.previousElementSibling.classList.remove("light");

  setTimeout(() => {
    slideshow.removeChild(firstIcon);

    slideshow.appendChild(firstIcon);

    setTimeout(() => {
      firstIcon.classList.remove("faded-out");
    }, 500);
  }, 500);
}, 3000);
// End of Slideshow
// END OF Section 5
