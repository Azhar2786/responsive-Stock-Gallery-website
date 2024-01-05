
"use strict";

/**
 * Imports
 */

import { addEventOnElements } from "./utils/event.js";



export const segment = function ($segment, callback) {

    const segmentBtns = $segment.querySelectorAll("[data-segment-btn]");
    let lastSelectedSegmentBtn = $segment.querySelector("[data-segment-btn].selected");

    addEventOnElements(segmentBtns, "click", function () {
        lastSelectedSegmentBtn.classList.remove("selected");
        this.classList.add("selected");
        lastSelectedSegmentBtn = this;
        callback(this.dataset.segmentValue);
    });

    // segmentBtns.forEach(segmentBtn => {
    //     // add the event listener for each segmentBtn element
    //     segmentBtn.addEventListener("click", function () {
    //         lastSelectedSegmentBtn.classList.remove("selected");
    //         this.classList.add("selected");
    //         lastSelectedSegmentBtn = this;
    //         callback(this.dataset.segmentvalue);
    //     });
    // });

}