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

function toggleBorder(evt) {
  console.log("hi :>> ", evt);
  evt.target.classList.contains("border-bottom") === true
    ? evt.target.classList.remove("border-bottom")
    : evt.target.classList.add("border-bottom");
}

burger.addEventListener("click", visibleSubMenu);
closeX.addEventListener("click", inVisibleSubMenu);
leistungen.addEventListener("click", toggleSubmenu);

// expand / collapse sub-submenus and remove border when expanded
for (let i = 0; i < 3; i++) {
  submenuItem[i].addEventListener("click", toggleBorder);
  submenuItem[i].addEventListener("click", () => {
    subSubmenu[i].classList.contains("display-none") === true
      ? showSubSubmenu(i)
      : hideSubSubmenu(i);
  });
}
