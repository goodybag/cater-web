/**
 * Utilities for working with DOM events
 */


/** Backwards-compatible preventDefault call */
export function preventDefault(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}

/** Backwards-compatible stopPropogation call */
export function stopPropogation(event) {
    if (event.stopPropogation) {
        event.stopPropogation();
    } else {
        event.cancelBubble = true;
    }
}
