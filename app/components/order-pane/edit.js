import React, {Component, PropTypes} from 'react';
import {DatePickerComponent} from '@goodybag/react-pickadate';

import {Order} from '../../models/order';
import {Restaurant} from '../../models/restaurant';

export class OrderPaneInfoEditComponent extends Component {
    static propTypes = {
        order: PropTypes.instanceOf(Order).isRequired,
        restaurant: PropTypes.instanceOf(Restaurant).isRequired,
        onSaveInfo: PropTypes.func.isRequired
    };

    componentWillMount() {
        const {order} = this.props;
        const {guests, datetime} = order;
        const address = order.displayAddress();

        this.setState({changes: {address, guests, datetime}});
    }

    handleSaveInfo = () => {
        const {onSaveInfo: saveInfo} = this.props;
        const {address, guests, datetime} = this.state;

        saveInfo({address, guests, datetime});
    };

    handleAddressChange = (event) => {
        const {target: {value}} = event;

        this.setState({address: value});
    };

    handleDateChange = (date) => {
        this.setState(({datetime}) => {
            return {};
        });
    };

    handleTimeChange = (event) => {
        const {target: {value}} = event;

        this.setState({datetime: value});
    };

    handleGuestsChange = (event) => {
        const {target: {value}} = event;

        this.setState({guests: value});
    };

    render() {
        const {address, guests, datetime} = this.state;
        const {restaurant} = this.props;

        return (
            <div className="gb-order-pane-info-edit">
                <div className="gb-order-pane-info-edit-location">
                    <div className="gb-order-pane-info-edit-text">
                        Full address (street, city, state, zip)
                    </div>
                    <div className="gb-order-pane-info-edit-input">
                        <i className="icon-locationpin"></i>
                        <input
                            type="text"
                            value={address}
                            onChange={this.handleAddressChange}
                            className="gb-order-pane-info-edit-box"
                        />
                    </div>
                </div>

                <div className="gb-order-pane-info-edit-date">
                    <div className="gb-order-pane-info-edit-text">
                        Delivery date
                    </div>
                    <div className="gb-order-pane-info-edit-input">
                        <i className="icon-calendar"></i>

                        <DatePickerComponent
                            onSelect={this.handleDateChange}
                            date={datetime || new Date()}
                            className="gb-order-pane-info-edit-box"
                        />
                    </div>
                </div>

                <div className="gb-order-pane-info-edit-time">
                    <div className="gb-order-pane-info-edit-text">
                        Delivery time
                    </div>
                    <div className="gb-order-pane-info-edit-input">
                        <i className="icon-clock"></i>
                        <input
                            type="datetime"
                            value={datetime}
                            onChange={this.handleTimeChange}
                            className="gb-order-pane-info-edit-box"
                        />
                    </div>
                </div>

                <div className="gb-order-pane-info-edit-guests">
                    <div className="gb-order-pane-info-edit-text">
                        Guests
                    </div>
                    <div className="gb-order-pane-info-edit-input">
                        <i className="icon-profile"></i>
                        <input
                            type="number"
                            value={guests}
                            onChange={this.handleGuestsChange}
                            className="gb-order-pane-info-edit-box"
                        />
                    </div>
                </div>

                <div className="gb-order-pane-info-edit-save" onClick={this.handleSaveInfo}>
                    Save Order Info
                </div>
            </div>
        );
    }
}
