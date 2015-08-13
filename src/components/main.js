import React, {Component} from 'react';

import {Restaurant} from '../models/restaurant';
import {User} from '../models/user';
import {NavbarComponent} from './navbar';
import {RestaurantComponent} from './restaurant';

export class MainComponent extends Component {
    static propTypes = {
        restaurant: React.PropTypes.instanceOf(Restaurant).isRequired,
        user: React.PropTypes.instanceOf(User).isRequired
    }

    static childContextTypes = {
        user: React.PropTypes.instanceOf(User)
    }

    getChildContext() {
        const {user} = this.props;

        return {user};
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
