import React, {Component} from 'react';

import {StarsComponent} from '../../stars';

export class RestaurantReviewComponent extends Component {
    static propTypes = {
        data: React.PropTypes.object.isRequired,
        review: React.PropTypes.object.isRequired
    };

    render() {
        const {review, data} = this.props;
        const url = `${data.url}#hrid:${review.id}`;

        return (
            <div className="gb-restaurant-review">
                <div className="gb-restaurant-review-user">
                    <div className="gb-restaurant-review-user-pic">
                        <img width={50} height={50} src={review.user.image_url}/>
                    </div>

                    <div className="gb-restaurant-review-user-name">
                        {review.user.name}
                    </div>
                </div>

                <div className="gb-restaurant-review-content">
                    <StarsComponent rating={review.rating}/>

                    <div className="gb-restaurant-review-excerpt">
                        {review.excerpt}
                    </div>

                    <a href={url} className="gb-restaurant-review-readmore">
                        Read More
                    </a>
                </div>
            </div>
        );
    }
}
