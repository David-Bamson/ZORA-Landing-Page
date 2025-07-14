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


class TestimonialsCarousel {
            constructor() {
                this.container = document.getElementById('testimonialContainer');
                this.wrapper = document.getElementById('testimonialWrapper');
                this.prevBtn = document.getElementById('prevBtn');
                this.nextBtn = document.getElementById('nextBtn');
                this.dotsContainer = document.getElementById('dotsContainer'); // Fixed typo

                this.currentIndex = 0;
                this.totalSlides = document.querySelectorAll('.testimonial-card').length; // Fixed selector
                this.isDragging = false;
                this.startX = 0;
                this.currentTranslate = 0;
                this.prevTranslate = 0;
                this.animationId = 0;

                this.init();
            }

            init() {
                this.createDots();
                this.updateCarousel();
                this.bindEvents();
                this.startAutoPlay();
            }

            createDots() {
                for (let i = 0; i < this.totalSlides; i++) {
                    const dot = document.createElement('div');
                    dot.className = 'dot';
                    dot.addEventListener('click', () => this.goToSlide(i));
                    this.dotsContainer.appendChild(dot);
                }
            }

            bindEvents() {
                // Navigation Buttons
                this.prevBtn.addEventListener('click', () => this.prevSlide());
                this.nextBtn.addEventListener('click', () => this.nextSlide());

                // Touch/Mouse events for dragging
                this.container.addEventListener('mousedown', this.dragStart.bind(this));
                this.container.addEventListener('mousemove', this.drag.bind(this));
                this.container.addEventListener('mouseup', this.dragEnd.bind(this));
                this.container.addEventListener('mouseleave', this.dragEnd.bind(this));

                // Touch Events
                this.container.addEventListener('touchstart', this.dragStart.bind(this));
                this.container.addEventListener('touchmove', this.drag.bind(this));
                this.container.addEventListener('touchend', this.dragEnd.bind(this));

                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') this.prevSlide();
                    if (e.key === 'ArrowRight') this.nextSlide(); // Fixed typo
                });

                // Pause autoplay on hover
                this.container.addEventListener('mouseenter', () => this.pauseAutoPlay());
                this.container.addEventListener('mouseleave', () => this.startAutoPlay());
            }

            dragStart(e) {
                this.isDragging = true;
                this.startX = this.getPositionX(e);
                this.wrapper.style.cursor = 'grabbing';
                this.pauseAutoPlay();
            }

            drag(e) {
                if (!this.isDragging) return;

                e.preventDefault();
                const currentX = this.getPositionX(e);
                const deltaX = currentX - this.startX; // Fixed variable name
                this.currentTranslate = this.prevTranslate + deltaX;

                // Add resistance at Boundaries
                const maxTranslate = 0;
                const minTranslate = -(this.totalSlides - 1) * 100;

                if (this.currentTranslate > maxTranslate) {
                    this.currentTranslate = maxTranslate + (this.currentTranslate - maxTranslate) * 0.3;
                } else if (this.currentTranslate < minTranslate) { // Fixed condition
                    this.currentTranslate = minTranslate + (this.currentTranslate - minTranslate) * 0.3;
                }

                this.wrapper.style.transform = `translateX(${this.currentTranslate}%)`;
            }

            dragEnd() {
                if (!this.isDragging) return;

                this.isDragging = false; // Fixed assignment operator
                this.wrapper.style.cursor = 'grab';

                const moved = this.currentTranslate - this.prevTranslate;
                const threshold = 50;

                if (Math.abs(moved) > threshold) {
                    if (moved > 0 && this.currentIndex > 0) {
                        this.currentIndex--;
                    } else if (moved < 0 && this.currentIndex < this.totalSlides - 1) {
                        this.currentIndex++; // Fixed missing increment
                    }
                }

                this.updateCarousel();
                this.startAutoPlay();
            }

            getPositionX(e) {
                return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            }

            nextSlide() {
                if (this.currentIndex < this.totalSlides - 1) {
                    this.currentIndex++;
                } else {
                    this.currentIndex = 0;
                }
                this.updateCarousel();
            }

            prevSlide() {
                if (this.currentIndex > 0) {
                    this.currentIndex--;
                } else {
                    this.currentIndex = this.totalSlides - 1;
                }
                this.updateCarousel();
            }

            goToSlide(index) {
                this.currentIndex = index;
                this.updateCarousel();
            }

            updateCarousel() {
                const translateX = -this.currentIndex * 100; // Fixed negative value
                this.wrapper.style.transform = `translateX(${translateX}%)`;
                this.prevTranslate = translateX;
                this.currentTranslate = translateX;

                document.querySelectorAll('.dot').forEach((dot, index) => {
                    dot.classList.toggle('active', index === this.currentIndex);
                });

                this.prevBtn.disabled = false;
                this.nextBtn.disabled = false;
            }

            startAutoPlay() {
                this.autoPlayInterval = setInterval(() => { // Fixed property name
                    this.nextSlide();
                }, 5000);
            }

            pauseAutoPlay() {
                clearInterval(this.autoPlayInterval); // Fixed property name
            }
        }

        // Initialize carousel when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new TestimonialsCarousel();
        });