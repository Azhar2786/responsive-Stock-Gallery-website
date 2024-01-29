"use strict";


/**
 * Import
 */


import { client } from "../../js/api_configure.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { photoCard } from "../../js/photo_card.js";
import { videoCard } from "../../js/video_card.js";
import { urlDecode } from "../../js/utils/urlDecode.js";


/**
 * Render  collection medias
 */


const $collectionGrid = document.querySelector("[data-collection-grid]");
const title = document.querySelector("[data-title]");
const /** {Object} */ collectionGrid = gridInit($collectionGrid);
const perPage = 30;
let currentPage = 1;
let totalPage = 0;
// console.log(window.location.search);
const /** {Object} */ collectionObj = urlDecode(window.location.search.slice(1));

// console.log(collectionObj);

title.textContent = `${collectionObj.title} collections`;
document.title = `${collectionObj.title} collections`;


const loadCollection = function (page) {

    client.collections.detail(collectionObj.collectionId, { per_page: perPage, page: page}, data => {

        // console.log(data);

        totalPage = Math.ceil(data.total_results / perPage);
        
        data.media.forEach(item => {
            
            let $card;

            switch (item.type.toLowerCase()) {
                case "photo":
                    $card = photoCard(item);
                    break;
                case "video":
                    $card = videoCard(item);
                    break;
            }

            updateGrid($card, collectionGrid.columnsHeight, collectionGrid.columns);

            // When content is loaeded
            isLoaded = true;
            // when no more content found, hide loader
            (currentPage >= totalPage) && (loader.style.display  = "none");

        });

    });


}

loadCollection(currentPage);


/**
 * Laod more collections
 */

const loader = document.querySelector("[data-loader");
let isLoaded = true;

window.addEventListener("scroll", function () {

    // console.log(loader.getBoundingClientRect().top);

    if(loader.getBoundingClientRect().top < (window.innerHeight * 2) && currentPage <= totalPage && isLoaded){
        currentPage++;
        loadCollection(currentPage);
        isLoaded = false;
    }

});