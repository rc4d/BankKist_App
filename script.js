'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  e.preventDefault(); // Used to cancel the default event
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Page Navigation
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
/*
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const sec1 = document.getElementById('section--1');
const allButtons = document.getElementsByTagName("button");

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.title);
// console.log(allSections);
// console.log(sec1);
// console.log(allButtons);

// Creating and Inserting Elements
const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML = `We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;
// header.prepend(message); // Add as first child
// Append meathod add as second child
header.append(message);
// header.before(message); // Insert before header element
// header.after(message); // Insert after Header element

document 
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function() {
  // message.remove();
  message.parentElement.removeChild(message);
});

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
console.log(message.style.width);
console.log(message.style.backgroundColor);

message.style.height = Number.parseInt(getComputedStyle(message).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');
// Attribute
const logo = document.querySelector('.nav__logo');
console.log(logo);
console.log(logo.alt, logo.scroll, logo.className);

logo.alt = 'Beautiful minimalist logo';
// Non-standard
console.log(logo.designer);
// get attribute && set attribute
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

const links = document.querySelector('.nav__link--btn');
console.log(links.href);
console.log(links.getAttribute('href'));

//CSS Classes 
logo.classList.add("hidden", 'c');
logo.classList.remove("hidden");
logo.classList.toggle("hidden");
logo.classList.contains("c");

*/

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// Scrolling
btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Types of Event and Event Handlers
const alertH1 = function (e) {
  alert(
    `addEventListener: Great! You are reading the heading : ${h1.textContent}`
  );
};
const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter',alertH1); // New way
// h1.onmouseenter = alertMessage; // Old school way

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

/* Event propagation is a way to describe the “stack” of events that are fired in a web browser. 
Event propagation : Bubbling and Capturing
Event Bubbling: event bubble from inner element to outer ==>> When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors.

3 phases of event propagation:

Capturing phase – the event goes down to the element. (It is rarely used in real code, but sometimes can be useful.)
Target phase – the event reached the target element.
Bubbling phase – the event bubbles up from the element.

*/
/* Example 
<form onclick="alert('form')">FORM
  <div onclick="alert('div')">DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>
Even when I click on P tag, all the event will get called starting from p to div
*/

// Capturing: Capturing down the DOM TREE
// Trickling down and Bubbling Up

/*
 Event Delegation  exist because bubbling exist.
 Instead of adding an event listener to each and every similar element, we can add an event listener to a parent element and call an event on a particular target using the .target property of the event object.
 document
        .querySelector("#form")
        .addEventListener("keyup", (e) => {
          if(e.target.dataset.uppercase != undefined){
            e.target.value = e.target.value.toUpperCase();
          }else{
            e.target.value = e.target.value.toLowerCase();
          }
        });
 */
//////////////////////////
// Tabbed Component

const operationsContainer = document.querySelector(
  '.operations__tab-container'
);
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

operationsContainer.addEventListener('click', function (e) {
  let clickedTab = e.target.closest('.operations__tab');
  // Guard Clause
  if (!clickedTab) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  clickedTab.classList.add('operations__tab--active');
  // Activate content Area
  document
    .querySelector(`.operations__content--${clickedTab.dataset.tab}`)
    .classList.add('operations__content--active');
});
// Menu Fade Animation
// mouseenter opposite => mouse leave
// mouseover opposite => mouse out

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler using bind
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// nav.addEventListener('mouseover', function(e){
//   handleHover(e, 0.5);
// });
// nav.addEventListener('mouseout', function(e){
//   handleHover(e, 1);
// });

// Sticky Navigation

const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);
window.addEventListener("scroll", function(){
  // console.log(window.scrollY);
  if(window.scrollY > initialCoords.top)
    nav.classList.add('sticky');
  else nav.classList.remove('sticky');
})