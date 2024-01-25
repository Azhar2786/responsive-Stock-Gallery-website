
"use strict";



/**
 * Import
 */

import { ripple } from "./utils/ripple.js";
import { favorite } from "./favorite.js";

/**
 * Create photo card
 * @param {Object} photo Photo object
 * @returns Photo card
 */

export const photoCard = photo => {

    /** String */
    const root = window.location.origin;
    // console.log(photo);

    const {
        alt,
        avg_color: backdropColor,
        width,
        height,
        id,
        // photographer,
        src: { large }
    } = photo;

    const card = document.createElement("div");
    card.classList.add("card", "grid-item");
    card.style.backgroundColor = backdropColor;

    const favoriteObj = JSON.parse(window.localStorage.getItem("favorite"));

    card.innerHTML = `
    <figure class="card-banner" style="--width: ${width}; --height: ${height};">
        <img src="${large}" alt=""
        width="${width}" height="${height}" loading="lazy" alt="${alt}" class="img-cover">
    </figure>

    <div class="card-content">


        <button class="icon-btn small ${favoriteObj.photos[id] ? "active" : ""} " aria-label="Add to favorite" data-ripple data-favorite-btn>
            <span class="material-symbols-outlined" aria-hidden="true">favorite</span>

            <div class="state-layer"></div>
        </button>

    </div>

    <a href="${root}/pages/photos/photo_detail.html?id=${id}" class="state-layer"></a>    
    `;

    const cardBanner = card.querySelector("img");

    cardBanner.style.opacity = 0;

    cardBanner.addEventListener("load", function () {
        this.animate({
            opacity: 1
        }, {duration: 400, fill: "forwards"})
    });

    const rippleElems = [card, card.querySelector("[data-ripple]")];

    rippleElems.forEach(rippleElem => ripple(rippleElem));

    const favoriteBtn = card.querySelector("[ data-favorite-btn]");

    favorite(favoriteBtn, "photos", id);

    return card;
}