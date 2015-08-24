import React, {Component} from 'react';

import {Order} from '../../../models/order';

export class OrderPaneShareComponent extends Component {
    static propTypes = {
        order: Order.propType.isRequired
    }

    handleClick = () => {
        const {gbOrderPaneShareLinkbox} = this.refs;
        const node = React.findDOMNode(gbOrderPaneShareLinkbox);

        // TODO: look into this
        node.focus();
        node.setSelectionRange(0, node.value.length);
    }

    render() {
        const token = '14e4eeba-4509-11e5-ae0b-a8a54c5cf93c';
        const url = `https://example.com/some-url-here?token=${token}`;

        return (
            <div
                className="gb-order-pane-share"
                onClick={this.handleClick}>

                <input
                    ref="gbOrderPaneShareLinkbox"
                    className="gb-order-pane-share-linkbox"
                    value={url}
                    readOnly
                />
            </div>
        );
    }
}
