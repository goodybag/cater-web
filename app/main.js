import 'babel-polyfill';
import {load} from './lib/load';

const element = document.getElementById('gb-body');

window.addEventListener('unhandledrejection', event => {
    event.preventDefault();

    throw event.detail.reason;
});

window.addEventListener('error', event => {
    window.alert('An unexpected error occured! Please refresh the page or inspect the error with alt+cmd+j');
});

load(element);
