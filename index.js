const subMenu = document.querySelector(".sub-menu");
const burger = document.querySelector(".burger");
const closeX = document.querySelector(".close-x");
const leistungen = document.querySelector(".leistungen");


function visibleSubMenu() {
  subMenu.classList.remove("invisible");
  subMenu.classList.add("visible");
}
function inVisibleSubMenu() {
  subMenu.classList.add("invisible");
  subMenu.classList.remove("visible");
}

burger.addEventListener("click", visibleSubMenu);
closeX.addEventListener("click", inVisibleSubMenu);
leistungen.addEventListener("click", visibleSubMenu);
