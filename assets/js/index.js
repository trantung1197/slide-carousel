const carouselSlide = document.querySelector(".carousel-slide");
let carouselItem = document.querySelectorAll(".slide-item");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const navigationBtnBox = document.querySelector(".navigation-button");

//variables
const size = carouselItem[0].clientWidth;
let carouselLenght = carouselItem.length;

//custome props
let counter = 0;
let timeTrans = 0.4;
let autoSlide = true;
let isLoop = true;
let timeInterval = 5000;
//create navigation button radio
createInputRadio = (id) => {
	return (htmlString = `
    <input type="radio" id=${id} name="radio-btn">
    <label for="${id}" class="manual-btn"></label>
    `);
};

let htmlStringRadioBtn = "";
for (let i = 1; i <= carouselLenght; i++) {
	htmlStringRadioBtn += createInputRadio(`radio-${i}`);
}

navigationBtnBox.innerHTML = htmlStringRadioBtn;
let labelBtnRadio = document.querySelectorAll("input[name=radio-btn]");

//set cheked input radio
setCheckedRadio = (index) => {
	labelBtnRadio[index].setAttribute("checked", true);
};
setCheckedRadio(0);

//clone element
if (isLoop) {
	let firstSlideChildClone = carouselSlide.firstElementChild.cloneNode(true);
	let lastSlideChildClone = carouselSlide.lastElementChild.cloneNode(true);
	carouselSlide.append(firstSlideChildClone);
	carouselSlide.prepend(lastSlideChildClone);
	carouselItem = document.querySelectorAll(".slide-item");
	carouselLenght = carouselItem.length;

	//add class to clone element
	carouselItem[carouselLenght - 1].classList.add("clone-first");
	carouselItem[0].classList.add("clone-last");
}

//slide switch
transformSlide = (isNext) => {
	if (isNext) {
		if (counter >= carouselLenght - 1) return;
		counter++;
	} else {
		if (counter <= 0) return;
		counter--;
	}
	carouselSlide.style.transition = `transform ${timeTrans}s ease-in-out`;
	carouselSlide.style.transform = `translateX(${-size * counter}px)`;
	setCheckedRadio(counter);
};

transformSlideRadio = (num) => {
	carouselSlide.style.transition = `transform ${timeTrans}s ease-in-out`;
	carouselSlide.style.transform = `translateX(${-size * num}px)`;
};

//test onWheel
carouselSlide.addEventListener("wheel", (event) => {
	if (event.deltaY < 0) {
		transformSlide(true);
	} else {
		transformSlide(false);
	}
});

//handleClick
btnNext.addEventListener("click", () => {
	transformSlide(true);
});

btnPrev.addEventListener("click", () => {
	transformSlide(false);
});

//reset loop
carouselSlide.addEventListener("transitionend", () => {
	if (isLoop) {
		if (carouselItem[counter].classList.contains("clone-last")) {
			carouselSlide.style.transition = "none";
			counter = carouselLenght - 2;
			carouselSlide.style.transform = `translateX(${-size * counter}px)`;
		} else if (carouselItem[counter].classList.contains("clone-first")) {
			carouselSlide.style.transition = "none";
			counter = 1;
			carouselSlide.style.transform = `translateX(${-size * counter}px)`;
		}
	}
});

//auto loop
if (autoSlide & isLoop) {
	setInterval(() => {
		transformSlide(true);
	}, timeInterval);
}

//navigation button
labelBtnRadio.forEach((element) => {
	element.addEventListener("click", (event) => {
		counter = event.target.id.match(/\d+/)[0];
		transformSlideRadio(counter);
	});
});
