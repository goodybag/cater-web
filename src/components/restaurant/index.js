import React, {Component} from 'react';

import {Restaurant} from '../../models/restaurant';
import {RestaurantCoverComponent} from './cover.js';
import {RestaurantTabsComponent} from './tabs.js';

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
        const tabs = [];

        return (
            <div className="gb-restaurant">
                <RestaurantCoverComponent/>

                <RestaurantTabsComponent tabs={tabs}/>
            </div>
        );
    }
}
