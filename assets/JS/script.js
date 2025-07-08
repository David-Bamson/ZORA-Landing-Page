// // importing the required modules
// const express = require('express');
// const fs = require('fs');
// const path = require('path');


const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

// //  This creates the express app which would allow us define routes and middleware for out server
//  const app = express();

//  //Middleware to make the html files directly accessible to users throught the webserver
//  app.use(express.static('Public'));

//  //Middleware to help to take the data submitted from an html form and processing it into a format that the server can easily work with
//  app.use(express.urlencoded({ extended: true }));

//  //Routes
//  app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'Public', 'index.html'));
//  })

//  app.get('/about.html', (req, res) => {
//    res.sendFile(path.join(__dirname, 'Public', 'about.html'));
// })

// // app.get('/contact', (req, res) => {
// //    res.sendFile(path.join(__dirname, 'Public', 'contact.html'));
// // })

// // Form submission handling
// app.post('/submit-form', (req, res) => {
//    const { name, email, message } = req.body;

//    const data = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\n`;

//    //Save form data to a file
//    fs.appendFile('form-submissions.txt' , data, (err) => { //form-submissions.txt this is the name of the file we're writing to , if it doesn't exists , fs.appendfile will create it.


//       if (err) { //(err) => is a call back function that runs after the file is written 
//          console.error('Error saving data:', err);

//          res.status(500).send('Internal Server Error');
//       } else {
//          res.send('<h1>Thank you for contacting us! </h1><br> <p>We have received your message. </p>');
//       }
//    });
// });

// //Start Server
// app.listen(8000, 'localhost', () => {
//    console.log('Express Assignment Server started!!!');
// });

// SLIDER DOM MANIPULATION
let currentSlide = 0;
const slides = document.querySelectorAll('.slider img');
const totalSlides = slides.length;
const slider = document.querySelector('.slider');
const navDots = document.querySelectorAll('.slider-nav a');




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



document.addEventListener("DOMContentLoaded", function () {
   const aboutImage = document.getElementById('about-image');
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
   const aboutText = document.getElementById('about-text');
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