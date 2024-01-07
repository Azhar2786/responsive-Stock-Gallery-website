
"use strict";

/**
 * Convert Object to Url 
 * @param {*} urlObj url object
 * @returns  url String
 */

export const urlEncode = urlObj => {
    return Object.entries(urlObj).join("&").replace(/,/g, "=").replace(/#/g, "%23");
}