'use strict'
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
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"

function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();
// Burger
const header__burger = document.querySelector('.header__burger');
const header__menu = document.querySelector('.header__menu');
const body = document.querySelector('body');
const header__list = document.querySelector('.header__list');
const html = document.querySelector('html');

const isiPhone = (navigator.userAgent.match(/iPhone/i) != null);
const isiPad = (navigator.userAgent.match(/iPad/i) != null);
const isiPod = (navigator.userAgent.match(/iPod/i) != null);

if (isiPhone || isiPad || isiPod) {
	console.log('IPhone')
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

} else {
	console.log('Это не айфон -_-')
}
header__burger.onclick = function (e) {
	if (isiPhone || isiPad || isiPod) {
		window.scrollTo(0, window.pageYOffset + 1);
		header__burger.classList.toggle('active');
		header__menu.classList.toggle('active');
		body.classList.toggle('lock');
		bodyFixPosition()
		bodyUnfixPosition()

	} else {
		header__burger.classList.toggle('active');
		header__menu.classList.toggle('active');
		body.classList.toggle('lock');
	}
}

if (isiPhone || isiPad || isiPod) {
	window.addEventListener('scroll', function () {
		if (body.classList.contains('lock')) {
			window.scrollTo(0, window.pageYOffset + 1);
			bodyFixPosition()
		} else {
			bodyUnfixPosition()
		}
	})
}

function bodyFixPosition() {
	setTimeout(function () {
		// Ставим необходимую задержку, чтобы не было «конфликта» в случае, если функция фиксации вызывается сразу после расфиксации (расфиксация отменяет действия расфиксации из-за одновременного действия)
		if (!document.body.hasAttribute('data-body-scroll-fix')) {
			// Получаем позицию прокрутки
			let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
			// Ставим нужные стили
			document.body.setAttribute('data-body-scroll-fix', scrollPosition); // Cтавим атрибут со значением прокрутки

			document.body.style.position = 'fixed';
			document.body.style.top = '-' + scrollPosition + 'px';
			document.body.style.left = '0';
			document.body.style.width = '100%';
		}
	}, 15); // Можно задержку ещё меньше, но у меня работало хорошо именно с этим значением на всех устройствах и браузерах 
}

function bodyUnfixPosition() {
	if (document.body.hasAttribute('data-body-scroll-fix')) {
		// Получаем позицию прокрутки из атрибута
		let scrollPosition = document.body.getAttribute('data-body-scroll-fix');
		// Удаляем атрибут
		document.body.removeAttribute('data-body-scroll-fix');
		// Удаляем ненужные стили

		document.body.style.position = '';
		document.body.style.top = '';
		document.body.style.left = '';
		document.body.style.width = '';
		// Прокручиваем страницу на полученное из атрибута значение
		window.scroll(0, scrollPosition);
	}
}

// scroll nav
const headerNav = document.querySelector(".header__wrapper");
let prevScrollpos = window.pageYOffset;

function navOpen() {
	if (prevScrollpos != 0) {
		headerNav.classList.add('_active');
	} else {
		headerNav.classList.remove('_active');
	}
}
function navScroll() {
	window.onscroll = function () {
		var currentScrollPos = window.pageYOffset;
		if (prevScrollpos < currentScrollPos) {
			headerNav.classList.add('_active');
		} else if (prevScrollpos = currentScrollPos) {
			headerNav.classList.add('_active');
		} else {
			headerNav.classList.remove('_active');
		}
		prevScrollpos = currentScrollPos;
	}
}
navOpen()
navScroll()


// snackbar
const copyButtons = document.querySelectorAll('.project__copy-btn');
copyButtons.forEach(function (item) {
	item.addEventListener('click', function (event) {
		let copytext = document.createElement('input')
		copytext.value = 'link-to-site'
		document.body.appendChild(copytext)
		copytext.select()
		document.execCommand('copy')
		document.body.removeChild(copytext)
		let snackbar = document.querySelector('.snackbar')
		snackbar.classList.add('show-snackbar')
		setTimeout(function () { snackbar.classList.remove('show-snackbar') }, 3000);
	})
})

// COUNTER
let item = document.querySelector(".statistics-item")
let numberTop = item.getBoundingClientRect().top;
window.addEventListener('scroll', function scrolling() {
	if (window.pageYOffset > numberTop + window.innerHeight / 3) {
		this.removeEventListener('scroll', scrolling);
		const counters = document.querySelectorAll('.statistics-item__quantity');
		const speed = 120; // The lower the slower
		counters.forEach(counter => {
			const updateCount = () => {
				const target = +counter.getAttribute('data-max');
				const count = +counter.innerText;
				// Lower inc to slow and higher to slow
				const inc = Math.round(target / speed);
				// console.log(inc);
				// console.log(count);
				// Check if target is reached
				if (count < target) {
					// Add inc to count and output in counter
					counter.innerText = count + inc;
					// Call function every ms
					setTimeout(updateCount, 10);
				} else {
					counter.innerText = target;
				}
			};
			updateCount();
		});
	}
});

// Filter category
filterSelection("all")
function filterSelection(c) {
	var x, i;
	x = document.getElementsByClassName("project");
	if (c == "all") c = "";
	// Добавить класс "show" (display:block) к отфильтрованным элементам и удалите класс "show" из элементов, которые не выбраны
	for (i = 0; i < x.length; i++) {
		RemoveClass(x[i], "project--onCategory");
		if (x[i].className.indexOf(c) > -1) AddClass(x[i], "project--onCategory");
	}
}

// Показать отфильтрованные элементы
function AddClass(element, name) {
	var i, arr1, arr2;
	arr1 = element.className.split(" ");
	arr2 = name.split(" ");
	for (i = 0; i < arr2.length; i++) {
		if (arr1.indexOf(arr2[i]) == -1) {
			element.className += " " + arr2[i];
		}
	}
}

// Скрыть элементы, которые не выбраны
function RemoveClass(element, name) {
	var i, arr1, arr2;
	arr1 = element.className.split(" ");
	arr2 = name.split(" ");
	for (i = 0; i < arr2.length; i++) {
		while (arr1.indexOf(arr2[i]) > -1) {
			arr1.splice(arr1.indexOf(arr2[i]), 1);
		}
	}
	element.className = arr1.join(" ");
}

// Добавьте активный класс к текущей кнопке (выделите его)
var btnContainer = document.getElementById("btn-container");
var btns = btnContainer.getElementsByClassName("latest-projects__btn");
for (var i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", function () {
		var current = document.getElementsByClassName("active-category");
		current[0].className = current[0].className.replace(" active-category", "");
		this.className += " active-category";
	});
}

// Acordion
document.querySelectorAll('.acordion-triger').forEach((item) =>
	item.addEventListener('click', () => {
		item.parentNode.classList.toggle('acordion--active');
	})
)

// Swiper
let swiperHeader = new Swiper('.swiper-header', {
	loop: true,
	centeredSlides: true,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	watchSlidesVisibility: true,
	on: {
		init() {
			Array.from(this.slides).forEach((swiperSlide, i) => {
				const slide = swiperSlide.querySelector('.slider__wrapper');
				if (!swiperSlide.classList.contains('swiper-slide-visible')) {
					slide.style.display = 'none';
				}
			});
		},
		setTranslate() {
			Array.from(this.slides).forEach((slide,) => {
				if (slide.classList.contains('swiper-slide-visible')) {
					slide.querySelector('.slider__wrapper').style.display = '';
				}
			});
		},
		/* 	setTranslate: _.debounce(() => {
				Array.from(this.slides).forEach((slide) => {
					if (slide.classList.contains('swiper-slide-visible')) {
						slide.querySelector('.slider__wrapper').style.display = '';
					}
				});
			}, 50), */
		transitionEnd() {
			Array.from(this.slides).forEach((slide) => {
				if (!slide.classList.contains('swiper-slide-visible')) {
					slide.querySelector('.slider__wrapper').style.display = 'none';
				}
			});
		},
	},
});

let swiperPosts = new Swiper('.swiper-posts', {
	slidesPerView: 3,
	updateOnWindowResize: true,
	spaceBetween: 30,
	watchOverflow: true,
	watchSlidesVisibility: true,
	navigation: {
		nextEl: '.swiper-post-button-next',
		prevEl: '.swiper-post-button-prev',
	},
	observer: true,
	observeParents: true,
	observeSlideChildren: true,
	breakpoints: {// настройки для разных разрешений
		300: {
			slidesPerView: 1,
			spaceBetween: 8
		},
		700: {
			slidesPerView: 2,
			spaceBetween: 20
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 30
		}
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
const slider = swiperPosts;
const wrapper = swiperPosts.wrapperEl;

let swiperPostsInterior1 = new Swiper('.posts-image-slider', {
	loop: true,
	observer: true,
	observeParents: true,
	observeSlideChildren: true,
	updateOnWindowResize: true,
	watchOverflow: true,
	slidesPerView: 1,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false,
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
});

// Slider hover
document.querySelector('.posts-image-slider').addEventListener('mouseenter', () => {
	swiperPostsInterior1.autoplay.stop()
});
document.querySelector('.posts-image-slider').addEventListener('mouseleave', () => {
	swiperPostsInterior1.autoplay.start()
});
// 
let swiperPostsInterior2 = new Swiper('.posts-image-slider2', {
	loop: true,
	observer: true,
	observeParents: true,
	observeSlideChildren: true,
	updateOnWindowResize: true,
	watchOverflow: true,
	slidesPerView: 1,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false,
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	watchOverflow: true,
});

// Slider hover
document.querySelector('.posts-image-slider2').addEventListener('mouseenter', () => {
	swiperPostsInterior2.autoplay.stop()
});
document.querySelector('.posts-image-slider2').addEventListener('mouseleave', () => {
	swiperPostsInterior2.autoplay.start()
});





const popupLinks = document.querySelectorAll('.popup-link');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;
let bodyLockBoolean;
const timeout = 700;

console.log('Верстка - Чёрный')
console.log('Fix2')

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		}
		else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener("mousedown", function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	if (body.classList.contains('lock')) {
		bodyLockBoolean = true;
		console.log(`При открытии у bodyLockBoolean было значение: ${bodyLockBoolean}, по этому класс lock у body не добаляли.`)
	} else if (!body.classList.contains('lock')) {
		bodyLockBoolean = false;
		console.log(`При открытии у bodyLockBoolean было значение: ${bodyLockBoolean}, по этому класс lock был добавлен в body.`)
		body.classList.add('lock');
	}

	unlock = false;

	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';

		if (isiPhone || isiPad || isiPod) {
			// bodyUnfixPosition()
			if (bodyLockBoolean == false) {
				console.log(`При закрытии у bodyLockBoolean было значение: ${bodyLockBoolean}, по этому мы убрали класс lock c body.`)
				body.classList.remove('lock');
			} else {
				console.log(`При закрытии у bodyLockBoolean было значение: ${bodyLockBoolean}, по этому класс lock с body не убирался.`)
			}
		} else {
			if (bodyLockBoolean == false) {
				console.log(`При закрытии у bodyLockBoolean было значение: ${bodyLockBoolean}, по этому мы убрали класс lock c body.`)
				body.classList.remove('lock');
			} else {
				console.log(`При закрытии у bodyLockBoolean было значение: ${bodyLockBoolean}, по этому класс lock с body не убирался.`)
			}
		}

	}, timeout);
	unlock = false;
	setTimeout(() => {
		unlock = true
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});
(function () {
	if (!Element.prototype.closest) {
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();

/*
const popupLinks = document.querySelectorAll('.popup-link');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;
let bodyLockBoolean;
const timeout = 700;

console.log('Верстка - Чёрный')
console.log('Проблема с модалкой у айфонов')

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		}
		else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener("mousedown", function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	if (isiPhone || isiPad || isiPod) {
		// bodyFixPosition()
		if (body.classList.contains('lock')) {
			bodyLockBoolean = true;
			console.log(`При открытии у bodyLockBoolean было значение: ${bodyLockBoolean}, по этому класс lock у body не добаляли.`)
		} else {
			bodyLockBoolean = false;
			console.log(`При открытии у bodyLockBoolean было значение: ${bodyLockBoolean}, по этому класс lock был добавлен в body.`)
			body.classList.add('lock');
			html.classList.add('lock');
		}
	} else {
		if (body.classList.contains('lock')) {
			bodyLockBoolean = true;
			console.log(`При открытии у bodyLockBoolean было значение: ${bodyLockBoolean}, по этому класс lock у body не добаляли.`)
		} else if (!body.classList.contains('lock')) {
			bodyLockBoolean = false;
			console.log(`При открытии у bodyLockBoolean было значение: ${bodyLockBoolean}, по этому класс lock был добавлен в body.`)
			body.classList.add('lock');
			html.classList.add('lock');
		}
	}
	unlock = false;

	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		if (isiPhone || isiPad || isiPod) {
			// bodyUnfixPosition()
			if (bodyLockBoolean == false) {
				console.log(`При закрытии у bodyLockBoolean было значение: ${bodyLockBoolean}, по этому мы убрали класс lock c body.`)
				body.classList.remove('lock');
				html.classList.remove('lock');
			} else {
				console.log(`При закрытии у bodyLockBoolean было значение: ${bodyLockBoolean}, по этому класс lock с body не убирался.`)
			}
		} else {
			if (bodyLockBoolean == false) {
				console.log(`При закрытии у bodyLockBoolean было значение: ${bodyLockBoolean}, по этому мы убрали класс lock c body.`)
				body.classList.remove('lock');
				html.classList.remove('lock');
			} else {
				console.log(`При закрытии у bodyLockBoolean было значение: ${bodyLockBoolean}, по этому класс lock с body не убирался.`)
			}
		}
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});
(function () {
	if (!Element.prototype.closest) {
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
*/
