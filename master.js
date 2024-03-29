//////////////////////////////////////////////////////////////////////////////////////
/////////////   ROLL IN ELEMENTS ON SCROLL    ////////////////////////////////////////
/////////////   & COLLAPS AND EXPAND NAV ON SCROLL    ////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
function animateOnScroll() {
  var elements;
  var windowHeight;
  var mainWrapper = document.querySelector(".main-wrapper");

  function init() {
    elements = document.querySelectorAll(".hidden");
    windowHeight = window.innerHeight;
  }

  function checkPosition() {
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var positionFromTop = elements[i].getBoundingClientRect().top;

      if (positionFromTop - windowHeight <= 0) {
        element.classList.remove("hidden");
        if (
          element.classList.contains("will-roll-left") &&
          element.classList.contains("delay")
        ) {
          element.classList.add("roll-left-delay");
        } else if (element.classList.contains("will-roll-left")) {
          element.classList.add("roll-left");
        } else if (
          element.classList.contains("will-roll-right") &&
          element.classList.contains("delay")
        ) {
          element.classList.add("roll-right-delay");
        } else if (element.classList.contains("will-roll-right")) {
          element.classList.add("roll-right");
        } else if (element.classList.contains("delay")) {
          element.classList.add("roll-up-delay");
        } else {
          element.classList.add("roll-up");
        }
      }
    }
  }
  /////// COLLAPSE & EXPAND NAV ON SCROLL ////////////////
  const nav = document.querySelector(".nav");
  const content = document.querySelector(".content");
  let scrollPos = 0;
  function checkContentPosition() {
    if (
      content.getBoundingClientRect().top < nav.getBoundingClientRect().height
    ) {
      if (content.getBoundingClientRect().top > scrollPos) {
        nav.classList.remove("nav-collapse");
        nav.classList.add("nav-expand");
      } else {
        nav.classList.add("nav-collapse");
        nav.classList.remove("nav-expand");
      }
      scrollPos = content.getBoundingClientRect().top;
    }
  }

  mainWrapper.addEventListener("scroll", () => {
    checkPosition();
    checkContentPosition();
  });

  window.addEventListener("resize", init);

  init();
  checkPosition();
}

function dontAnimateOnScroll() {
  elements = document.querySelectorAll(".hidden");
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    element.classList.remove("hidden");
  }
  animateOnScroll();
}

//////////////////////////////////////////////////////////////////////////////////////
/////////////   TOP NAV    ///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
const modalMenu = document.querySelector(".modal-menu");
const burger = document.querySelector(".burger");
const closeX = document.querySelector(".close-x");
const leistungen = document.querySelector(".leistungen");
const subSubmenu = document.querySelectorAll(".sub-submenu");
const submenuItem = document.querySelectorAll(".submenu-item");
const scrollMe = document.querySelector(".scroll-me");
const submenuTrigger = document.querySelector(".submenu-trigger");
const subMenu = document.querySelector(".submenu");
const mainMenuItems = document.querySelectorAll(".main-menu-item");
const expandSubmenu = document.querySelector(".expand-submenu");
const expandedSubmenu = document.querySelector(".expanded-submenu");
const expandSubSub = document.querySelectorAll(".expand-sub-sub");
const expandedSubSub = document.querySelectorAll(".expanded-sub-sub");

function visibleModalMenu() {
  modalMenu.classList.remove("invisible");
  modalMenu.classList.add("visible");
}
function inVisibleModalMenu() {
  modalMenu.classList.add("invisible");
  modalMenu.classList.remove("visible");
}
function toggleModalMenu() {
  modalMenu.classList.contains("invisible") === true
    ? visibleModalMenu()
    : inVisibleModalMenu();
}

function showSubSubmenu(which) {
  subSubmenu[which].classList.remove("display-none");
  subSubmenu[which].classList.add("display-grid");
  if (window.matchMedia("(min-width: 1025px)").matches) {
    scrollMe.style.height = "100vh"; //<--make sub-submenu cover the entire viewport and make it scrollable (only desktop and hd)
  }
  suggestExpandedSubSub(which);
}
function hideSubSubmenu(which) {
  subSubmenu[which].classList.add("display-none");
  subSubmenu[which].classList.remove("display-grid");
  if (window.matchMedia("(min-width: 1025px)").matches) {
    scrollMe.style.height = "auto"; //<--make the sub-submenu collapse back (only desktop and hd)
  }
  suggestExpandingSubSub(which);
}

function toggleBorder(evt) {
  evt.target.classList.contains("border-bottom") === true
    ? evt.target.classList.remove("border-bottom")
    : evt.target.classList.add("border-bottom");
}

handleMenuVisibilities = () => {
  if (window.innerWidth < 1025) {
    showMainMenuItems();
    hideSubMenu();
    scrollMe.style.height = "100vh";
    dontAnimateOnScroll();
  } else {
    hideMainMenuItems();
    showSubMenu();
    scrollMe.style.height = "auto";
    animateOnScroll();
  }
  for (i = 0; i < expandSubSub.length; i++) {
    suggestExpandingSubSub(i);
  }
};

window.addEventListener("load", handleMenuVisibilities);
window.addEventListener("resize", handleMenuVisibilities);

function toggleSubMenu() {
  subMenu.classList.contains("display-none") ? showSubMenu() : hideSubMenu();
}
showSubMenu = () => {
  subMenu.classList.add("display-block");
  subMenu.classList.remove("display-none");
  suggestExpandedSubmenu();
};
hideSubMenu = () => {
  subMenu.classList.add("display-none");
  subMenu.classList.remove("display-block");
  suggestExpandingSubmenu();
};
showMainMenuItems = () => {
  for (i = 0; i < mainMenuItems.length; i++) {
    mainMenuItems[i].classList.remove("display-none");
    mainMenuItems[i].classList.add("display-block");
  }
};
hideMainMenuItems = () => {
  for (i = 0; i < mainMenuItems.length; i++) {
    mainMenuItems[i].classList.remove("display-block");
    mainMenuItems[i].classList.add("display-none");
  }
};
suggestExpandingSubmenu = () => {
  expandSubmenu.style.display = "inline";
  expandedSubmenu.style.display = "none";
};
suggestExpandedSubmenu = () => {
  expandSubmenu.style.display = "none";
  expandedSubmenu.style.display = "inline";
};
suggestExpandingSubSub = (which) => {
  expandSubSub[which].style.display = "inline";
  expandedSubSub[which].style.display = "none";
};
suggestExpandedSubSub = (which) => {
  expandSubSub[which].style.display = "none";
  expandedSubSub[which].style.display = "inline";
};

burger.addEventListener("click", visibleModalMenu);
closeX.addEventListener("click", inVisibleModalMenu);
leistungen.addEventListener("click", toggleModalMenu);
submenuTrigger.addEventListener("click", toggleSubMenu);

// expand / collapse sub-submenus and remove border when expanded
for (let i = 0; i < 3; i++) {
  submenuItem[i].addEventListener("click", toggleBorder);
  submenuItem[i].addEventListener("click", () => {
    subSubmenu[i].classList.contains("display-none") === true
      ? showSubSubmenu(i)
      : hideSubSubmenu(i);
  });
}

//////////////////////////////////////////////////////////////////////////////////////
/////////////   TEASER SMALL   ///////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

class TeaserSmall extends HTMLElement {
  constructor() {
    super();
    this.clickArea = this.querySelector(".click-area");
    this.paddington = this.querySelector(".paddington");
    this.modal = this.querySelector(".teaser-small-modal");
    this.arrow = this.querySelector(".arrow-right");
    this.closeX = this.querySelector(".close-teaser");
    this.h2 = this.querySelector("h2");
    this.small = this.querySelector(".small");
    this.img = this.querySelector(".img");
    this.closeTeaser = this.querySelector(".close-teaser");
    this.h3 = this.querySelector("h3");
    this.links = this.querySelector(".links");
    //
    if (this.classList.contains("background-forest")) {
      this.hovercolor = "forest";
    }
    if (this.classList.contains("background-lila")) {
      this.hovercolor = "lila";
    }
    if (this.classList.contains("background-ocean")) {
      this.hovercolor = "ocean";
    }
    if (this.classList.contains("background-rain")) {
      this.hovercolor = "rain";
    }
    this.clickArea.addEventListener("mouseover", () => {
      this.classList.remove("unbloat");
      this.classList.add("bloat");
      this.arrow.classList.add("anim-arrow-in");
      this.arrow.classList.remove("anim-arrow-out");
      //this.h2.style = "text-decoration: underline";
      // uncomment the below 4 lines to activate mass hovers (in)
      // this.classList.add(`hover-${this.hovercolor}`);
      // this.classList.remove(`mouseout-${this.hovercolor}`);
      // this.h2.classList.add(`hover-white`);
      // this.small.classList.add("hover-white");
    });
    this.clickArea.addEventListener("mouseout", () => {
      this.classList.remove("bloat");
      this.classList.add("unbloat")
      this.arrow.classList.add("anim-arrow-out");
      this.arrow.classList.remove("anim-arrow-in");
      //this.h2.style = "text-decoration: none";
      // uncomment the below 4 lines to activate mass hovers (out)
      // this.classList.add(`mouseout-${this.hovercolor}`);
      // this.classList.remove(`hover-${this.hovercolor}`);
      // this.h2.classList.remove(`hover-white`);
      // this.small.classList.remove("hover-white");
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
      this.img.classList.add("fade-in");
      this.closeTeaser.classList.add("fade-in");
      this.h3.classList.add("roll-up-d012");
      this.links.classList.add("roll-up-d025");

      this.clickArea.classList.add("invisible");
      this.clickArea.classList.remove("visible");
    };
    this.invisibleTeaserModal = function () {
      this.modal.classList.remove("visible");
      this.modal.classList.add("invisible");
      this.img.classList.remove("fade-in");
      this.clickArea.classList.remove("invisible");
      this.clickArea.classList.add("visible");
      this.closeTeaser.classList.remove("fade-in");
      this.h3.classList.remove("roll-up-d012");
      this.links.classList.remove("roll-up-d025");
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
customElements.define("teaser-small", TeaserSmall);



//////////////////////////////////////////////////////////////////////////////////////
/////////////   SWIPER  ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

// const swiper = new Swiper(".swiper-container", {
//   // Optional parameters
//   direction: "horizontal",
//   loop: true,

//   // If we need pagination
//   pagination: {
//     el: ".swiper-pagination",
//     type: "bullets",
//     clickable: "true",
//   },

//   // Navigation arrows
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },

//   // And if we need scrollbar
//   // scrollbar: {
//   //   el: '.swiper-scrollbar',
//   // },
// });
