import React, {Component} from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

export function setupElement(element) {
    // This will be expanded to include context
    // references like dispatcher and spy.
    const component = TestUtils.renderIntoDocument(element);

    return {component};
}
