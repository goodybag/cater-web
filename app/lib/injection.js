import {Inject, InjectPromise, Provide, annotate} from 'di';

export function inject(...tokens) {
    const annotation = new Inject(...tokens);

    return decoratorFromAnnotation(annotation);
}

export function injectPromise(...tokens) {
    const annotation = new InjectPromise(...tokens);

    return decoratorFromAnnotation(annotation);
}

export function provide(...tokens) {
    const annotation = new Provide(...tokens);

    return decoratorFromAnnotation(annotation);
}

function decoratorFromAnnotation(annotation) {
    return annotator;

    function annotator(fn) {
        annotate(fn, annotation);
    }
}

export class Params {
    constructor() {
        throw new Error('woooo!');
    }
}
