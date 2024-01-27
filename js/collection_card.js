
"use strict";

/**
 * Import
 */

import { ripple } from "./utils/ripple.js";


/**
 * Create collection card
 * @param {Object} collection Collection object
 * @return {Node} Collection card
 */


export const collectionCard = collection => {

    const root = window.location.origin;

    console.log(collection);

    const {
        id,
        title,
        media_count
    } = collection; 

    const card = document.createElement("div");
    card.classList.add("grid-card", "two-line", "list-item");
    card.setAttribute("title", title);

    card.innerHTML = `
        <div>
            <h3 class="body-large">${title}</h3>

            <p class="body-medium label">${media_count} media</p>
        </div>

        <a href="${root}/pages/collections/collection_detail.html?collectionId=${id}&title=${title}" class="state-layer"></a>
    `;

    return card;

}