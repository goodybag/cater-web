import React, {Component, PropTypes} from 'react';
import {inject} from 'yokohama';
import cx from 'classnames';
import {findDOMNode} from 'react-dom';

import {OrderStore} from '../../stores/order';
import {Order} from '../../models/order';
import {ShareOrderModal} from '../share-order-modal';
import {ModalState} from '../../lib/modal';
import {Config} from '../../lib/config';

@inject({
    modals: ModalState,
    config: Config
})
export class OrderPaneShareComponent extends Component {
    static propTypes = {
        order: PropTypes.instanceOf(Order),
        disabled: PropTypes.bool.isRequired
    };

    static defaultProps = {
        disabled: false
    };


    static getShareLinkUrl(baseUrl, order) {
        return `${baseUrl}/restaurants/${order.restaurant.text_id}?edit_token=${order.edit_token}`;
    }

    constructor(props, context) {
        super(props, context);

        this.onShareOrderClick = this.onShareOrderClick.bind(this);
    }

    handleClick = () => {
        const {gbOrderPaneShareLinkbox} = this.refs;
        const node = findDOMNode(gbOrderPaneShareLinkbox);

        // TODO: look into this
        node.focus();
        node.setSelectionRange(0, node.value.length);
    };

    render() {
        const {disabled, order, config} = this.props;
        const url = OrderPaneShareComponent.getShareLinkUrl(config.baseUrl, order);

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

                    <div
                        href="/"
                        className="gb-order-pane-share-email"
                        onClick={this.onShareOrderClick}
                    >
                        Share order by email
                    </div>
                </div>
            </div>
        );
    }

    onShareOrderClick() {
        this.props.modals.open(ShareOrderModal);
    }
}
