const center = [55.689040, 37.624534];
function init() {
  const YMAP = new ymaps.Map('map', {
    center: center,
    zoom: 16
  });

  const placemark = new ymaps.Placemark(center, {
    balloonContent: `
      <div class="balloon">
        <div class="balloon_address">117105 г. Москва , Варшавское ш. 37а офис 618</div>
      </div>
    `
  }, {
    iconLayout: "default#image",
    iconImageHref: "img/icon/marcetplace.svg",
    iconImageSize: [54, 54],
    iconImageOffset: [-27, 20]
  })

  const placemark1 = new ymaps.Placemark(center, {}, {
    iconLayout: "default#image",
    
    iconImageHref: "img/icon/marcetplace.svg",
    iconImageSize: [54, 54],
    iconImageOffset: [-27, 20]
  })

  YMAP.controls.remove('geolocationControl'); // удаляем геолокацию
  YMAP.controls.remove('searchControl'); // удаляем поиск
  YMAP.controls.remove('trafficControl'); // удаляем контроль трафика
  YMAP.controls.remove('typeSelector'); // удаляем тип
  YMAP.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
  YMAP.controls.remove('zoomControl'); // удаляем контрол зуммирования
  YMAP.controls.remove('rulerControl'); // удаляем контрол правил


  YMAP.geoObjects.add(placemark1);
  YMAP.geoObjects.add(placemark);
  placemark.balloon.open();
};
ymaps.ready(init);


const container = document.querySelector(".container");
const styleContainer = window.getComputedStyle(container);
const marleft = parseInt(styleContainer.getPropertyValue('margin-left'));
const slider = document.querySelector('.swiper-container');
let swiper = new Swiper(slider, {
  slidesOffsetBefore: marleft + 15,
  slidesOffsetAfter: marleft + 15,
  slidesPerView: 'auto',
  spaceBetween: 20,
  slidesPerGroup: 1,

  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  navigation: {
    nextEl: '.BTN2',
    prevEl: '.BTN1',
  },
  breakpoints: {
    518: {
    }
  },
});


const plusButton = document.querySelectorAll(".Questions__item_button");
const upLine = document.querySelectorAll(".Questions__item_upLine");
const questionItem = document.querySelectorAll(".Questions__item_parag");

upLine.forEach((el) => {
  el.addEventListener('click', function(){
    let content = el.nextElementSibling;
    let btnActive = el.querySelector(".Questions__item_button");
    if(content.style.maxHeight){
      questionItem.forEach((el) => el.style.maxHeight = null);
      plusButton.forEach((item) => item.classList.remove("Bactive"));
    }else{
      questionItem.forEach((el) => el.style.maxHeight = null);
      plusButton.forEach((item) => item.classList.remove("Bactive"));
      content.style.maxHeight = content.scrollHeight + "px"; // Развернуть выбранное содержимое
      btnActive.classList.add("Bactive");
    }
  });
});



const burg = document.querySelector(".burger");
const navi = document.querySelector(".nav");
const BuyCall = document.querySelector(".BuyCall");
const fon = document.querySelector(".fon");
const openburg = document.querySelector(".openburg");
const closeburg = document.querySelector(".closeburg");
burg.addEventListener('click', function () {
  if (navi.classList.contains('naviOpen')) {
navi.classList.remove('naviOpen'),
navi.style.transform = "translateX(270px)",
fon.style.display = "none",
closeburg.style.display = "none",
openburg.style.display = "block"
  } else {
    navi.classList.add('naviOpen'),
    navi.style.transform = "translateX(0)",
    fon.style.display = "block",
    closeburg.style.display = "block",
openburg.style.display = "none"
  }
});
fon.addEventListener('click', function () {
  navi.classList.remove('naviOpen'),
  navi.style.transform = "translateX(270px)",
  fon.style.display = "none",
  closeburg.style.display = "none",
  openburg.style.display = "block"
});

var selector = document.getElementById("telephone");
var im = new Inputmask("+7 (999)-99-99");
im.mask(selector);



