
"use strict";

import { urlEncode } from "./urlEncode.js";

/**
 * Update url
 * @param {Object} filterObj filter obj
 * @param {String} searchType search type eg. 'videos' or 'photos'
 */


export const updateUrl = (filterObj, searchType) => {
    setTimeout(() =>{
        const root = window.location.origin;
        // console.log(filterObj);
        // console.log(searchType);
        const searchQuery = urlEncode(filterObj);
        
        window.location = `${root}/pages/${searchType}/${searchType}.html?${searchQuery}`;
        // console.log(searchQuery);
        // console.log(`${root}/pages/${searchType}/${searchType}.html?${searchQuery}`);
    }, 500);
}