import React, {Component} from 'react';
import {Dispatcher} from 'flux';

import {UpdateOrderAction} from '../../actions/order';
import {Order} from '../../models/order';
import {OrderPaneInfoEditComponent} from './edit';
import {OrderPaneDateTimeComponent} from './datetime';

export class OrderPaneInfoComponent extends Component {
    static propTypes = {
        order: Order.propType.isRequired
    }

    static contextTypes = {
        dependencies: React.PropTypes.object.isRequired
    }

    static dependencies = {
        dispatcher: Dispatcher
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

    returnDate = (datetime) => {
        const date = new Date(datetime);

        return (
            date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear()
        );
    }

    returnTime = (date) => {
        return (
            date.getHours() + ":" + date.getMinutes()
        );
    }

    render() {
        const {order} = this.props;
        const {guests, datetime, timezone} = order.attributes;
        const address = order.displayAddress();
        const {returnDate} = this;
        const {returnTime} = this;

        return (
            <div className="gb-order-pane-info-show">
                <div className="gb-order-pane-info-location">
                    <i className="icon-locationpin"></i>
                    {address}
                </div>

                <div className="gb-order-pane-info-date">
                    <i className="icon-calendar"></i>
                        <OrderPaneDateTimeComponent
                            datetime={datetime}
                            timezone={timezone}
                            displayDate={true}
                        />
                </div>

                <div className="gb-order-pane-info-time">
                    <i className="icon-clock"></i>
                    <OrderPaneDateTimeComponent
                        datetime={datetime}
                        timezone={timezone}
                        displayTimeRange={true}
                    />
                </div>

                <div className="gb-order-pane-info-guests">
                    <i className="icon-profile"></i>
                    {guests}
                </div>

                <div className="gb-order-pane-info-editbutton" onClick={this.startEditing}>
                    Edit
                </div>
            </div>
        );
    }
}
