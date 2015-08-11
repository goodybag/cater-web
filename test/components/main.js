/* global describe, it */

import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import {setupElement} from '../util';

import {MainComponent} from '../../src/components/main';

describe('MainComponent', function() {
    it('should have "Hello world"', function() {
        const {component} = setupElement(<MainComponent/>);
        const {gbMain} = component.refs;

        expect(gbMain.props.children).toMatch(/Hello world/);
    });
});
