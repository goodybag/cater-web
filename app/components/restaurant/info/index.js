import React, {Component, PropTypes} from 'react';
import {inject} from 'yokohama';
import {listeningTo} from 'tokyo';
import {FormattedNumber} from 'react-intl';
import moment from 'moment-timezone';

import {Config} from '../../../lib/config';
import {PriceComponent} from '../../price';
import {RestaurantStore} from '../../../stores/restaurant';
import {Restaurant} from '../../../models/restaurant';
import {RestaurantGmapComponent} from './gmap';
import {RestaurantInfoSectionComponent} from './section';
import {RestaurantInfoHeaderComponent} from './header';
import {RestaurantPayload} from '../../../payloads/restaurant';

@inject({
    restaurantStore: RestaurantStore,
    restaurantPayload: RestaurantPayload,
    config: Config
})
@listeningTo(['restaurantStore'], props => {
    const {restaurantStore} = props;

    return {
        restaurant: restaurantStore.getRestaurant()
    };
})

export class RestaurantInfoComponent extends Component {
    static propTypes = {
        restaurant: PropTypes.instanceOf(Restaurant).isRequired,
        restaurantPayload: PropTypes.object.isRequired,
        config: PropTypes.instanceOf(Config).isRequired
    };

    render() {
        const {restaurant, restaurantPayload, config} = this.props;

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

        const leadTimes = restaurantPayload.restaurantDeliveryLeadTimes;
        const deliveryHours = restaurantPayload.restaurantDeliveryHours;
        const hours = restaurantPayload.restaurantPickupHours;

        return (
            <div className="gb-restaurant-info">
                <div className="gb-restaurant-info-left">
                    <RestaurantInfoSectionComponent>
                        <div className="gb-restaurant-info-cuisine">
                            {cuisine.join(', ')}
                        </div>
                        <div className="gb-restaurant-info-bull">&bull;</div>
                        <PriceComponent price={price}/>
                    </RestaurantInfoSectionComponent>

                    <RestaurantInfoSectionComponent>
                        <RestaurantInfoHeaderComponent>
                            Delivery Hours
                        </RestaurantInfoHeaderComponent>

                        <table className="gb-restaurant-info-table">
                            <tbody>{deliveryHours.map(renderHour)}</tbody>
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

                        {minimum_order ?
                            <FormattedNumber
                                value={minimum_order / 100}
                                style="currency"
                                currency="USD"
                             /> : 'None'}
                    </RestaurantInfoSectionComponent>
                </div>

                <div className="gb-restaurant-info-right">
                    <RestaurantInfoSectionComponent>
                        <RestaurantGmapComponent
                            street={street}
                            city={city}
                            state={state}
                            zip={zip}
                            gmapsKey={config.gmapsKey}
                        />
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
                        <div className="gb-restaurant-info-phone-number">(512) 677-4224</div>
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

        function renderHour({day, start_time, end_time}) {
            return (
                <tr key={day}>
                    <td>{moment(day, 'e').format('dddd')}</td>
                    <td>
                        {moment(start_time, 'HH:mm:ss').format('hh:mm a')}
                        {' - '}
                        {moment(end_time, 'HH:mm:ss').format('hh:mm a')}
                    </td>
                </tr>
            );
        }

        function renderLeadTime({max_guests, lead_time}) {
            return (
                <tr key={max_guests}>
                    <td>Up to {max_guests} guests</td>
                    <td>{lead_time / 60} hrs</td>
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
