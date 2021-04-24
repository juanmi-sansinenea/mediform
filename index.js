const subMenu = document.querySelector(".sub-menu");
const burger = document.querySelector(".burger");
const closeX = document.querySelector(".close-x");
const leistungen = document.querySelector(".leistungen");
const subSubmenu = document.querySelectorAll(".sub-submenu");
const submenuItem = document.querySelectorAll(".submenu-item");

function visibleSubMenu() {
  subMenu.classList.remove("invisible");
  subMenu.classList.add("visible");
}
function inVisibleSubMenu() {
  subMenu.classList.add("invisible");
  subMenu.classList.remove("visible");
}
function toggleSubmenu() {
  subMenu.classList.contains("invisible") === true
    ? visibleSubMenu()
    : inVisibleSubMenu();
}
function showSubSubmenu(which) {
  subSubmenu[which].classList.remove("display-none");
  subSubmenu[which].classList.add("display-block");
}
function hideSubSubmenu(which) {
  subSubmenu[which].classList.add("display-none");
  subSubmenu[which].classList.remove("display-block");
}
function toggleSubSubmenu(which) {
  console.log("which :>> ", which);
  console.log("subSubmenu[which] :>> ", subSubmenu[which]);
  subSubmenu[which].classList.contains("display-none") === true
    ? showSubSubmenu(which)
    : hideSubSubmenu(which);
}

function toggleBorder(evt) {
  console.log("hi :>> ", evt);
  evt.target.classList.contains("border-bottom") === true
    ? evt.target.classList.remove("border-bottom")
    : evt.target.classList.add("border-bottom");
}

burger.addEventListener("click", visibleSubMenu);
closeX.addEventListener("click", inVisibleSubMenu);
leistungen.addEventListener("click", toggleSubmenu);

submenuItem[0].addEventListener("click", toggleBorder);
submenuItem[0].addEventListener("click", () => {
  subSubmenu[0].classList.contains("display-none") === true
    ? showSubSubmenu(0)
    : hideSubSubmenu(0);
});
submenuItem[1].addEventListener("click", toggleBorder);
submenuItem[1].addEventListener("click", () => {
  subSubmenu[1].classList.contains("display-none") === true
    ? showSubSubmenu(1)
    : hideSubSubmenu(1);
});
