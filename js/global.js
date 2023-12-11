
"use strict";


/**
 * import
 */

import { ripple } from "./utils/ripple.js";

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

const /** {NodeList}  */ rippleElements = document.querySelectorAll("[data-ripple]");

rippleElements.forEach(rippleElement => ripple(rippleElement));