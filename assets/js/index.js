const carouselSlide = document.querySelector(".carousel-slide");
const carouselItem = document.querySelectorAll(".slide-item");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

let indexActive = 1;
const size = carouselItem[0].clientWidth;
let timeTrans = 0.4;


btnNext.addEventListener("click", () => {
    console.log(carouselSlide);
    carouselSlide.style.transition = `transform ${timeTrans}s ease-in-out`;
    indexActive++;
    carouselSlide.style.transform = `translateX(${-size * indexActive}px)`;
});

btnPrev.addEventListener("click", () => {
    console.log(carouselSlide);
    carouselSlide.style.transition = `all ${timeTrans}s linear`;
    indexActive--;
    carouselSlide.style.transform = `translateX(${-size * indexActive}px)`;
});


