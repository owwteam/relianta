AOS.init({
	once: true,
});

let lastScrollY = window.scrollY;
const navbar = document.getElementsByClassName("navbar")[0];
let lastShowScrollY = lastScrollY;

window.addEventListener("scroll", () => {
	const currentScrollY = window.scrollY;

	if (currentScrollY <= 100) {
		navbar.classList.remove("show", "hidden");
		lastScrollY = currentScrollY;
		lastShowScrollY = currentScrollY;
		return;
	}

	if (currentScrollY > lastScrollY) {
		navbar.classList.remove("show");
		navbar.classList.add("hidden");
		lastShowScrollY = currentScrollY;
	} else if (lastShowScrollY - currentScrollY > 50) {
		navbar.classList.remove("hidden");
		navbar.classList.add("show");
		lastShowScrollY = currentScrollY;
	}

	lastScrollY = currentScrollY;
});

const navToggle = document.querySelector(".navbar__toggle");
const navMenu = document.querySelector(".navbar__menu");

navToggle.addEventListener("click", () => {
	const isActive = navToggle.classList.toggle("active");
	navMenu.classList.toggle("active");
	navbar.classList.remove("show", "hidden");

	if (isActive) {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "";
	}
});