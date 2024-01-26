"use strict";


/**
 * Import
 */

import { client } from "./api_configure.js";
import {  photoCard } from "./photo_card.js";
import { gridInit, updateGrid } from "./utils/masonry_grid.js";

/**
 * Render curated photos in home page
 */

const photoGrid = document.querySelector("[data-photo-grid]");

photoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(18);

client.photos.curated({page: 1, per_page: 20}, data =>{
    // console.log(data);

    photoGrid.innerHTML = "";
    const /** {Object} */ photo_grid = gridInit(photoGrid);

    data.photos.forEach(photo => {
        
        const $photoCard = photoCard(photo);

        // photoGrid.appendChild($photoCard);

        updateGrid($photoCard, photo_grid.columnsHeight, photo_grid.columns);

    });
})




/**
 * Render popular video in home page
 */


const $videoGrid = document.querySelector("[data-video-grid]");

$videoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(18);

client.videos.popular({ per_page: 20 }, data => {

    $videoGrid.innerHTML = "";
    const /** {Array} */ videoGrid = gridInit($videoGrid);

    data.videos.forEach(video =>{

        const $videoCard = videoCard(video);

        updateGrid($videoCard, videoGrid.columnsHeight, videoGrid.columns);

    });


});