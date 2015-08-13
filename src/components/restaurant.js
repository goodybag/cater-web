import React, {Component} from 'react';

import {Restaurant} from '../models/restaurant';

export class RestaurantComponent extends Component {
    static propTypes = {
        restaurant: React.PropTypes.instanceOf(Restaurant).isRequired
    }

    static childContextTypes = {
        restaurant: React.PropTypes.instanceOf(Restaurant)
    }

    getChildContext() {
        const {restaurant} = this.props;

        return {restaurant};
    }

    render() {
        const {restaurant} = this.props;
        const name = restaurant.get('name');
        const tabs = [];

        return (
            <div className="gb-restaurant">
                <div className="gb-restaurant-content">
                    <div className="gb-restaurant-cover">
                        <div className="gb-restaurant-cover-text">{name}</div>
                    </div>

                    <RestaurantTabsComponent tabs={tabs}/>
                </div>
            </div>
        );
    }
}

class RestaurantTabsComponent extends Component {
    static propTypes = {
        tabs: React.PropTypes.arrayOf(React.PropTypes.shape({
            title: React.PropTypes.element,
            body: React.PropTypes.element
        }))
    }

    render() {
        return (
            <div className="gb-restaurant-tabs">
                {/* TODO */}
            </div>
        );
    }
}
