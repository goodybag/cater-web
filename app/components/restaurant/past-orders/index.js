import React, {Component, PropTypes} from 'react';
import {inject} from 'yokohama';
import {listeningTo} from 'tokyo';

import {RestaurantStore} from '../../../stores/restaurant';
import {Restaurant} from '../../../models/restaurant';
import {RestaurantOrdersRowComponent} from './row';
import {RestaurantOrdersAlertComponent} from './alert';

@inject({
    restaurantStore: RestaurantStore
})
@listeningTo([RestaurantStore], props => {
    const {restaurantStore} = props;

    return {
        restaurant: restaurantStore.getRestaurant()
    };
})

export class RestaurantOrdersComponent extends Component {
    static propTypes = {
        restaurant: PropTypes.instanceOf(Restaurant)
    };

    state = {
        alertOpen: false,
        message: ""
    };

    signalAlertOpen = (action) => {
        this.setState({
            alertOpen: true
        });

        if(action==="resume") {
            this.setState({
                message: "This order has been resumed."
            });
        }

        if(action==="uncancel") {
            this.setState({
                message: "This order has been restored to a Draft."
            });
        }

        if(action==="view") {
            this.setState({
                message: "This order is currently being viewed."
            });
        }

        if(action==="duplicate") {
            this.setState({
                message: "This order has been duplicated."
            });
        }

        if(action==="cancel") {
            this.setState({
                message: "This order has been canceled."
            });
        }
    };

    signalAlertClose = () => {
        this.setState({
            alertOpen: false
        });
    };


    render() {
        const {restaurant} = this.props;
        const {signalAlertOpen, signalAlertClose} = this;
        let {alertOpen, message} = this.state

        // TODO: replace with model data
        var restaurantName = "Austin Daily Press";
        const pastOrders = [
            {
                id: 7630,
                status: "canceled",
                datetime: "2015-03-27 11:15:00",
                timezone: "America/Chicago",
                total: 15073
            },
            {
                id: 800,
                status: "accepted",
                datetime: "2014-03-05 11:30:00",
                timezone: "America/Chicago",
                total: 16259
            },
            {
                id: 10089,
                status: "pending",
                datetime: "2015-06-09 12:30:00",
                timezone: "America/Chicago",
                total: 7900
            },
            {
                id: 864,
                status: "accepted",
                datetime: "2014-03-09 11:30:00",
                timezone: "America/Chicago",
                total: 28406
            },
            {
                id: 11801,
                status: "canceled",
                datetime: "2015-07-29 11:30:00",
                timezone: "America/Chicago",
                total: 1999
            },
            {
                id: 11235,
                status: "pending",
                datetime: "2015-07-29 11:15:00",
                timezone: "America/Chicago",
                total: 27063
            },
            {
                id: 9209,
                status: "submitted",
                datetime: "2015-05-14 12:00:00",
                timezone: "America/Chicago",
                total: 11691
            }
        ];

        return (
            <div className="gb-restaurant-orders">
                <div className="gb-restaurant-orders-title">
                    Past Orders at {restaurantName}
                </div>
                {
                    alertOpen ?
                        <RestaurantOrdersAlertComponent
                            message={message}
                            initAlertState={alertOpen}
                            signalAlertClose={signalAlertClose}
                        /> : ""
                }
                <div className="gb-restaurant-orders-table">
                    <div className="gb-restaurant-orders-row-head">
                        <div className="gb-restaurant-orders-row-group-first">
                            <div className="gb-restaurant-orders-col-status">Status</div>
                            <div className="gb-restaurant-orders-col-date">Delivery Date</div>
                            <div className="gb-restaurant-orders-col-time">Delivery Time</div>
                            <div className="gb-restaurant-orders-col-total">Total</div>
                        </div>
                    </div>
                    <div className="gb-restaurant-orders-table-body">
                        {pastOrders.map(renderPastOrderItem)}
                    </div>
                </div>
            </div>
        );

        function renderPastOrderItem(order) {
            return (
                <RestaurantOrdersRowComponent
                    key={order.id}
                    status={order.status}
                    datetime={order.datetime}
                    timezone={order.timezone}
                    total={order.total}
                    initAlertState={alertOpen}
                    signalAlertOpen={signalAlertOpen}
                />
            );
        }
    }
}
