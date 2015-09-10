import React, {Component} from 'react';
import {Dispatcher} from 'flux';

import {UpdateOrderAction} from '../../actions/order';
import {Order} from '../../models/order';
import {OrderPaneInfoEditComponent} from './edit';

export class OrderPaneInfoComponent extends Component {
    static propTypes = {
        order: Order.propType.isRequired
    }

    static dependencies = {
        dispatcher: Dispatcher
    }

    static contextTypes = {
        dependencies: React.PropTypes.object.isRequired
    }

    state = {
        editing: false
    }

    startEditing = () => {
        this.setState({editing: true});
    }

    // popsolopsopacalous

    stopEditing = ({changes}) => {
        const {dispatcher} = this.context;
        const {order} = this.props;

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
        order: Order.propType.isRequired,
        onStartEditing: React.PropTypes.func.isRequired
    }

    startEditing = () => {
        const {onStartEditing} = this.props;

        onStartEditing();
    }

    render() {
        const {order, onStartEditing} = this.props;
        const {guests, datetime} = order.attributes;
        const address = order.displayAddress();

        return (
            <div className="gb-order-pane-info-show">
                <div className="gb-order-pane-info-location">
                    {address}
                </div>

                <div className="gb-order-pane-info-time">
                    {datetime}
                </div>

                <div className="gb-order-pane-info-guests">
                    {guests}
                </div>

                <div className="gb-order-pane-info-editbutton" onClick={this.startEditing}>
                    Edit
                </div>
            </div>
        );
    }
}
