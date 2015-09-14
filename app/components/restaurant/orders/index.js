import React, {Component} from 'react';

export class RestaurantOrdersComponent extends Component {
    static contextTypes = {
        dependencies: React.PropTypes.object.isRequired
    }

    static dependencies = {}

    render() {
        return (
            <div className="gb-restaurant-orders">
                {/* TODO */}
                <div>Past Orders at Austin Daily Press</div>
            </div>
        );
    }
}
