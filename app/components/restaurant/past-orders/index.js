import React, {Component} from 'react';

import {RestaurantResolver} from '../../../models/restaurant';
import {RestaurantOrdersRowComponent} from './row';

export class RestaurantOrdersComponent extends Component {
    static dependencies = {}

    render() {
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
                <table className="gb-restaurant-orders-table">
                    <thead className="gb-restaurant-orders-thead">
                        <tr>
                            <th>STATUS</th>
                            <th>DELIVERY DATE</th>
                            <th>DELIVERY TIME</th>
                            <th>TOTAL</th>
                            <th>{/* Expired */}</th>
                            <th>{/* Resume */}</th>
                            <th>{/* View */}</th>
                            <th>{/* Duplicate */}</th>
                            <th>{/* Cancel */}</th>
                        </tr>
                    </thead>
                    <tbody className="gb-restaurant-orders-tbody">
                        {pastOrders.map(renderPastOrderItem)}
                    </tbody>
                </table>
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
                />
            );
        }
    }
}
