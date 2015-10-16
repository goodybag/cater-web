import React, {Component, PropTypes} from 'react';
import {Route} from 'hiroshima';
import {listeningTo} from 'tokyo';
import {dependencies} from 'yokohama';
import cx from 'classnames';
import url from 'url';

import {RouteStore} from '../../stores/route';

@dependencies({
    routeStore: RouteStore
})
@listeningTo(['routeStore'], ({routeStore}) => {
    return {
        route: routeStore.getRoute()
    };
})
export class RestaurantTabsComponent extends Component {
    static propTypes = {
        route: PropTypes.instanceOf(Route).isRequired
    }

    render() {
        const {route} = this.props;
        const {restaurant_id} = route.params;
        const path = `/restaurants/${restaurant_id}`;

        return (
            <div className="gb-restaurant-tabs">
                <RestaurantTabComponent href={path} route={route}>
                    Menu
                </RestaurantTabComponent>

                <RestaurantTabComponent href={`${path}/info`} route={route}>
                    Info
                </RestaurantTabComponent>

                <RestaurantTabComponent href={`${path}/reviews`} route={route}>
                    Reviews
                </RestaurantTabComponent>

                <RestaurantTabComponent href={`${path}/orders`} route={route}>
                    Past Orders
                    <div className="gb-restaurant-tab-ncount">3</div>
                </RestaurantTabComponent>
            </div>
        );
    }
}

class RestaurantTabComponent extends Component {
    static propTypes = {
        href: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired,
        route: PropTypes.instanceOf(Route).isRequired
    }

    render() {
        const {href, children, route} = this.props;
        const {path} = route;

        const {pathname} = url.parse(href);

        const active = path === pathname;

        const className = cx('gb-restaurant-tab-title', {active});

        return (
            <a href={href} className={className}>
                <div className="gb-restaurant-tab-title-content">{children}</div>

                {active && <RestaurantTabArrowComponent/>}
            </a>
        );
    }
}

class RestaurantTabArrowComponent extends Component {
    render() {
        return (
            <div className="gb-restaurant-tab-arrow-container">
                <div className="gb-restaurant-tab-arrow-stroke"/>
                <div className="gb-restaurant-tab-arrow-fill"/>
            </div>
        );
    }
}
