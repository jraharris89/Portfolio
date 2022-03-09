//Mouse Graphics
const mouseCircle = document.querySelector(".mouse-outer");
const mouseDot = document.querySelector(".mouse-inner");

let mouseCircleBool = true;

const mouseCircleFn = (x, y) => {
  mouseCircleBool &&
    (mouseCircle.style.cssText = `top: ${y}px; left: ${x}px; opacity:1`);
  mouseDot.style.cssText = `top: ${y}px; left: ${x}px; opacity:1`;
};

let hoveredElPosition = [];

const stickyElement = (x, y, hoveredEl) => {
  //sticky elements

  if (hoveredEl.classList.contains("sticky")) {
    hoveredElPosition.length < 1 &&
      (hoveredElPosition = [hoveredEl.offsetTop, hoveredEl.offsetLeft]);

    hoveredEl.style.cssText = `top:${y}px; left:${x}px`;

    if (
      hoveredEl.offsetTop <= hoveredElPosition[0] - 50 ||
      hoveredEl.offsetTop >= hoveredElPosition[0] + 50 ||
      hoveredEl.offsetLeft <= hoveredElPosition[1] - 50 ||
      hoveredEl.offsetLeft >= hoveredElPosition[1] + 50
    ) {
      hoveredEl.style.cssText = "";
      hoveredElPosition = [];
    }
    hoveredEl.onmouseleave = () => {
      hoveredEl.style.cssText = "";
      hoveredElPosition = [];
    };
  }
  //END OF sticky elements
};
// Mouse Circle Transform
const mouseCircleTransform = (hoveredEl) => {
  if (hoveredEl.classList.contains("pointer-enter")) {
    hoveredEl.onmousemove = () => {
      mouseCircleBool = false;
      mouseCircle.style.cssText = `
      width: ${hoveredEl.getBoundingClientRect().width}px;
      height: ${hoveredEl.getBoundingClientRect().height}px;
      top: ${hoveredEl.getBoundingClientRect().top}px;
      left: ${hoveredEl.getBoundingClientRect().left}px;
      opacity: 1;
      transform: translate(0, 0);
      animation: none;
      border-radius: ${getComputedStyle(hoveredEl).borderBottomLeftRadius};
      transition: width .5s, height .5s, top .5s, left .5s, transform .5s, border-radius .5s;
      `;
    };

    hoveredEl.onmouseleave = () => {
      mouseCircleBool = true;
    };

    document.onscroll = () => {
      if (!mouseCircleBool) {
        mouseCircle.style.top = `${hoveredEl.getBoundingClientRect().top}px`;
      }
    };
  }
};
// End of Mouse Circle Transform
document.body.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;

  mouseCircleFn(x, y);
  animatedCircles(e, x, y);
  const hoveredEl = document.elementFromPoint(x, y);
  stickyElement(x, y, hoveredEl);

  mouseCircleTransform(hoveredEl);
});
document.body.addEventListener("mouseleave", () => {
  mouseCircle.style.opacity = "0";
  mouseDot.style.opacity = "0";
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
const aboutMeTextContent =
  "My name is Jonathon Harris, I am a senior at Portland State University. My interests include: cybersecurity, web development, automation, and exercising. It's my dream to be employed as a software engineer. Please hire me!  ";

Array.from(aboutMeTextContent).forEach((char) => {
  const span = document.createElement("span");
  span.textContent = char;
  aboutMeText.appendChild(span);
  span.addEventListener("mouseenter", (e) => {
    e.target.style.animation = "aboutmeTextAnim 10s infinite";
  });
});
//END OF About me text

//Projects
const projects = document.querySelectorAll(".project a");
projects.forEach((project) => {
  project.addEventListener("mouseenter", () => {
    project.firstElementChild.style.top = `-${
      project.firstElementChild.offsetHeight - project.offsetHeight + 30
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
