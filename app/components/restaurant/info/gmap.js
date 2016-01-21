import React, {Component, PropTypes} from 'react';
import qs from 'querystring';

export class RestaurantGmapComponent extends Component {
    static propTypes = {
        street: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        zip: PropTypes.string.isRequired,
        gmapsKey: PropTypes.string.isRequired
    };

    render() {
        const {street, city, state, zip, gmapsKey} = this.props;
        const query = qs.stringify({
            key: gmapsKey,
            q: `${street},${city} ${state} ${zip}`
        });

        const url = `https://www.google.com/maps/embed/v1/place?${query}`;

        return (
            <div className="gb-restaurant-info-gmap">
                <iframe width="100%" height="100%" src={url}/>
            </div>
        );
    }
}
