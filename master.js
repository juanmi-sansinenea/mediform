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
  } else {
    hideMainMenuItems();
    showSubMenu();
    scrollMe.style.height = "auto";
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
customElements.define("teaser-small", TeaserSmall);

//////////////////////////////////////////////////////////////////////////////////////
/////////////   TESTIMONNIAL SLIDER  /////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

class TestimonialSlider extends HTMLElement {
  constructor() {
    super();
    this.slides = this.querySelectorAll(".slide");
    this.prev = this.querySelector(".prev");
    this.next = this.querySelector(".next");

    this.showActiveSlide = (to) => {
      for (let i = 0; i < this.slides.length; i++) {
        this.slides[i].style.display = "none";
      }
      this.slides[this.activeSlide].style.display = "";
      this.slides[
        this.activeSlide
      ].style.animation = `slide-in-${to} ease 0.75s`;
      this.slides[this.activeSlide].addEventListener("animationend", () => {
        console.log("animation ended");
      });
    };
    this.prev.addEventListener("click", () => {
      this.activeSlide > 0
        ? this.activeSlide--
        : (this.activeSlide = this.slides.length - 1);
      this.showActiveSlide("prev");
    });
    this.next.addEventListener("click", () => {
      this.activeSlide < this.slides.length - 1
        ? this.activeSlide++
        : (this.activeSlide = 0);
      this.showActiveSlide("next");
    });
  }
  connectedCallback() {
    this.activeSlide = 0;
    this.showActiveSlide();
  }
}
customElements.define("testimonial-slider", TestimonialSlider);

//////////////////////////////////////////////////////////////////////////////////////
/////////////   TEASER-BIG & SLIDER-BIG   ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

// The below class applies to both the Teaser Big Slider and the Slider Big modules
class TeaserBigSlider extends HTMLElement {
  constructor() {
    super();
    this.slides = this.querySelectorAll(".slide");
    this.btns = this.querySelectorAll(".btn");

    this.updateSelector = (which) => {
      for (let j = 0; j < this.btns.length; j++) {
        this.btns[j].style.height = "1px";
      }
      which.style.height = "3px";
    };

    for (let i = 0; i < this.btns.length; i++) {
      this.btns[i].addEventListener("click", (evt) => {
        this.updateSelector(evt.target);
        this.activeSlide = i;
        this.showActiveSlide(i);
      });

      this.slides[i].addEventListener(
        "touchstart",
        (evt) => {
          this.startX = evt.targetTouches[0].clientX;
        },
        true
      );
      this.slides[i].addEventListener(
        "touchmove",
        (evt) => {
          this.difference = evt.targetTouches[0].clientX - this.startX;
          this.slides[i].style.marginLeft = `${this.difference}px`;
        },
        true
      );
      this.slides[i].addEventListener(
        "touchend",
        () => {
          this.resetXPosition(this.activeSlide); /////////////<<<<<<<<<----- needs definition
          if (this.difference > 100) {
            this.updateActiveSlide(-1);
            this.updateSelector(this.btns[this.activeSlide]);
          } else if (this.difference < -100) {
            this.updateActiveSlide(+1);
            this.updateSelector(this.btns[this.activeSlide]);
          } else {
            this.slides[i].style.marginLeft = `${0}px`;
          }
        },
        true
      );
    }
    this.resetXPosition = (which) => {
      this.slides[which].style.marginLeft = 0;
    }
    this.updateActiveSlide = (add) => {
      if (add === -1) {
        this.activeSlide > 0
          ? this.activeSlide--
          : (this.activeSlide = this.slides.length - 1);
      }
      if (add === +1) {
        this.activeSlide < this.slides.length - 1
          ? this.activeSlide++
          : (this.activeSlide = 0);
      }
      this.showActiveSlide();
    };
    this.showActiveSlide = () => {
      for (let i = 0; i < this.slides.length; i++) {
        this.slides[i].style.display = "none";
      }
      this.slides[this.activeSlide].style.display = "";
      this.slides[this.activeSlide].style.animation = "fade-in ease 0.75s";
    };
  }
  connectedCallback() {
    this.activeSlide = 0;
    this.showActiveSlide();
    this.btns[this.activeSlide].style.height = "3px";
  }
}
customElements.define("teaser-big-slider", TeaserBigSlider);
