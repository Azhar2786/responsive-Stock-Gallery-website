"use strict";


/**
 * imports
 */


import { ripple } from "./utils/ripple.js";
import { addEventOnElements } from "./utils/event.js";
import { segment } from "./segment_btn.js";
import { updateUrl } from "./utils/updateUrl.js";
import { urlDecode } from "./utils/urlDecode.js";

/** { NodeList } */
const searchTogglers = document.querySelectorAll("[data-search-toggler]");
/** { NodeElement } */
const searchView = document.querySelector("[data-search-view]");

addEventOnElements(searchTogglers, "click", () => searchView.classList.toggle("show"));


/**
 * Search Clear
 */


const searchField = document.querySelector("[data-search-field]");
const searchClearBtn = document.querySelector("[data-search-clear-btn");

searchClearBtn.addEventListener("click", () => searchField.value = "");

/**
 * Search Type
 */

const searchSegment = document.querySelector("[data-segment='search']");
const activeSegmentBtn = searchSegment.querySelector("[data-segment-btn].selected");
window.searchType =  activeSegmentBtn.dataset.segmentValue;


segment(searchSegment, segmentValue => {
    window.searchType = segmentValue;
    // console.log(searchType);
});




/**
 * Search submit
 */

const searchBtn = document.querySelector("[data-search-btn]");

searchBtn.addEventListener("click", function () {
    const searchValue = searchField.value.trim();
    console.log(searchValue);
    if(searchValue) {
        updateSearchHistory(searchValue);
        window.filterObj.query = searchValue;
        updateUrl(window.filterObj, window.searchType);
    }
});


/**
 * Submit search when press on enter key
 */

searchField.addEventListener("keydown", e => {
    if(e.key == "Enter" && searchField.value.trim())
        searchBtn.click();
});


/**
 * Search history
 */

// Initial search history

/** {object} */
let searchHistory = { items: [] };

if(!window.localStorage.getItem("search_history")){
    window.localStorage.setItem("search_history", JSON.stringify(searchHistory));
} else {
    searchHistory = JSON.parse(window.localStorage.getItem("search_history"));
}

// Update search History

const updateSearchHistory = searchValue => {
    /**
     * if the search value is already present in list
     * then remove it and add the value at begininig of list
     * ensure that most search is at top of history
     */

    if(searchHistory.items.includes(searchValue)) {
        searchHistory.items.splice(searchHistory.items.indexOf(searchValue), 1);
    }

    searchHistory.items.unshift(searchValue);

    window.localStorage.setItem("search_history", JSON.stringify(searchHistory));

}


/**
 * Render search history items in list
 */

const searchList = document.querySelector("[data-search-list");
const historyLength = searchHistory.items.length;

for(let i = 0; i < historyLength & i <= 5; i++){
    const listItem = document.createElement("button");
    listItem.classList.add("list-item");

    listItem.innerHTML = `
        <span class="material-symbols-outlined leading-icon" aria-hidden="true">history</span>

        <span class="body-large text">${searchHistory.items[i]}</span>

        <div class="state-layer"></div>
    `;

    ripple(listItem);

    listItem.addEventListener("click", function () {
        searchField.value = this.children[1].textContent;
        searchBtn.click();
    });

    searchList.appendChild(listItem);
}



/**
 * Show searched value in search feild after reload
 */

const /** {Object} */ search = urlDecode(window.location.search.slice(1));

// console.log(search);

if(search.query) {
    searchField.value = search.query;
}