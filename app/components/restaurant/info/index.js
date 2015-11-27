import React, {Component, PropTypes} from 'react';
import {inject} from 'yokohama';
import {listeningTo} from 'tokyo';

import {PriceComponent} from '../../price';
import {RestaurantStore} from '../../../stores/restaurant';
import {Restaurant} from '../../../models/restaurant';
import {RestaurantGmapComponent} from './gmap';
import {RestaurantInfoSectionComponent} from './section';
import {RestaurantInfoHeaderComponent} from './header';

@inject({
    restaurantStore: RestaurantStore
})
@listeningTo([RestaurantStore], props => {
    const {restaurantStore} = props;

    return {
        restaurant: restaurantStore.getRestaurant()
    };
})

export class RestaurantInfoComponent extends Component {
    static propTypes = {
        restaurant: PropTypes.instanceOf(Restaurant)
    }

    render() {
        const {restaurant} = this.props;

        const {
            cuisine,
            price,
            minimum_order,
            street,
            city,
            state,
            zip,
            websites
        } = restaurant;

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
                        <div className="gb-restaurant-info-cuisine">
                            {cuisine}
                        </div>
                        <div className="gb-restaurant-info-bull">&bull;</div>
                        <PriceComponent price={price}/>
                    </RestaurantInfoSectionComponent>

                    <RestaurantInfoSectionComponent>
                        <RestaurantInfoHeaderComponent>
                            Delivery Hours
                        </RestaurantInfoHeaderComponent>

                        <table className="gb-restaurant-info-table">
                            <tbody>{hours.map(renderHour)}</tbody>
                        </table>
                    </RestaurantInfoSectionComponent>

                    <RestaurantInfoSectionComponent>
                        <RestaurantInfoHeaderComponent>
                            Lead Times
                        </RestaurantInfoHeaderComponent>

                        <table className="gb-restaurant-info-table">
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
                        <div className="gb-restaurant-info-phone-icon"></div>
                        <div className="gb-restaurant-info-phone-number">512-270-6555</div>
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
                <a className="gb-restaurant-info-website" key={website} href={website}>{website}</a>
            );
        }
    }
}
