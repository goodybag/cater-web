import React, {Component} from 'react';

export class RestaurantTabsComponent extends Component {
    static propTypes = {
        tabs: React.PropTypes.arrayOf(React.PropTypes.shape({
            title: React.PropTypes.element,
            body: React.PropTypes.element
        })).isRequired
    }

    render() {
        return (
            <div className="gb-restaurant-tabs">
                {/* TODO */}
            </div>
        );
    }
}
