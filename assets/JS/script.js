const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

// SLIDER DOM MANIPULATION
let currentSlide = 0;
const slides = document.querySelectorAll('.slider img');
const totalSlides = slides.length;
const slider = document.querySelector('.slider');
const navDots = document.querySelectorAll('.slider-nav a');

// Accordion
const headers = document.querySelectorAll('.accordion-header');


burger.addEventListener('click', () => {
   nav.classList.toggle('active');
});

function goToSlide(slideIndex) {
   currentSlide = slideIndex;
   const slideWidth = slides[0].offsetWidth;
   slider.scrollLeft = slideWidth * slideIndex;
   updateActiveDot();
}

function updateActiveDot() {
   navDots.forEach((dot, index) => {
      if (index === currentSlide) {
         dot.style.opacity = '1';
         dot.style.background = '#066418';
      }
      else {
         dot.style.opacity = '0.5';
         dot.style.background = '#e0e0e0';
      }
   });
}

navDots.forEach((dot, index) => {
   dot.addEventListener('click', (e) => {
      e.preventDefault();
      goToSlide(index);
   });
});

function autoplay() {
   currentSlide = (currentSlide + 1) % totalSlides;
   goToSlide(currentSlide);
}

let autoplayInterval = setInterval(autoplay, 3000);

slider.addEventListener('mouseenter', () => {
   clearInterval(autoplayInterval);
});

slider.addEventListener('mouseleave', () => {
   autoplayInterval = setInterval(autoplay, 3000);
});


updateActiveDot();


const aboutImage = document.getElementById('about-image');
const aboutText = document.getElementById('about-text');


document.addEventListener("DOMContentLoaded", function () {
   const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            aboutImage.classList.add("visible");
            observer.unobserve(entry.target);
         }
      });
   }, {threshold: 0.1});
   observer.observe(aboutImage);
});

document.addEventListener("DOMContentLoaded", function () {
   const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
         if (entry.isIntersecting) {

            aboutText.classList.add("visible");
            observer.unobserve(entry.target);
         }
      });
   }, {threshold: 0.1});
   observer.observe(aboutText);
});

headers.forEach(header => {
   header.addEventListener('click', () => {
      headers.forEach(otherHeader => {
         if(otherHeader !== header) {
            otherHeader.classList.remove('active');
         }
      });
      header.classList.toggle('active');
   });
});
