
"use strict";


/**
 * Convert Url tto Object
 * @param {String} urlString Url string
 * @returns {Object} Url object
 */

export const urlDecode = urlString => {
    // console.log(urlString);
    return Object.fromEntries(urlString.replace(/%23/g, "#").replace(/%23/g, " ").split("&").map(i => i.split("=")));
};