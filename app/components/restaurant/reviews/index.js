import React, {Component} from 'react';

import {Restaurant} from '../../../models/restaurant';
import {RestaurantReviewsStarsComponent} from './stars';
import {RestaurantReviewComponent} from './review';

export class RestaurantReviewsComponent extends Component {
    static propTypes = {
        restaurant: Restaurant.propType.isRequired
    }

    render() {
        const {restaurant} = this.props;
        const {yelp_data} = restaurant.attributes;

        return (
            <div className="gb-restaurant-reviews">
                <div className="gb-restaurant-reviews-total">
                    <div className="reviews-total">
                        {yelp_data.review_count} Reviews
                    </div>
                    <RestaurantReviewsStarsComponent stars={yelp_data.rating} />
                </div>

                {yelp_data.reviews.map(function(review, i) {
                    return (
                        <div className="gb-restaurant-reviews-review" key={review.id} >
                            <RestaurantReviewComponent review={review} />
                        </div>
                    );
                })}

                <div className="gb-restaurant-reviews-button">
                    <input
                        type="button"
                        value="See all reviews"
                        className="btn action-btn" />
                </div>
            </div>
        )
    }
}
