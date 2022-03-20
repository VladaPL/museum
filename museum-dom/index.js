/* PROGRESS-LINE START */
const progress1 = document.querySelector(".progress1");

progress1.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`;
});

const progress2 = document.querySelector(".progress2");

progress2.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`;
});

/* BURGER-MENU START */

/*let menuButton = document.querySelector(".burger-menu-btn");
let menu = document.querySelector(".burger-menu");

menuButton.addEventListener("click", function () {
  menuButton.classList.toggle("active");
  menu.classList.toggle("active");
});

let links = document.querySelectorAll('a[href*="#"]');

for (let link of links) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const blockId = link.getAttribute("href");
    document.querySelector("" + blockId).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}*/

/* BURGER-MENU END */

/* SLIDER-WELCOME START */

let items = document.querySelectorAll(".carousel-item");
let currentItem = 0; /* индекс элемента */
let isEnabled = true;

function changeCurrentItem(n) {
  /* n - новое значение */
  currentItem =
    (n + items.length) % items.length; /* для возврата к первому элементу */
}

function maskItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener("animationend", function () {
    this.classList.remove("carousel-active", direction);
  });
}

function displayItem(direction) {
  items[currentItem].classList.add("carousel-next", direction);
  items[currentItem].addEventListener("animationend", function () {
    this.classList.remove("carousel-next", direction);
    this.classList.add("carousel-active");
    isEnabled = true;
  });
}

function previousItem(n) {
  maskItem("to-right");
  changeCurrentItem(n - 1);
  displayItem("from-left");
}

function nextItem(n) {
  maskItem("to-left");
  changeCurrentItem(n + 1);
  displayItem("from-right");
}

document
  .querySelector(".slider__button-arrow-left")
  .addEventListener("click", function () {
    if (isEnabled) {
      previousItem(currentItem);
    }
  });

document
  .querySelector(".slider__button-arrow-right")
  .addEventListener("click", function () {
    if (isEnabled) {
      nextItem(currentItem);
    }
  });

/* SWIPE */

const swipedetect = (el) => {
  let surface = el;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;

  let startTime = 0;
  let elapsedTime = 0; /* пройденное время */

  let threshold = 150; /* пороговое */
  let restraint = 100; /* ограничение */
  let allowedTime = 300; /* разрешенное */

  surface.addEventListener("mousedown", function (e) {
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    e.preventDefault(); /* останавливает другие взаимодействия */
  });

  surface.addEventListener("mouseup", function (e) {
    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if (distX > 0) {
          if (isEnabled) {
            previousItem(currentItem);
          } else {
            if (isEnabled) {
              nextItem(currentItem);
            }
          }
        }
      }
    }
    e.preventDefault();
  });
};

let el = document.querySelector(".carousel");
swipedetect(el);

/* SLIDER-WELCOME END */

/* SLIDER EXPLORE START */

function initComparisons() {
  var x, i;
  /*find all elements with an "overlay" class:*/
  x = document.getElementsByClassName("img-comp-overlay");
  for (i = 0; i < x.length; i++) {
    /*once for each "overlay" element:
    pass the "overlay" element as a parameter when executing the compareImages function:*/
    compareImages(x[i]);
  }
  function compareImages(img) {
    var slider,
      img,
      clicked = 0,
      w,
      h;
    /*get the width and height of the img element*/
    w = img.offsetWidth;
    h = img.offsetHeight;
    /*set the width of the img element to 50%:*/
    img.style.width = w / 2 + "px";
    /*create slider:*/
    slider = document.createElement("DIV");
    slider.setAttribute("class", "img-comp-slider");
    /*insert slider*/
    img.parentElement.insertBefore(slider, img);
    /*position the slider in the middle:*/
    slider.style.top = h / 2 - slider.offsetHeight / 2 + "px";
    slider.style.left = w / 2 - slider.offsetWidth / 2 + "px";
    /*execute a function when the mouse button is pressed:*/
    slider.addEventListener("mousedown", slideReady);
    /*and another function when the mouse button is released:*/
    window.addEventListener("mouseup", slideFinish);
    /*or touched (for touch screens:*/
    slider.addEventListener("touchstart", slideReady);
    /*and released (for touch screens:*/
    window.addEventListener("touchstop", slideFinish);
    function slideReady(e) {
      /*prevent any other actions that may occur when moving over the image:*/
      e.preventDefault();
      /*the slider is now clicked and ready to move:*/
      clicked = 1;
      /*execute a function when the slider is moved:*/
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }
    function slideFinish() {
      /*the slider is no longer clicked:*/
      clicked = 0;
    }
    function slideMove(e) {
      var pos;
      /*if the slider is no longer clicked, exit this function:*/
      if (clicked == 0) return false;
      /*get the cursor's x position:*/
      pos = getCursorPos(e);
      /*prevent the slider from being positioned outside the image:*/
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      /*execute a function that will resize the overlay image according to the cursor:*/
      slide(pos);
    }
    function getCursorPos(e) {
      var a,
        x = 0;
      e = e || window.event;
      /*get the x positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x coordinate, relative to the image:*/
      x = e.pageX - a.left;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      return x;
    }
    function slide(x) {
      /*resize the image:*/
      img.style.width = x + "px";
      /*position the slider:*/
      slider.style.left = img.offsetWidth - slider.offsetWidth / 2 + "px";
    }
  }
}

initComparisons();

/* SLIDER EXPLORE END */

/* MAP START*/

mapboxgl.accessToken =
  "pk.eyJ1IjoidmxhZGFwbCIsImEiOiJja3VuN2Q5YzYwMjE1MndtZDAyZzJseHY5In0.THOZF_qiQ38GyZCEZUizsQ";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/light-v10", // style URL
  center: [2.3364, 48.86091], // starting position [lng, lat]
  zoom: 16, // starting zoom
});

// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker({ color: "black" })
  .setLngLat([2.3364, 48.86091])
  .addTo(map);

// Create a default Marker, colored black, rotated 45 degrees.
const marker2 = new mapboxgl.Marker({ color: "grey" })
  .setLngLat([2.3333, 48.8602])
  .addTo(map);

const marker3 = new mapboxgl.Marker({ color: "grey" })
  .setLngLat([2.3397, 48.8607])
  .addTo(map);

const marker4 = new mapboxgl.Marker({ color: "grey" })
  .setLngLat([2.333, 48.8619])
  .addTo(map);

const marker5 = new mapboxgl.Marker({ color: "grey" })
  .setLngLat([2.3365, 48.8625])
  .addTo(map);

  map.addControl(new mapboxgl.NavigationControl());

/* MAP END */

console.log(
  "Самооценка – 40 / 150 баллов\nВыполненные пункты:\nСекция Welcome\nСекция Explore\nСекция Contacts\nОстальные секции не выполнены."
);
