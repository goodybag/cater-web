import React, {Component} from 'react';

export class RestaurantReviewsStarsComponent extends Component {
    static propTypes = {
        stars: React.PropTypes.number.isRequired
    }

    returnFilledStars = (stars) => {
        var filledStars = [];
        var nFilledStars = Math.floor(stars);

        for ( let i=0; i < nFilledStars; i++ ) {
            filledStars.push(
                <span className="icon-filledstar" key={i}></span>
            );
        }

        return (
            <span>
                {filledStars}
            </span>
        );
    };

    returnTrailingStars = (stars) => {
        var halfStar = [];
        var emptyStars = [];
        var nFilledStars = Math.floor(stars);
        var nHalfStar = 0;

        if ( stars % nFilledStars ) {
            nHalfStar = 1;
            halfStar.push (
                <span className="icon-halfstar" key="halfstar"></span>
            );
        }

        for ( let i=0; i < (5-nFilledStars-nHalfStar); i++ ) {
            emptyStars.push(
                <span className="icon-emptystar" key={i}></span>
            );
        }

        return (
            <span>
                {halfStar}
                {emptyStars}
            </span>
        )

    };

    render() {
        const {stars} = this.props;
        const {returnFilledStars} = this;
        const {returnTrailingStars} = this;

        return (
            <div className="gb-restaurant-reviews-stars">
                {returnFilledStars(stars)}
                {returnTrailingStars(stars)}
            </div>
        );
    }
}
