function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});
// Burger
const header__burger = document.querySelector('.nav__burger');
const header__menu = document.querySelector('.nav__menu');
const body = document.querySelector('body');
const header__list = document.querySelector('.nav__list');

header__burger.onclick = function (e) {
	header__burger.classList.toggle('active');
	header__menu.classList.toggle('active');
	body.classList.toggle('lock');
}

const isiPhone = (navigator.userAgent.match(/iPhone/i) != null);
const isiPad = (navigator.userAgent.match(/iPad/i) != null);
const isiPod = (navigator.userAgent.match(/iPod/i) != null);

if (isiPhone || isiPad || isiPod) {
	let linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
		V = 0.2;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
	for (let i = 0; i < linkNav.length; i++) {
		linkNav[i].addEventListener('click', function (e) { //по клику на ссылку
			e.preventDefault(); //отменяем стандартное поведение
			let w = window.pageYOffset,  // производим прокрутка прокрутка
				hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
			t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
				start = null;
			requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
			function step(time) {
				if (start === null) start = time;
				let progress = time - start,
					r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
				window.scrollTo(0, r);
				if (r != w + t) {
					requestAnimationFrame(step)
				} else {
					location.hash = hash  // URL с хэшем
				}
			}
		}, false);
	}
}

// scroll nav
const nav = document.querySelector(".nav");
let prevScrollpos = window.pageYOffset;

function navOpen() {
	if (prevScrollpos != 0) {
		nav.classList.add('_active');
	} else {
		nav.classList.remove('_active');
	}
}

function navScroll() {
	window.onscroll = function () {
		let currentScrollPos = window.pageYOffset;
		if (prevScrollpos < currentScrollPos) {
			nav.classList.add('_active');
		} else if (prevScrollpos = currentScrollPos) {
			nav.classList.add('_active');
		} else {
			nav.classList.remove('_active');
		}
		prevScrollpos = currentScrollPos;
	}
}
navOpen()
navScroll()
// read more btn
const dots = document.querySelector('.promo__dots');
const moreText = document.querySelector('.promo__more');
const btnText = document.querySelector('.promo__link');
btnText.addEventListener('click', () => {
	if (dots.style.display === "none") {
		dots.style.display = "inline";
		btnText.innerHTML = "Read more";
		moreText.style.display = "none";
	} else {
		dots.style.display = "none";
		btnText.innerHTML = "Read less";
		moreText.style.display = "inline";
	}
})

// progress

let progressRadialWrap = document.querySelector(".progress");
let progressRadial = document.querySelector(".progress__wrapper");

function isElementOutViewport(el) {
	let rect = el.getBoundingClientRect();
	return rect.bottom < 0 || rect.right < 0 || rect.left > window.innerWidth || rect.top > window.innerHeight;
}
const circleCount = document.querySelectorAll('.progress__inside-circle');

if (isElementOutViewport(progressRadialWrap) == false) {
	progressRadial.style.display = 'flex';
	animCount(circleCount)
}
window.addEventListener('scroll', function scrolling() {
	if (isElementOutViewport(progressRadialWrap) == false) {
		progressRadial.style.display = 'flex';
		this.removeEventListener('scroll', scrolling);
		animCount(circleCount)
	} else {
		isElementOutViewport(progressRadialWrap)
	}
})
function animCount(countItem) {
	const speed = 120; // The lower the slower
	countItem.forEach(counter => {
		const updateCount = () => {
			const target = +counter.getAttribute('data-max');
			const count = +counter.innerText;
			// Lower inc to slow and higher to slow
			const inc = Math.round(target / speed);
			// Check if target is reached
			if (count < target) {
				// Add inc to count and output in counter
				counter.innerText = count + inc;
				// Call function every ms
				setTimeout(updateCount, 30);
			} else {
				counter.innerText = target + '%';
			}
		};
		updateCount();
	});
	console.log('Animation is Started')
}
// Portfolio Filter
filterSelection("all")
function filterSelection(c) {
	let x, i;
	x = document.getElementsByClassName("filter__block");
	if (c == "all") c = "";
	// Добавить класс "show" (display:block) к отфильтрованным элементам и удалите класс "show" из элементов, которые не выбраны
	for (i = 0; i < x.length; i++) {
		w3RemoveClass(x[i], "show");
		if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
	}
}

// Показать отфильтрованные элементы
function w3AddClass(element, name) {
	let i, arr1, arr2;
	arr1 = element.className.split(" ");
	arr2 = name.split(" ");
	for (i = 0; i < arr2.length; i++) {
		if (arr1.indexOf(arr2[i]) == -1) {
			element.className += " " + arr2[i];
		}
	}
}

// Скрыть элементы, которые не выбраны
function w3RemoveClass(element, name) {
	let i, arr1, arr2;
	arr1 = element.className.split(" ");
	arr2 = name.split(" ");
	for (i = 0; i < arr2.length; i++) {
		while (arr1.indexOf(arr2[i]) > -1) {
			arr1.splice(arr1.indexOf(arr2[i]), 1);
		}
	}
	element.className = arr1.join(" ");
}

// Добавить активный класс к текущей кнопке управления (выделите ее)
let btnContainer = document.getElementById("filter__buttons");
let btns = btnContainer.getElementsByClassName("filter__button");
for (let i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", function () {
		let current = document.getElementsByClassName("active");
		current[0].className = current[0].className.replace(" active", "");
		this.className += " active";
	});
}

// Snackbar

const copyButtons = document.querySelectorAll('.f-block__copy-btn');
let snackbar = document.querySelector('.snackbar')

copyButtons.forEach(function (item) {
	item.addEventListener('click', function (event) {
		let copytext = document.createElement('input')
		copytext.value = item.dataset.link
		document.body.appendChild(copytext)
		copytext.select()
		document.execCommand('copy')
		document.body.removeChild(copytext)
		snackbar.classList.add('show-snackbar')
		setTimeout(function () { snackbar.classList.remove('show-snackbar') }, 3000);
	})
})

//
let portfolioLinks = document.querySelectorAll(".f-block__image-link");
let iconLink = document.querySelectorAll(".f-block__icon-link");

iconLink.forEach((elem) => {
	elem.addEventListener("click", () => {
		elem.classList.toggle('active');
	})
})
portfolioLinks.forEach((item) => {
	item.addEventListener('focus', () => {
		item.parentNode.classList.add("active")
	})
	iconLink.forEach((element) => {
		element.addEventListener('blur', () => {
			item.parentNode.classList.remove("active")
		})
	})
})


// Swiper
// Slider Team
let swiperTeam = new Swiper('.team-swiper__container', {
	loop: true,
	centeredSlides: true,
	pagination: {
		el: '.team-swiper__pagination',
		clickable: true,
	},
	watchSlidesVisibility: true,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false,
	},
	on: {
		init() {
			Array.from(this.slides).forEach((swiperSlide, i) => {
				const slide = swiperSlide.querySelector('.swiper-slide__wrapper');
				if (!swiperSlide.classList.contains('swiper-slide-visible')) {
					slide.style.display = 'none';
				}
			});
		},
		setTranslate() {
			Array.from(this.slides).forEach((slide,) => {
				if (slide.classList.contains('swiper-slide-visible')) {
					slide.querySelector('.swiper-slide__wrapper').style.display = '';
				}
			});
		},
		transitionEnd() {
			Array.from(this.slides).forEach((slide) => {
				if (!slide.classList.contains('swiper-slide-visible')) {
					slide.querySelector('.swiper-slide__wrapper').style.display = 'none';
				}
			});
		},
	},
});

// Slider hover
document.querySelector('.team-swiper__container').addEventListener('mouseenter', () => {
	swiperTeam.autoplay.stop()
});
document.querySelector('.team-swiper__container').addEventListener('mouseleave', () => {
	swiperTeam.autoplay.start()
});


// Slider Testimonials
let swiperTestimonials = new Swiper('.slider-tst__container', {
	loop: true,
	centeredSlides: true,
	pagination: {
		el: '.slider-tst__pagination',
		clickable: true,
	},
	watchSlidesVisibility: true,
	on: {
		init() {
			Array.from(this.slides).forEach((swiperSlide, i) => {
				const slide = swiperSlide.querySelector('.swiper-slide__wrapper');
				if (!swiperSlide.classList.contains('swiper-slide-visible')) {
					slide.style.display = 'none';
				}
			});
		},
		setTranslate() {
			Array.from(this.slides).forEach((slide,) => {
				if (slide.classList.contains('swiper-slide-visible')) {
					slide.querySelector('.swiper-slide__wrapper').style.display = '';
				}
			});
		},
		transitionEnd() {
			Array.from(this.slides).forEach((slide) => {
				if (!slide.classList.contains('swiper-slide-visible')) {
					slide.querySelector('.swiper-slide__wrapper').style.display = 'none';
				}
			});
		},
	},
});

// Slider News 
let swiperNews = new Swiper('.news-slider ', {
	pagination: {
		el: '.news-slider__pagination',
		clickable: true,
	},
	autoHeight: true,
	watchSlidesVisibility: true,
	direction: 'vertical',
	on: {
		init() {
			Array.from(this.slides).forEach((swiperSlide, i) => {
				const slide = swiperSlide.querySelector('.swiper-slide__wrapper');
				if (!swiperSlide.classList.contains('swiper-slide-visible')) {
					slide.style.display = 'none';
				}
			});
		},
		setTranslate() {
			Array.from(this.slides).forEach((slide,) => {
				if (slide.classList.contains('swiper-slide-visible')) {
					slide.querySelector('.swiper-slide__wrapper').style.display = '';
				}
			});
		},
		transitionEnd() {
			Array.from(this.slides).forEach((slide) => {
				if (!slide.classList.contains('swiper-slide-visible')) {
					slide.querySelector('.swiper-slide__wrapper').style.display = 'none';
				}
			});
		},
	},
});


// contact Map

const btnMap = document.querySelector('.map__btn')
const mapAnimetion = document.querySelector('.map__animation')
const mapBody = document.querySelector('.map__body')
const mapField = document.querySelector('.map__field')
function turnMap() {
	btnMap.classList.add('map__btn--hidden')
	mapAnimetion.classList.add('active')
	setTimeout(() => {
		mapAnimetion.classList.remove('active')
		mapBody.classList.add('map__body--active')
	}, 1000)
}
mapField.addEventListener('click', () => {
	turnMap()
})
btnMap.addEventListener('click', () => {
	turnMap()
})
