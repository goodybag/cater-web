import React, {Component, PropTypes} from 'react';
import {FormattedDate, FormattedTime} from 'react-intl';
import {Dispatcher} from 'flux';
import {inject} from 'yokohama';
import {listeningTo} from 'tokyo';

import {OrderStore} from '../../stores/order';
import {Order} from '../../models/order';
import {UpdateOrderAction} from '../../actions/order';
import {OrderPaneInfoEditComponent} from './edit';

@inject({
    dispatcher: Dispatcher,
    orderStore: OrderStore
})
@listeningTo([OrderStore], ({orderStore}) => {
    return {
        order: orderStore.getOrder()
    };
})
export class OrderPaneInfoComponent extends Component {
    static propTypes = {
        dispatcher: PropTypes.instanceOf(Dispatcher).isRequired,
        order: PropTypes.instanceOf(Order).isRequired
    }

    state = {
        editing: false
    }

    startEditing = () => {
        this.setState({editing: true});
    }

    // popsolopsopacalous

    stopEditing = ({changes}) => {
        const {dispatcher, order} = this.props;

        dispatcher.dispatch(new UpdateOrderAction({order, changes}));
        this.setState({editing: false});
    }

    renderBody() {
        const {order} = this.props;
        const {editing} = this.state;

        if (editing) {
            return (
                <OrderPaneInfoEditComponent
                    order={order}
                    onSaveInfo={this.stopEditing}
                />
            );
        } else {
            return (
                <OrderPaneInfoShowComponent
                    order={order}
                    onStartEditing={this.startEditing}
                />
            );
        }
    }

    render() {
        const body = this.renderBody();

        return (
            <div className="gb-order-pane-info">{body}</div>
        );
    }
}

export class OrderPaneInfoShowComponent extends Component {
    static propTypes = {
        order: PropTypes.instanceOf(Order).isRequired,
        onStartEditing: PropTypes.func.isRequired
    }

    render() {
        const {order, onStartEditing: startEditing} = this.props;
        const {guests} = order.attributes;
        const datetime = order.getDatetimeMoment();
        const address = order.displayAddress();

        return (
            <div className="gb-order-pane-info-show">
                <div className="gb-order-pane-info-location">
                    <i className="icon-locationpin"></i>
                    {address}
                </div>

                <div className="gb-order-pane-info-date">
                    <i className="icon-calendar"></i>
                    <FormattedDate value={datetime}/>
                </div>

                <div className="gb-order-pane-info-time">
                    <i className="icon-clock"></i>
                    <FormattedTime value={datetime} format="hhmma"/>
                </div>

                <div className="gb-order-pane-info-guests">
                    <i className="icon-profile"></i>
                    {guests}
                </div>

                <div
                    className="gb-order-pane-info-editbutton"
                    onClick={startEditing}>
                    Edit
                </div>
            </div>
        );
    }
}
