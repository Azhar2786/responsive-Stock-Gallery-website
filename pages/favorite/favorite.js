"use strict";

/**
 * Imports
 */

import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { segment } from "../../js/segment_btn.js";
import { photoCard } from "../../js/photo_card.js";
import { videoCard } from "../../js/video_card.js";



/**
 * favorite segement  button
 */

const favoriteSegment = document.querySelector("[data-segment='favorite']");
let favType = "photos";

segment(favoriteSegment, segmentValue => {
    favType = segmentValue;
    
    $favGrid.innerHTML = "";
    favGrid = gridInit($favGrid);
    loadFav(favType, favGrid);
});



/**
 * Load favorite items
 */

const $favGrid = document.querySelector("[data-fav-grid]");
let favGrid = gridInit($favGrid);
const favData = JSON.parse(window.localStorage.getItem("favorite"));

const loadFav = function (type, favGridItem){

    Object.values(favData[type]).forEach(item => {
        
        if(type === "photos"){

            const $photoCard = photoCard(item);

            updateGrid($photoCard, favGridItem.columnsHeight, favGridItem.columns);

        } else {

            const $videoCard = videoCard(item);

            updateGrid($videoCard, favGridItem.columnsHeight, favGridItem.columns);

        }

    });

};


loadFav(favType, favGrid);

