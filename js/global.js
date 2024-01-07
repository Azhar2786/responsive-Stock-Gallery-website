
"use strict";


/**
 * import
 */

import { ripple } from "./utils/ripple.js";
import { addEventOnElements } from "./utils/event.js";

/**
 * Header on-scroll
 */

const /** {NodeElement} */ $header = document.querySelector("[data-header]");

window.addEventListener("scroll", () => {
    $header.classList[window.scrollY > 50 ? "add" : "remove"]("active");
});

/**
 * Add ripple effect
 */

const /** {NodeList}  */ $rippleElems = document.querySelectorAll("[data-ripple]");

$rippleElems.forEach($rippleElem => ripple($rippleElem));


/**
 * Navbar toggle for mobile screen
 */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navBar = document.querySelector("[data-navigation");
const scrim = document.querySelector("[data-scrim]");

addEventOnElements(navTogglers, "click", function () {
    navBar.classList.toggle("show");
    scrim.classList.toggle("active");
});






/**
 * Filter functionality
 */

window.filterObj = {};