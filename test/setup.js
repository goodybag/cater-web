/* global before */

import {jsdom} from 'jsdom';

before(function() {
    // This is for virtually mounting React components
    global.document = jsdom('<html></html>');
    global.window = global.document.parentWindow;
});
