import React, {Component} from 'react';

export class PriceComponent extends Component {
    static propTypes = {
        price: React.PropTypes.number.isRequired
    }

    render() {
        const {price} = this.props;

        const dollars = [1, 2, 3, 4].map(renderValue);

        return (
            <div className="gb-price">{dollars}</div>
        );

        function renderValue(value) {
            if (value <= price) {
                return <div key={value} className="gb-price-fill">$</div>;
            } else {
                return <div key={value} className="gb-price-empty">$</div>;
            }
        }
    }
}
