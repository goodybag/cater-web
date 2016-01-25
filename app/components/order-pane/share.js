import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import {findDOMNode} from 'react-dom';

import {OrderStore} from '../../stores/order';
import {Order} from '../../models/order';

export class OrderPaneShareComponent extends Component {
    static propTypes = {
        order: PropTypes.instanceOf(Order),
        disabled: PropTypes.bool.isRequired
    };

    static defaultProps = {
        disabled: false
    };

    handleClick = () => {
        const {gbOrderPaneShareLinkbox} = this.refs;
        const node = findDOMNode(gbOrderPaneShareLinkbox);

        // TODO: look into this
        node.focus();
        node.setSelectionRange(0, node.value.length);
    };

    render() {
        const {disabled} = this.props;
        const token = '14e4eeba-4509-11e5-ae0b-a8a54c5cf93c';
        const url = `https://example.com/some-url-here?token=${token}`;

        const set = cx('gb-order-pane-share', {
            'gb-order-pane-share-disabled': disabled
        });

        return (
            <div className={set} onClick={this.handleClick}>
                <div className="gb-order-pane-share-desc">
                    Let others add their own food by sharing this order:
                </div>

                <div className="gb-order-pane-share-box">
                    <div className="gb-order-pane-share-head">
                        <i className="icon-link"></i>
                        Send link to others:
                    </div>

                    <input
                        ref="gbOrderPaneShareLinkbox"
                        className="gb-order-pane-share-linkbox"
                        value={url}
                        readOnly
                    />
                </div>

                <div className="gb-order-pane-share-box">
                    <div className="gb-order-pane-share-head">
                        <i className="icon-email2"></i>
                        Or invite by email:
                    </div>

                    <a href="/" className="gb-order-pane-share-email">
                        Share order by email
                    </a>
                </div>
            </div>
        );
    }
}
