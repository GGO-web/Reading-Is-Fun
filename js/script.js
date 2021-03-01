const quantities = document.querySelectorAll(".quantity");
quantities.forEach(quantity => {
   const minusButton = quantity.querySelector(".quantity-minus");
   const plusButton = quantity.querySelector(".quantity-plus");
   const quantityInput = quantity.querySelector(".quantity-counter");
   let minusInterval, plusInterval;
   const startEvents = ["mousedown", "touchstart"];
   const endEvents = ["mouseup", "touchend"];
   minusButton.addEventListener("click", () => {
      const currQuantity = parseInt(quantityInput.value);
      clearInterval(minusInterval);
      if (currQuantity > +quantityInput.min) 
         quantityInput.value = String(currQuantity - 1);
      cartPricesRefresh();
   });
   startEvents.forEach(event => {
      minusButton.addEventListener(event, () => {
         minusInterval = setInterval(() => {
            const currQuantity = parseInt(quantityInput.value);
            if (currQuantity > +quantityInput.min) quantityInput.value = String(currQuantity - 1);
            cartPricesRefresh();
         }, 200);
      });
   });
   endEvents.forEach(event => {
      minusButton.addEventListener(event, () => {
         clearInterval(minusInterval);
         cartPricesRefresh();
      });
   });

   plusButton.addEventListener("click", () => {
      const currQuantity = parseInt(quantityInput.value);
      if (currQuantity < +quantityInput.max)
         quantityInput.value = String(currQuantity + 1);
      cartPricesRefresh();
   });
   startEvents.forEach(event => {
      plusButton.addEventListener(event, () => {
         plusInterval = setInterval(() => {
            const currQuantity = parseInt(quantityInput.value);
            if (currQuantity < +quantityInput.max) quantityInput.value = String(currQuantity + 1);
            cartPricesRefresh();
         }, 200);
      });
   });
   endEvents.forEach(event => {
      plusButton.addEventListener(event, () => {
         clearInterval(plusInterval);
         cartPricesRefresh();
      });
   });
});
const books = document.querySelectorAll('.book');
books.forEach(function(book) {
   const bookCategoryLinks = book.querySelectorAll('.book__category-link');
   const bookPrice = book.querySelector('.book__price');
   bookCategoryLinks.forEach((bookCategoryLink) => {
      const linkText = bookCategoryLink.textContent.toLowerCase().trimStart().trimEnd();
      if (linkText == "скидки") {
         bookPrice.classList.add("discount");
      }
   });
});
let totalPrice = 0,
   deliveryPrice = 0,
   booksPrice = 0,
   discountPrice = 0;
function calculateDeliveryPrice() {
   deliveryPrice = 0;
   const customRadios = document.querySelectorAll(".custom-radio");
   if (customRadios) {
      customRadios.forEach((radio) => {
         if (radio.checked) {
            const cartDeliveryPrice = radio.parentNode.querySelector(".cart__delivery-price");
            if (cartDeliveryPrice) {
               const price = parseInt(cartDeliveryPrice.textContent);
               deliveryPrice = price ? price : 0;
            }
         }
      });
   }
}

const setBooksPrice = () => {
   const cartBooksPrice = document.getElementById("cart-books-price");
   if (cartBooksPrice) 
      cartBooksPrice.textContent = String(booksPrice);
};
const setDeliveryPrice = () => {
   const cartDeliveryPrice = document.getElementById("cart-delivery-price");
   if (cartDeliveryPrice) 
      cartDeliveryPrice.textContent = String(deliveryPrice);
};
const setDiscountPrice = () => {
   const cartDiscountPrice = document.getElementById("cart-discount-price");
   if (cartDiscountPrice) {
      if (discountPrice == 0) {
         cartDiscountPrice.textContent = "0";
      } else cartDiscountPrice.textContent = "-" + String(discountPrice);
   }
};
const setTotalPrice = () => {
   const cartTotalPrice = document.getElementById("cart-total-price");
   if (cartTotalPrice) 
      cartTotalPrice.textContent = String(totalPrice);
};

function calculateAnotherPrices() {
   booksPrice = discountPrice = 0;
   // calculate book price + discount
   const cartItems = document.querySelectorAll(".cart__item");
   if (cartItems) {
      cartItems.forEach((item) => {
         const bookPrice = item.querySelector(".book__price");
         const bookCount = parseInt(item.querySelector(".cart__price-counter").value);
         const price = parseInt(bookPrice.textContent);
         const oldPrice = parseInt(bookPrice.dataset.oldPrice);
         if (price) booksPrice += bookCount * price;
         if (oldPrice) {
            discountPrice += bookCount * (oldPrice - price);
         }
      });
   }
   totalPrice = deliveryPrice + booksPrice;
};

function cartPricesRefresh() {
   calculateDeliveryPrice();
   calculateAnotherPrices();
   setBooksPrice(), setDeliveryPrice(), 
   setDiscountPrice(), setTotalPrice();
   if (totalPrice == 0) {
      const cartOrderButton = document.querySelector(".cart__sidebar-checkout-order");
      if (cartOrderButton) cartOrderButton.setAttribute("disabled", "");
   }
}
cartPricesRefresh();

const customRadios = document.querySelectorAll(".custom-radio");
if (customRadios) {
   customRadios.forEach((radio) => {
      radio.addEventListener("change", function (event) {
         cartPricesRefresh();
      });
   });
}

// const cartItemQuantities = document.querySelectorAll(".cart__item-quantity");
// cartItemQuantities.forEach(item => {
//    const btnPlus = item.querySelector(".cart__quantity-plus");
//    const btnMinus = item.querySelector(".cart__quantity-minus");
//    btnPlus.addEventListener("click", cartPricesRefresh());
//    btnMinus.addEventListener("click", cartPricesRefresh());
// });
// const customRadios = document.querySelectorAll(".custom-radio");
const customRadioLabels = document.querySelectorAll(".custom-radio-label");
if (customRadios && customRadioLabels) {
   for (let i = 0; i < customRadios.length; ++i) {
      customRadios[i].id = `custom-radio-${i + 1}`;
      customRadioLabels[i].setAttribute("for", `custom-radio-${i + 1}`);
   }
}
let cartItemQuantity = 3;
// if (localStorage.getItem("cart-item-quantity"))
//    cartItemQuantity = parseInt(localStorage.getItem("cart-item-quantity"));

// const storeItemCount = () => {
//    localStorage.setItem("cart-item-quantity", String(cartItemQuantity));
// };
// storeItemCount();

const increaseToCartQuantity = () => {
   const toCartQuantity = document.querySelector(".to-cart__quantity");
   const cartItemCount = document.getElementById("cart__item-count");
   cartItemQuantity++;
   // storeItemCount();
   if (cartItemCount) cartItemCount.textContent = cartItemQuantity;
   if (toCartQuantity) toCartQuantity.textContent = String(cartItemQuantity);
};

const decreaseToCartQuantity = () => {
   const toCartQuantity = document.querySelector(".to-cart__quantity");
   const cartItemCount = document.getElementById("cart__item-count");
   cartItemQuantity--;
   // storeItemCount();
   if (cartItemCount) cartItemCount.textContent = cartItemQuantity;
   if (toCartQuantity) toCartQuantity.textContent = String(cartItemQuantity);
};

const wishButtons = document.querySelectorAll(".wish-button");
wishButtons.forEach((wishButton) =>
   wishButton.addEventListener("click", function() {
      wishButton.classList.toggle("favorite");
      // store to wishArray and to localStorage
   })
);
const bookButtons = document.querySelectorAll(".book__button");
bookButtons.forEach(bookButton => {
   bookButton.addEventListener("click", function(event) {
      this.classList.toggle("disabled");

      const book = this.closest(".book");
      book.classList.toggle("booked");
      increaseToCartQuantity();
      // store to-cart value to localstorage
   })
});
const catalogBurger = document.querySelector(".catalog__burger");
if (catalogBurger) {
   const catalogContent = document.querySelector(".catalog__content");
   catalogBurger.addEventListener("click", () => {
      catalogBurger.classList.toggle("active");
      catalogContent.classList.toggle("active");
      if (catalogContent.style.maxHeight) {
         catalogContent.style.maxHeight = null;
      } else {
         catalogContent.style.maxHeight = catalogContent.scrollHeight + "px";
      }
   });
}
const catalogContentTags = document.querySelectorAll(".catalog__content-tag");
catalogContentTags.forEach((catalogContentTag, index) => {
   catalogContentTag.dataset.index = index;
});

const catalogCategories = document.querySelectorAll(".catalog__content-categories");

catalogContentTags.forEach((catalogContentTag) => {
   const eventsList = ["mouseover", "click", "keydown"];
   for (iteration of eventsList)
      catalogContentTag.addEventListener(iteration, function (event) {
         for (let catalogTag of catalogContentTags) {
            catalogTag.classList.remove("current");
         }

         for (let catalogCat of catalogCategories) {
            catalogCat.classList.remove("current");
         }
         const catalogCat = catalogCategories[this.dataset.index];
         catalogCat.classList.add("current");
         this.classList.add("current");
      });
});

const cleanAllButton = document.getElementById("cart__clean-all");
if (cleanAllButton) {
   cleanAllButton.addEventListener("click", function() {
      const cartItems = document.querySelectorAll(".cart__item");
      cartItems.forEach(item => {
         if (item) {
            item.remove();
            decreaseToCartQuantity();
         }
      });
      cartPricesRefresh();
   });
}

const cleanButtons = document.querySelectorAll(".cart__clean");
if (cleanButtons) {
   cleanButtons.forEach((cleanButton) => {
      cleanButton.addEventListener("click", function () {
         const parent = this.closest(".cart__item");
         if (parent) {
            decreaseToCartQuantity();
            parent.remove();
            cartPricesRefresh();
         }
      });
   });  
}
const coll = document.querySelectorAll(".collapsible");

for (let i = 0; i < coll.length; i++) {
   if (coll[i]) {
      coll[i].addEventListener("click", function () {
         this.classList.toggle("active");
         const content = this.nextElementSibling;
         content.classList.toggle("active");
         if (content.style.maxHeight) {
            content.style.maxHeight = null;
         } else {
            content.style.maxHeight = content.scrollHeight + "px";
         }
      });
   }
}

// there is multiple gallery
const galleries = document.querySelectorAll(".gallery");
galleries.forEach((gallery) => {
   const galleryImages = gallery.querySelectorAll(".gallery__thumbnails-img");
   const galleryPreviewImage = gallery.querySelector(".gallery__preview-img");
   galleryImages.forEach((galleryImage) => {
      galleryImage.addEventListener("mouseover", function (event) {
         for (let currImg of galleryImages) {
            currImg.parentNode.classList.remove("current");
         }
         this.parentNode.classList.add("current");
         const galleryImagePath = this.getAttribute("src");
         galleryPreviewImage.setAttribute("src", galleryImagePath);
      });
   });
});

const body = document.querySelector("body");
const headerTopBurger = document.querySelector(".header-top__burger");
const headerTop = document.querySelector(".header-top");
const headerTopNav = document.querySelector(".header-top__nav");
const headerTopList = document.querySelector(".header-top__list");
headerTopBurger.addEventListener('click', function() {
   const showMenu = function() {
      body.classList.add("body-lock");
      headerTopBurger.classList.add("active");
      headerTop.classList.add("active");
      headerTopNav.classList.add("active");
      headerTopList.classList.add("active");
   };
   const hideMenu = function () {
      body.classList.remove("body-lock");
      headerTopBurger.classList.remove("active");
      headerTop.classList.remove("active");
      headerTopNav.classList.remove("active");
      headerTopList.classList.remove("active");
   };

   if (this.classList.contains("active"))
      hideMenu();
   else showMenu();

   if (headerTop.classList.contains("active")) {
      document.addEventListener("click", function(event) {
         const target = event.target;
         if (target.classList.contains("header-top")) {
            hideMenu();
         }
      });
   }
});

const catalogContentCategories = document.querySelectorAll(".catalog__content-categories");
catalogContentCategories.forEach((cat, index) => {
   cat.dataset.index = index;
});

for (let index = 0; index < catalogContentCategories.length; index++) {
   const selector = `.catalog__content-categories[data-index="${index}"]`;
   Macy({
      container: selector,
      trueOrder: false,
      margin: 40,
      columns: 3,
      breakAt: {
         1180: {
            columns: 2,
         },
         1024: {
            columns: 1,
         },
         768: {
            columns: 2,
         },
         576: {
            columns: 1,
         },
      },
   });
}
      

// ==> pagination for multiple sliders <==
const booksSliderButtonsNext = document.querySelectorAll(".books__slider-button-next");
booksSliderButtonsNext.forEach(function (booksSliderButtonNext, index) {
   booksSliderButtonNext.classList.add(`books__slider-button-next--${index}`);
});
const booksSliderButtonsPrev = document.querySelectorAll(".books__slider-button-prev");
booksSliderButtonsPrev.forEach(function (booksSliderButtonPrev, index) {
   booksSliderButtonPrev.classList.add(`books__slider-button-prev--${index}`);
});
// ==!> pagination for multiple sliders <!==

const booksSliders = document.querySelectorAll(".books__slider-container");
booksSliders.forEach(function(booksSlider, index) {
   booksSlider.classList.add(`books__slider-container--${index}`);
   new Swiper(`.books__slider-container--${index}`, {
      // Optional parameters
      loop: false,
      speed: 500,
      spaceBetween: 40,
      slidesPerView: 5,
      allowTouchMove: false,
      wrapperClass: "books__slider-wrapper",
      slideClass: "book",
      slideActiveClass: "book--active",
      slideNextClass: "book-next",
      slidePrevClass: "book-prev",
      slideVisibleClass: "book--visible",

      breakpoints: {
         1369: {
            slidesPerView: 5,
            spaceBetween: 40,
         },
         1025: {
            slidesPerView: 4,
            spaceBetween: 30,
         },
         769: {
            slidesPerView: 3,
            spaceBetween: 20,
         },
         481: {
            slidesPerView: 2,
            spaceBetween: 20,
         },
         0: {
            slidesPerView: 1,
            spaceBetween: 20,
         },
      },

      // Navigation arrows
      navigation: {
         nextEl: `.books__slider-button-next--${index}`,
         prevEl: `.books__slider-button-prev--${index}`,
         disabledClass: "slider-button-disabled",
      },
   });
});


const rangeSlider = document.querySelector(".sidebar-filter__slider");
if (rangeSlider) {
   noUiSlider.create(rangeSlider, {
      start: [200, 950],
      range: {
         min: [0],
         max: [2000],
      },
      connect: true,
   });

   const inputAll = document.querySelectorAll(".sidebar-filter__range-control");
   const inputs = [inputAll[0], inputAll[1]];

   rangeSlider.noUiSlider.on("update", function (values, handle) {
      inputs[handle].value = Math.round(values[handle]);
   });

   const setRangeSlider = (i, value) => {
      let arr = [null, null];
      arr[i] = value;
      rangeSlider.noUiSlider.set(arr);
   };

   inputs.forEach((el, index) => {
      el.addEventListener("change", (e) => {
         setRangeSlider(index, e.currentTarget.value);
      });
   });
}

const sellsSlider = new Swiper(".sells__slider-container", {
   // Optional parameters
   loop: true,
   speed: 500,
   autoplay: true,
   autoplay: {
      delay: 6000,
   },
   slidesPerView: 1,
   allowTouchMove: true,
   wrapperClass: "sells__slider-wrapper",
   slideClass: "sells__slider-item",
   slideActiveClass: "sells__slider-item--active",
   slideNextClass: "sells__slider-item-next",
   slidePrevClass: "sells__slider-item-prev",
   slideVisibleClass: "sells__slider-item--visible",

   breakpoints: {
      1025: {
         allowTouchMove: false,
      },
   },

   // Pagination
   pagination: {
      el: ".sells__slider-pagination",
      type: "bullets",
      bulletClass: "sells__slider-bullet",
      bulletActiveClass: "sells__slider-bullet--active",
      clickable: true,
   },

   // Navigation arrows
   navigation: {
      nextEl: ".sells__slider-button-next",
      prevEl: ".sells__slider-button-prev",
      disabledClass: "slider-button-disabled",
   },
});

const sellsSliderSelector = document.querySelector(".sells__slider-container");
if (sellsSliderSelector) {
   sellsSliderSelector.addEventListener("mouseover", () => {
      sellsSlider.autoplay.stop();
   });
   sellsSliderSelector.addEventListener("mouseleave", () => {
      sellsSlider.autoplay.start();
   });
}

'use strict';

/* 
  Code 
*/


//# sourceMappingURL=script.js.map
