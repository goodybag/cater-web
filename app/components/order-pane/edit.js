import React, {Component} from 'react';

import {Order} from '../../models/order';

export class OrderPaneInfoEditComponent extends Component {
    static propTypes = {
        order: Order.propType.isRequired,
        onSaveInfo: React.PropTypes.func.isRequired
    }

    componentWillMount() {
        const {order} = this.props;
        const {guests, datetime} = order.attributes;
        const address = order.displayAddress();

        this.setState({changes: {address, guests, datetime}});
    }

    saveInfo = () => {
        const {onSaveInfo} = this.props;
        const {address, guests, datetime} = this.state;

        onSaveInfo({address, guests, datetime});
    }

    handleAddressChange = (event) => {
        const {target: {value}} = event;

        this.setState({address: value});
    }

    handleTimeChange = (event) => {
        const {target: {value}} = event;

        this.setState({datetime: value});
    }

    handleGuestsChange = (event) => {
        const {target: {value}} = event;

        this.setState({guests: value});
    }

    render() {
        const {address, guests, datetime} = this.state;

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
                        <input
                            type="datetime"
                            value={datetime}
                            onChange={this.handleTimeChange}
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

                <div className="gb-order-pane-info-edit-save" onClick={this.saveInfo}>
                    Save Order Info
                </div>
            </div>
        );
    }
}
