import React, {Component} from 'react';
import cx from 'classnames';
import url from 'url';

export class RestaurantTabsComponent extends Component {
    static contextTypes = {
        route: React.PropTypes.object.isRequired
    }

    render() {
        const {route} = this.context;
        const {restaurant_id} = route.params;
        const path = `/restaurants/${restaurant_id}`;

        return (
            <div className="gb-restaurant-tabs">
                <RestaurantTabComponent href={path}>
                    Menu
                </RestaurantTabComponent>

                <RestaurantTabComponent href={`${path}/info`}>
                    Info
                </RestaurantTabComponent>

                <RestaurantTabComponent href={`${path}/reviews`}>
                    Reviews
                </RestaurantTabComponent>

                <RestaurantTabComponent href={`${path}/orders`}>
                    Past Orders
                    <div className="gb-restaurant-tab-ncount">3</div>
                </RestaurantTabComponent>
            </div>
        );
    }
}

class RestaurantTabComponent extends Component {
    static propTypes = {
        href: React.PropTypes.string.isRequired,
        children: React.PropTypes.node.isRequired
    }

    static contextTypes = {
        route: React.PropTypes.object.isRequired
    }

    render() {
        const {route} = this.context;
        const {href, children} = this.props;
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
