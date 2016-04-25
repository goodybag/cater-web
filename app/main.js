import 'babel-polyfill';
import {load} from './lib/load';

const element = document.getElementById('gb-body');

window.addEventListener('unhandledrejection', event => {
    event.preventDefault();

    alert('An expected error occured! Please refresh the page and trying again');

    throw event.detail.reason;
});

load(element);
