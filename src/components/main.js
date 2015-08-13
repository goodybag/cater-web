import React, {Component} from 'react';

import {Restaurant} from '../models/restaurant';
import {NavbarComponent} from './navbar';
import {RestaurantComponent} from './restaurant';

export class MainComponent extends Component {
    static propTypes = {
        restaurant: React.PropTypes.instanceOf(Restaurant).isRequired
    }

    render() {
        const {restaurant} = this.props;

        return (
            <div className="gb-main" ref="gbMain">
                <NavbarComponent/>

                <RestaurantComponent restaurant={restaurant}/>
            </div>
        );
    }
}
