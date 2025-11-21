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
// we serve ANIMATION
const links = document.querySelectorAll(".whoweserve__link");
const images = document.querySelectorAll(".content-body_img");

links.forEach((link, index) => {
	link.addEventListener("mouseenter", () => {
		images.forEach(img => img.classList.remove("show"));

		images[index].classList.add("show");
	});
});


// gsap ANIMATION
gsap.registerPlugin(ScrollTrigger);

// PIN GAMBAR
gsap.timeline({
	scrollTrigger: {
		trigger: ".howwework__img-progress",
		start: "top 20%",
		// end: "+=600",
		end: "bottom bottom",
		scrub: true,
		//pin: true,
	}
});



function setActiveContent(index) {
	const boxes = document.querySelectorAll(".line-progress__box");

	const img = document.querySelector(".howwework__img-progress img");
	const numbImg = document.querySelector(".numb-img_progress");
	const textImg = document.querySelector(".text-img_progress");

	const activeBox = boxes[index];

	if (!activeBox) return;

	
	const number = activeBox.querySelector(".line-box__numb").textContent.trim();
	const text = activeBox.querySelector(".tagline-box_text").textContent.trim();

	
	numbImg.textContent = number;
	textImg.textContent = text;

	
	img.src = `/assets/images/img-howwework-${index + 1}.png`;
}



let tl = gsap.timeline({
	scrollTrigger: {
		trigger: ".line-progress__box",
		start: "top 10%",
		end: "bottom top",
		scrub: true,
		// markers: true,
		onLeaveBack: () => setActiveContent(0)
	}
});



// LINE 1
tl.fromTo(".line1", { height: "0%" }, { height: "100%" })
	.to(".dot2", { backgroundColor: "#458781", duration: 0.01 })
	.add(() => {
		setActiveContent(1);
});

// LINE 2
tl.fromTo(".line2", { height: "0%" }, { height: "100%" })
	.to(".dot3", { backgroundColor: "#458781", duration: 0.01 })
	.add(() => {
		setActiveContent(2);
});

// LINE 3
tl.fromTo(".line3", { height: "0%" }, { height: "100%" })
	.to(".dot4", { backgroundColor: "#458781", duration: 0.01 })
	.add(() => {
		setActiveContent(3);
});

// LINE 4
tl.fromTo(".line4", { height: "0%" }, { height: "100%" })
.add(() => {
	setActiveContent(4);
});
