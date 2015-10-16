export function preventDefault(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}

export function stopPropogation(event) {
    if (event.stopPropogation) {
        event.stopPropogation();
    } else {
        event.cancelBubble = true;
    }
}
