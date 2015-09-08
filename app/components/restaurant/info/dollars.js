import React, {Component} from 'react';

export class RestaurantDollarsComponent extends Component {
    static propTypes = {
        price: React.PropTypes.number.isRequired
    }

    returnDollarSigns = (price) => {
        const MAXDOLLARS = 4;
        var dollarSigns = "";
        var subtleDollarSigns = "";

        for ( let i=0; i<price; i++ ) {
            dollarSigns += "$";
        };

        for ( let i=0; i<(MAXDOLLARS-price); i++ ) {
            subtleDollarSigns += "$";
        };

        return (
            <div className="price">
                <span>{dollarSigns}</span>
                <span className="subtle">{subtleDollarSigns}</span>
            </div>
        )
    }

    render() {
        const {price} = this.props;
        const {returnDollarSigns} = this;

        return (
            <div className="gb-restaurant-dollars">
                {returnDollarSigns(price)}
            </div>
        );
    }
}
