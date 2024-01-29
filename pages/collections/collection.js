"use strict";


/**
 * Import
 */


import { client } from "../../js/api_configure.js";
import { collectionCard } from "../../js/collection_card.js";


/**
 * Render featured collections
 */


const collectionGrid = document.querySelector("[data-collection-grid]");
const perPage = 36;
let currentPage = 1;
let totalPage = 0;


/**
 * @param {*} page page number
 */


const loadCollections = function (page) {

    client.collections.featured({ per_page: perPage, page: page}, data => {
            
        totalPage = Math.ceil(data.total_results / perPage);

        data.collections.forEach(collection => {
            
            const $collectionCard = collectionCard(collection);

            collectionGrid.appendChild($collectionCard);

        });

        // When content is loaeded
        isLoaded = true;

        // when no more content found, hide loader
        (currentPage >= totalPage) && (loader.style.display  = "none");
        

    });

}

loadCollections(currentPage);



/**
 * Load more collectoons
 */

const loader = document.querySelector("[data-loader]");
let isLoaded = false;

const loadMore = function() {
    if(loader.getBoundingClientRect().top < (window.innerHeight * 2) &&
    currentPage <= totalPage && isLoaded) {

        currentPage++;
        loadCollections(currentPage);
        isLoaded = false;

    }
};

window.addEventListener("scroll", loadMore);