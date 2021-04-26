const subMenu = document.querySelector(".sub-menu");
const burger = document.querySelector(".burger");
const closeX = document.querySelector(".close-x");
const leistungen = document.querySelector(".leistungen");
const subSubmenu = document.querySelectorAll(".sub-submenu");
const submenuItem = document.querySelectorAll(".submenu-item");
//const teaserSmall = document.querySelectorAll(".teaser-small");

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
  subSubmenu[which].classList.add("display-grid");
}
function hideSubSubmenu(which) {
  subSubmenu[which].classList.add("display-none");
  subSubmenu[which].classList.remove("display-grid");
}

function toggleBorder(evt) {
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

/*
function visibleTeaserModal(which) {
  this.querySelector(".teaser-small-modal").classList.add("visible");
  this.querySelector(".teaser-small-modal").classList.remove("invisible");
}
function invisibleTeaserModal(which) {
  this.querySelector(".teaser-small-modal").classList.remove("visible");
  this.querySelector(".teaser-small-modal").classList.add("invisible");
}

teaserSmall[0].addEventListener("click", () => {
  teaserSmall[0]
    .querySelector(".teaser-small-modal")
    .classList.contains("invisible") === true
    ? visibleTeaserModal(0)
    : invisibleTeaserModal(0);
});
*/

class teaserSmall extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("click", () => {
      this.querySelector(".teaser-small-modal").classList.contains(
        "invisible"
      ) === true
        ? this.visibleTeaserModal()
        : this.invisibleTeaserModal();
    });
    this.visibleTeaserModal = function () {
      this.querySelector(".teaser-small-modal").classList.add("visible");
      this.querySelector(".teaser-small-modal").classList.remove("invisible");
    };
    this.invisibleTeaserModal = function () {
      this.querySelector(".teaser-small-modal").classList.remove("visible");
      this.querySelector(".teaser-small-modal").classList.add("invisible");
    };
  }
  connectedCallback() {
    this.querySelector(".teaser-small-modal").classList.add("invisible");
  }
  disconnectedCallback() {
    /*called when the element is disconnected from the page*/
  }
}
customElements.define("teaser-small", teaserSmall);
