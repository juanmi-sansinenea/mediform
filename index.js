const mobileMenu = document.querySelector(".mobile-menu");
const burger = document.querySelector(".burger");
const closeX = document.querySelector(".close-x");

function visibleMobileMenu() {
  mobileMenu.classList.remove("invisible");
  mobileMenu.classList.add("visible");
}
function inVisibleMobileMenu() {
  mobileMenu.classList.add("invisible");
  mobileMenu.classList.remove("visible");
}

burger.addEventListener("click", visibleMobileMenu);
closeX.addEventListener("click", inVisibleMobileMenu);
