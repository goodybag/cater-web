import React, {Component, PropTypes} from 'react';
import {inject} from 'yokohama';
import {listeningTo} from 'tokyo';

import {RestaurantStore} from '../../../stores/restaurant';
import {Restaurant} from '../../../models/restaurant';
import {StarsComponent} from '../../stars';
import {RestaurantReviewComponent} from './review';

@inject({
    restaurantStore: RestaurantStore
})
@listeningTo([RestaurantStore], props => {
    const {restaurantStore} = props;

    return {
        restaurant: restaurantStore.getRestaurant()
    };
})

export class RestaurantReviewsComponent extends Component {
    static propTypes = {
        restaurant: PropTypes.instanceOf(Restaurant)
    }

    render() {
        const {restaurant} = this.props;
        const {yelp_data} = restaurant.attributes;

        return (
            <div className="gb-restaurant-reviews">
                <div className="gb-restaurant-reviews-count">
                    <div className="gb-restaurant-reviews-ncount">
                        {yelp_data.review_count} Reviews
                    </div>

                    <StarsComponent rating={yelp_data.rating}/>
                </div>

                {yelp_data.reviews.map(renderReview)}

                <div className="gb-restaurant-reviews-bottom">
                    <a href={yelp_data.url} className="gb-restaurant-reviews-seeall">
                        See all reviews
                    </a>
                </div>
            </div>
        );

        function renderReview(review) {
            return (
                <RestaurantReviewComponent
                    review={review}
                    key={review.id}
                    data={yelp_data}
                />
            );
        }
    }
}
