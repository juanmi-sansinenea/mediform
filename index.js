const subMenu = document.querySelector(".sub-menu");
const burger = document.querySelector(".burger");
const closeX = document.querySelector(".close-x");
const leistungen = document.querySelector(".leistungen");
const subSubmenu = document.querySelector(".sub-submenu");
const submenuItem = document.querySelector(".submenu-item");

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
function showSubSubmenu() {
  subSubmenu.classList.remove("display-none");
  subSubmenu.classList.add("display-block");
}
function hideSubSubmenu() {
  subSubmenu.classList.add("display-none");
  subSubmenu.classList.remove("display-block");
}
function toggleSubSubmenu() {
  subSubmenu.classList.contains("display-none") === true
    ? showSubSubmenu()
    : hideSubSubmenu();
}

burger.addEventListener("click", visibleSubMenu);
closeX.addEventListener("click", inVisibleSubMenu);
leistungen.addEventListener("click", toggleSubmenu);
submenuItem.addEventListener("click", toggleSubSubmenu);
