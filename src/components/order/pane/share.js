import React, {Component} from 'react';

import {Order} from '../../../models/order';

export class OrderPaneShareComponent extends Component {
    static contextTypes = {
        order: Order.propType
    }

    render() {
        const token = '14e4eeba-4509-11e5-ae0b-a8a54c5cf93c';
        const url = `https://example.com/some-url-here?token=${token}`;

        return (
            <div className="gb-order-pane-share">
                <input className="gb-order-pane-share-linkbox" value={url} readOnly/>
            </div>
        );
    }
}
