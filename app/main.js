import 'babel-polyfill';
import {load} from './lib/load';

const element = document.getElementById('gb-body');

window.addEventListener('unhandledrejection', event => {
    event.preventDefault();
    throw event.detail.reason;
});

load(element);
