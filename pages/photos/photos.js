"use strict";


/**
 * Import
 */


import { client } from "../../js/api_configure.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { photoCard } from "../../js/photo_card.js";
import { updateUrl } from "../../js/utils/updateUrl.js";
import { urlDecode } from "../../js/utils/urlDecode.js";
import { filter } from "../../js/filter.js";


/**
 * Show filter bar if searched  anything
 */

const filterBar = document.querySelector("[data-filter-bar]");


filterBar.style.display = window.location.search ? "flex" : "none";

/**
 * Init filter
 */

const  filterWrapppers = document.querySelectorAll("[data-filter");

filterWrapppers.forEach(filterWrappper => {
    filter(filterWrappper, window.filterObj, (newObj) => {
        // console.log(newObj);
        window.filterObj = newObj;
        updateUrl(newObj, "photos");

    });
});



/**
 * Render curated or searched photos
 * If searched something then searched photos
 * otherwise render curated photos
 */

const $photoGrid = document.querySelector("[data-photo-grid]");

const $title = document.querySelector("[data-title]");
const /** {Object} */ photoGrid = gridInit($photoGrid);
const perPage = 30;
let currentPage = 1;
let totalPage = 0;
const searchUrl = window.location.search.slice(1);
let searchObj = searchUrl && urlDecode(searchUrl);
const title = searchObj ? `${searchObj.query} photos` : "Curated photos";


$title.textContent = title;
document.title = title;


/**
 * Render all photos
 * @param {Number} currentPage Current page number
 */

const  renderPhotos = function (currentPage) {
    client.photos[searchObj ? "search" : "curated"]({ ...searchObj, per_page: perPage, page: currentPage}, data =>{
        // console.log(data);

        totalPage = Math.ceil(data.total_results / perPage);

        data.photos.forEach(photo => {
            const $photoCard = photoCard(photo);
             
            updateGrid($photoCard, photoGrid.columnsHeight, photoGrid.columns);
            
        });

        // when photos loaded
        isLoaded = true;

        //when no more photo found, hide loader
        if(currentPage >= totalPage){
            loader.style.display = "none";
        }
    });
};



renderPhotos(currentPage);


/**
 * Laod more photos
 */

const loader = document.querySelector("[data-loader");
let isLoaded = true;

window.addEventListener("scroll", function () {

    // console.log(loader.getBoundingClientRect().top);

    if(loader.getBoundingClientRect().top < (window.innerHeight * 2) && currentPage <= totalPage && isLoaded){
        currentPage++;
        renderPhotos(currentPage);
        isLoaded = false;
    }

});


