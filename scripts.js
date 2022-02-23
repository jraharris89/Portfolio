const mouseOuter = document.querySelector(".mouse-outer");
const mouseInner = document.querySelector(".mouse-inner");

//Mouse Graphics
const mouseFunc = (x, y) => {
  mouseOuter.style.cssText = `top: ${y}px; left: ${x}px; opacity:1`;
  mouseInner.style.cssText = `top: ${y}px; left: ${x}px; opacity:1`;
};
document.body.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;

  mouseFunc(x, y);
});
document.body.addEventListener("mouseleave", () => {
  mouseOuter.style.opacity = "0";
  mouseInner.style.opacity = "0";
});
//END OF Mouse Graphics
