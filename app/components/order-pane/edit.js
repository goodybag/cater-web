import React, {Component} from 'react';

import {Order} from '../../models/order';

export class OrderPaneInfoEditComponent extends Component {
    static propTypes = {
        order: Order.propType.isRequired,
        onSaveInfo: React.PropTypes.func.isRequired
    }

    saveInfo = () => {
        const {onSaveInfo} = this.props;
        const {address, guests, datetime} = this.state;;

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

    componentWillMount() {
        const {order} = this.props;
        const {guests, datetime} = order.attributes;
        const address = order.displayAddress();

        this.setState({changes: {address, guests, datetime}});
    }

    render() {
        const {address, guests, datetime} = this.state;

        return (
            <div className="gb-order-pane-info-edit">
                <div className="gb-order-pane-info-edit-location">
                    <input
                        type="text"
                        value={address}
                        onChange={this.handleAddressChange}
                    />
                </div>

                <div className="gb-order-pane-info-edit-time">
                    <input
                        type="datetime"
                        value={datetime}
                        onChange={this.handleTimeChange}
                    />
                </div>

                <div className="gb-order-pane-info-edit-guests">
                    <input
                        type="number"
                        value={guests}
                        onChange={this.handleGuestsChange}
                    />
                </div>

                <div className="gb-order-pane-info-edit-save" onClick={this.saveInfo}>
                    Save Order Info
                </div>
            </div>
        );
    }
}
