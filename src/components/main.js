import React, {Component} from 'react';

import {Restaurant} from '../models/restaurant';
import {Order} from '../models/order';
import {User} from '../models/user';
import {NavbarComponent} from './navbar';
import {RestaurantComponent} from './restaurant';

export class MainComponent extends Component {
    static propTypes = {
        restaurant: React.PropTypes.instanceOf(Restaurant).isRequired,
        order: React.PropTypes.instanceOf(Order).isRequired,
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
        const {restaurant, order} = this.props;

        return (
            <html>
                <head>
                    <title>GoodyBag</title>
                    <meta charSet="utf-8"/>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"/>
                    <link rel="stylesheet" href="main.css"/>
                </head>

                <body>
                    <div className="gb-main" ref="gbMain">
                        <NavbarComponent/>

                        <RestaurantComponent restaurant={restaurant} order={order}/>
                    </div>
                </body>
            </html>
        );
    }
}
