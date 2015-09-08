import React, {Component} from 'react';

import {RestaurantReviewsStarsComponent} from './stars';

export class RestaurantReviewComponent extends Component {
    static propTypes = {
        review: React.PropTypes.object.isRequired
    }

    render() {
        const {review} = this.props;

        return (
            <div className="gb-restaurant-review fix-collapse">
                <div className="col left">
                    <div className="user-profile">
                        <div className="user-profile-pic">
                            <img src={review.user.image_url} alt="User's Profile Picture" />
                        </div>
                        <div className="user-profile-name">
                            {review.user.name}
                        </div>
                    </div>
                </div>
                <div className="col right">
                    <RestaurantReviewsStarsComponent stars={review.rating} />
                    <div className="user-review">
                        {review.excerpt}
                        <span className="read-more-link">
                            <a href="#">Read More</a>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
