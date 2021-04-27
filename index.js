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

class teaserSmall extends HTMLElement {
  constructor() {
    super();
    this.clickArea = this.querySelector(".click-area");
    this.modal = this.querySelector(".teaser-small-modal");
    this.arrow = this.querySelector(".arrow-right");
    this.closeX = this.querySelector(".close-teaser");
    //
    this.clickArea.addEventListener("mouseover", () => {
        this.arrow.classList.add("anim-arrow-in");
        this.arrow.classList.remove("anim-arrow-out");
    });
    this.clickArea.addEventListener("mouseout", () => {
        this.arrow.classList.add("anim-arrow-out");
        this.arrow.classList.remove("anim-arrow-in");
    });
    this.clickArea.addEventListener("click", () => {
      this.style.zIndex = 1;
      this.visibleTeaserModal();
    });
    this.closeX.addEventListener("click", () => {
      this.invisibleTeaserModal();
      this.style.zIndex = 0;
    });
    this.visibleTeaserModal = function () {
      this.modal.classList.add("visible");
      this.modal.classList.remove("invisible");
      this.clickArea.classList.add("invisible");
      this.clickArea.classList.remove("visible");
    };
    this.invisibleTeaserModal = function () {
      this.modal.classList.remove("visible");
      this.modal.classList.add("invisible");
      this.clickArea.classList.remove("invisible");
      this.clickArea.classList.add("visible");
    };
  }
  connectedCallback() {
    this.modal.classList.add("invisible");
    this.clickArea.classList.add("visible");
  }
  disconnectedCallback() {
    /*called when the element is disconnected from the page*/
  }
}
customElements.define("teaser-small", teaserSmall);
