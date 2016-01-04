import React from 'react';
import {render} from 'react-dom';
import Promise from 'bluebird';

import {ErrorComponent} from '../components/error';

/**
 * Utility for reporting errors in the
 * client-side context
 */
export function handleError(err, element) {
    return Promise.try(() => {
        setImmediate(() => {
            throw err;
        });

        element.innerHTML = '';

        return Promise.fromNode(cb => {
            render(<ErrorComponent error={err}/>, element, cb);
        });
    });
}
