import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {bind} from 'lodash-decorators';
import {inject} from 'yokohama';
import {Dispatcher} from 'flux';
import {listeningTo} from 'tokyo';

import {MenuItem} from '../../../models/menu-item';
import {AddItemToOrderAction} from '../../../actions/menu';

@inject({
    dispatcher: Dispatcher
})
export class RestaurantMenuItemMenuComponent extends Component {
    static propTypes = {
        item: PropTypes.instanceOf(MenuItem).isRequired,
        dispatcher: PropTypes.instanceOf(Dispatcher).isRequired,
        onClose: PropTypes.func.isRequired
    }

    @bind()
    handleAddClick() {
        const {dispatcher, item} = this.props;

        dispatcher.dispatch(new AddItemToOrderAction(item));
    }

    render() {
        const {item, onClose: close} = this.props;
        const {description, min_qty} = item;

        return (
            <div className="gb-restaurant-menu-item-menu">
                <div className="gb-restaurant-menu-item-menu-desc">
                    {description}
                </div>

                <div className="gb-restaurant-menu-item-menu-notes">
                    <div className="gb-restaurant-menu-item-menu-box-title">
                        Comments or Instructions
                    </div>

                    <textarea
                        className="gb-restaurant-menu-item-menu-box-field"
                    />
                </div>

                <div className="gb-restaurant-menu-item-menu-bottomfields">
                    <div className="gb-restaurant-menu-item-menu-quantity">
                        <div className="gb-restaurant-menu-item-menu-box-title">
                            Quantity
                        </div>

                        <input
                            className="gb-restaurant-menu-item-menu-box-field"
                            type="number"
                            defaultValue={min_qty || 1}
                        />
                    </div>

                    <div className="gb-restaurant-menu-item-menu-buttons">
                        <div className="gb-restaurant-menu-item-menu-cancel" onClick={close}>
                            Cancel
                        </div>

                        <div className="gb-restaurant-menu-item-menu-addtoorder" onClick={this.handleAddClick}>
                            Add to order
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export class RestaurantMenuItemMenuWrapperComponent extends Component {
    componentWillEnter(done) {
        const {wrapper, child} = this.refs;
        const node = findDOMNode(child);

        wrapper.style.height = `${node.clientHeight}px`;
        setTimeout(done, 200);
    }

    componentWillLeave(done) {
        const {wrapper} = this.refs;

        wrapper.style.height = 0;
        setTimeout(done, 200);
    }

    render() {
        return (
            <div className="gb-restaurant-menu-item-menu-wrapper" ref="wrapper">
                <RestaurantMenuItemMenuComponent ref="child" {...this.props}/>
            </div>
        );
    }
}
