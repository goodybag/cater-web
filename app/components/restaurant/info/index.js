import React, {Component} from 'react';

import {Restaurant} from '../../../models/restaurant';
import {RestaurantDollarsComponent} from './dollars';
import {RestaurantGmapComponent} from './gmap';

export class RestaurantInfoComponent extends Component {
    static propTypes = {
        restaurant: Restaurant.propType.isRequired
    }

    render() {
        const { restaurant }            = this.props;
        const { cuisine, price,
                minimum_order, street,
                city, state, zip,
                websites }              = restaurant.attributes;
        const { returnDollarSigns }     = this;

        return (
            <div className="gb-restaurant-info fix-collapse">
                <div className="col left">
                    <div className="gb-restaurant-info-cuisine section">
                        <div className="content">
                            <div className="cuisine">
                                {cuisine}
                            </div>
                            <div>
                                <i className="icon-bullet">&bull;</i>
                            </div>
                            <RestaurantDollarsComponent price={price} />
                        </div>
                    </div>
                    <div className="gb-restaurant-info-delivery-hours section fix-collapse">
                        <div className="title">
                            Delivery Hours
                        </div>
                        <div className="content">
                            <div className="col left">
                                <span>Monday</span>
                                <span>Tuesday</span>
                                <span>Wednesday</span>
                                <span>Thursday</span>
                                <span>Friday</span>
                                <span>Saturday</span>
                                <span>Sunday</span>
                            </div>
                            <div className="col right">
                                <span>11:00 am - 9:00 pm</span>
                                <span>11:00 am - 9:00 pm</span>
                                <span>11:00 am - 9:00 pm</span>
                                <span>11:00 am - 9:00 pm</span>
                                <span>11:00 am - 9:00 pm</span>
                                <span>11:00 am - 9:00 pm</span>
                                <span>11:00 am - 9:00 pm</span>
                            </div>
                        </div>
                    </div>
                    <div className="gb-restaurant-info-lead-times section fix-collapse">
                        <div className="title">
                            Lead Times
                        </div>
                        <div className="content">
                            <div className="col left">
                                <span>Up to 30 guests</span>
                                <span>Up to 50 guests</span>
                                <span>Up to 100 guests</span>
                                <span>Up to 200 guests</span>
                            </div>
                            <div className="col right">
                                <span>16 hrs</span>
                                <span>24 hrs</span>
                                <span>36 hrs</span>
                                <span>48 hrs</span>
                            </div>
                        </div>
                    </div>
                    <div className="gb-restaurant-info-order-minimum section">
                        <div className="title">
                            Order Minimum
                        </div>
                        <div className="content">
                            {minimum_order ? minimum_order : "$0.00"}
                        </div>
                    </div>
                    <div className="gb-restaurant-info-max-guests section">
                        <div className="title">
                            Max Guests
                        </div>
                        <div className="content">
                            500
                        </div>
                    </div>
                </div>
                <div className="col right">
                    <div className="section">
                        <RestaurantGmapComponent />
                    </div>
                    <div className="gb-restaurant-info-address section">
                        <div className="title">
                            Address
                        </div>
                        <div className="content">
                            <span>{street}</span>
                            <span>{city+", "+state+" "+zip}</span>
                        </div>
                    </div>
                    <div className="gb-restaurant-info-phone section">
                        <div className="title">
                            Phone
                        </div>
                        <div className="content">
                            Give us a call to place an order here!
                            <span>512-270-6555</span>
                        </div>
                    </div>
                    <div className="gb-restaurant-info-website section">
                        <div className="title">
                            Website
                        </div>
                        <div className="content">
                            {websites}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
