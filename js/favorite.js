
"use strict";

/**
 * Import
 */

import { client } from "./api_configure.js";


/**
 * Add to favorte and remove from favorite
 * @param {*} element 
 * @param {*} type item type eg. 'photos' or 'videos'
 * @param {*} id item id
 */


export const favorite = (element, type, id) =>{
    element.addEventListener("click", () =>{

        element.setAttribute("disabled", "");
        const favoriteObj = JSON.parse(window.localStorage.getItem("favorite"));

        if(favoriteObj[type][id]){
            element.classList.toggle("active");
            element.removeAttribute("disabled");

            delete favoriteObj[type][id];

            window.localStorage.setItem("favorite", JSON.stringify(favoriteObj));
        } else {
            client[type].detail(id, data =>{
                element.classList.toggle("active");
                element.removeAttribute("disabled");

                favoriteObj[type][id] = data;

                window.localStorage.setItem("favorite", JSON.stringify(favoriteObj));
            });
        }

    });
}