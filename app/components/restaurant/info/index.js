import React, {Component} from 'react';

import {RestaurantResolver} from '../../../models/restaurant';
import {RestaurantGmapComponent} from './gmap';

export class RestaurantInfoComponent extends Component {
    static contextTypes = {
        dependencies: React.PropTypes.object.isRequired
    }

    static dependencies = {
        restaurant: RestaurantResolver
    }

    render() {
        const {dependencies} = this.context;
        const {restaurant} = dependencies;

        const {
            cuisine,
            price,
            minimum_order,
            street,
            city,
            state,
            zip,
            websites
        } = restaurant.attributes;

        const hours = [
            {day: 'Monday', time: '11:00 am — 9:00 pm'},
            {day: 'Tuesday', time: '11:00 am — 9:00 pm'},
            {day: 'Wednesday', time: '11:00 am — 9:00 pm'},
            {day: 'Thursday', time: '11:00 am — 9:00 pm'},
            {day: 'Friday', time: '11:00 am — 9:00 pm'},
            {day: 'Saturday', time: '11:00 am — 9:00 pm'},
            {day: 'Sunday', time: '11:00 am — 9:00 pm'}
        ];

        const leadTimes = [
            {guests: 30, hours: 16},
            {guests: 50, hours: 24},
            {guests: 100, hours: 36},
            {guests: 200, hours: 48}
        ];

        return (
            <div className="gb-restaurant-info">
                <div className="gb-restaurant-info-left">
                    <RestaurantInfoSectionComponent>
                        {cuisine} &bull; <PriceComponent price={price}/>
                    </RestaurantInfoSectionComponent>

                    <RestaurantInfoSectionComponent>
                        <RestaurantInfoHeaderComponent>
                            Delivery Hours
                        </RestaurantInfoHeaderComponent>

                        <table>
                            <tbody>{hours.map(renderHour)}</tbody>
                        </table>
                    </RestaurantInfoSectionComponent>

                    <RestaurantInfoSectionComponent>
                        <RestaurantInfoHeaderComponent>
                            Lead Times
                        </RestaurantInfoHeaderComponent>

                        <table>
                            <tbody>{leadTimes.map(renderLeadTime)}</tbody>
                        </table>
                    </RestaurantInfoSectionComponent>

                    <RestaurantInfoSectionComponent>
                        <RestaurantInfoHeaderComponent>
                            Order Minimum
                        </RestaurantInfoHeaderComponent>

                        {minimum_order ? minimum_order : 'None'}
                    </RestaurantInfoSectionComponent>

                    <RestaurantInfoSectionComponent>
                        <RestaurantInfoHeaderComponent>
                            Max Guests
                        </RestaurantInfoHeaderComponent>

                        500
                    </RestaurantInfoSectionComponent>
                </div>

                <div className="gb-restaurant-info-right">
                    <RestaurantInfoSectionComponent>
                        <RestaurantGmapComponent />
                    </RestaurantInfoSectionComponent>

                    <RestaurantInfoSectionComponent>
                        <RestaurantInfoHeaderComponent>
                            Address
                        </RestaurantInfoHeaderComponent>

                        <div>{street}</div>
                        <div>{city}, {state} {zip}</div>
                    </RestaurantInfoSectionComponent>

                    <RestaurantInfoSectionComponent>
                        <RestaurantInfoHeaderComponent>
                            Phone
                        </RestaurantInfoHeaderComponent>

                        <div>Give us a call to place an order here!</div>
                        <div>512-270-6555</div>
                    </RestaurantInfoSectionComponent>

                    <RestaurantInfoSectionComponent>
                        <RestaurantInfoHeaderComponent>
                            Website
                        </RestaurantInfoHeaderComponent>

                        {websites.map(renderWebsite)}
                    </RestaurantInfoSectionComponent>
                </div>
            </div>
        );

        function renderHour({day, time}) {
            return (
                <tr key={day}>
                    <td>{day}</td>
                    <td>{time}</td>
                </tr>
            );
        }

        function renderLeadTime({guests, hours}) {
            return (
                <tr key={guests}>
                    <td>Up to {guests} guests</td>
                    <td>{hours} hrs</td>
                </tr>
            );
        }

        function renderWebsite(website) {
            return (
                <a key={website} href={website}>{website}</a>
            );
        }
    }
}

class RestaurantInfoSectionComponent extends Component {
    static propTypes = {
        children: React.PropTypes.node
    }

    render() {
        const {children} = this.props;

        return (
            <div className="gb-restaurant-info-section">
                {children}
            </div>
        );
    }
}

class RestaurantInfoHeaderComponent extends Component {
    static propTypes = {
        children: React.PropTypes.node
    }

    render() {
        const {children} = this.props;

        return (
            <div className="gb-restaurant-info-header">
                {children}
            </div>
        );
    }
}

class PriceComponent extends Component {
    static propTypes = {
        price: React.PropTypes.number.isRequired
    }

    render() {
        const {price} = this.props;

        const dollars = [1, 2, 3, 4].map(renderValue);

        return (
            <div className="gb-price">{dollars}</div>
        );

        function renderValue(value) {
            if (value <= price) {
                return <div key={value} className="gb-price-fill">$</div>;
            } else {
                return <div key={value} className="gb-price-empty">$</div>;
            }
        }
    }
}
