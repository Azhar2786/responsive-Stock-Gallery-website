
"use strict";


/**
 * import
 */

import { ripple } from "./utils/ripple.js";
import { addEventOnElements } from "./utils/event.js";
import { urlDecode } from "./utils/urlDecode.js";
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


/**
 * Show all filtered options after reload
 */

if(window.location.search.slice(1)){

    const search = urlDecode(window.location.search.slice(1));

    Object.entries(search).forEach(item => {
        const filterKey = item[0];
        const filterValue = item[1];
        window.filterObj[filterKey] = filterValue;

        if(filterKey != "query" ){
            const filterItem = document.querySelector(`[data-filter="${filterKey}"]`);
            filterItem?.querySelector("[data-filter-chip]").classList.add("selected");

            if(filterItem){
                filterItem.querySelector("[data-filter-value]").innerText = filterValue;
            }
        }
    });

}




/**
 * Intial favorite object in local storage
 */

if(!window.localStorage.getItem("favorite")){
    const /** {Object} */ favoriteObj = {
        photos: {},
        videos: {}
    }

    window.localStorage.setItem("favorite", JSON.stringify(favoriteObj));
}



/**
 * Page transition
 */

window.addEventListener("loadstart", function () {
    document.body.style.opacity = "0";
});

window.addEventListener("DOMContentLoaded", function () {
    document.body.style.opacity = "1";
})