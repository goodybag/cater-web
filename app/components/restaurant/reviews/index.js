import React, {Component} from 'react';

import {RestaurantResolver} from '../../../models/restaurant';
import {StarsComponent} from '../../stars';
import {RestaurantReviewComponent} from './review';

export class RestaurantReviewsComponent extends Component {
    static contextTypes = {
        dependencies: React.PropTypes.object.isRequired
    }

    static dependencies = {
        restaurant: RestaurantResolver
    }

    render() {
        const {dependencies} = this.context;
        const {restaurant} = dependencies;
        const {yelp_data} = restaurant.attributes;

        return (
            <div className="gb-restaurant-reviews">
                <div className="gb-restaurant-reviews-count">
                    <span>{yelp_data.review_count} Reviews</span>

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
